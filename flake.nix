{
  description = "Deployment & Dev shell for a website stack - React, TS, Vite, and Tailwind";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    backend.url = "path:./backend";
    frontend.url = "path:./frontend";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs =
    {
      nixpkgs,
      backend,
      frontend,
      flake-utils,
      ...
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = import nixpkgs { inherit system; };
      in
      {
        devShells.default = pkgs.mkShell {
          inputsFrom = [
            backend.devShells.${system}.default
            frontend.devShells.${system}.default
          ];
        };

        packages = {
          backend = backend.packages.${system}.default;
          frontend = frontend.packages.${system}.default;

          # Combined deployment package
          default = pkgs.stdenv.mkDerivation {
            pname = "business-website";
            version = "1.0.2";

            unpackPhase = "true"; # No source to unpack

            installPhase = ''
              mkdir -p $out/bin $out/static

              # Copy backend binary
              cp ${backend.packages.${system}.default}/bin/* $out/bin/

              # Copy frontend static files
              cp -r ${frontend.packages.${system}.default}/* $out/static/
            '';
          };
        };

        checks = pkgs.lib.mergeAttrs backend.checks.${system} frontend.checks.${system};
      }
    );
}
