{
  description = "Go/Chi backend";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = import nixpkgs { inherit system; };
        go = pkgs.go;
      in
      {
        packages.default = pkgs.buildGoModule {
          pname = "backend";
          version = "0.1.0";
          src = ./.;

          vendorHash = "sha256-0DmVUIaSSibyNy819LIEaExI4F9VA4CRNkrFx++q1HU=";

          env = {
            CGO_ENABLED = "0";
          };

          doCheck = true;
          # checkPhase = ''
          #   go test
          # '';
        };

        devShells.default = pkgs.mkShell {
          packages = with pkgs; [
            go
            delve
            gotools
            air
          ];

          shellHook = ''
            echo "🦫 $(${go}/bin/go version) ready!"
          '';
        };
      }
    );
}
