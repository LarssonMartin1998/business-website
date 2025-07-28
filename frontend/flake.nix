{
  description = "React / Vite frontend";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
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

        node = pkgs.nodejs;
        tooling = with pkgs; [
          node
          typescript
        ];
      in
      {
        packages.default = pkgs.buildNpmPackage {
          pname = "frontend";
          version = "0.1.0";
          src = ./.;

          npmDepsHash = "sha256-C506XbavOx4ZHIK/bvIaORtDj9Qu4DqUYMowtQIlEVI=";

          npmInstallFlags = [
            "--frozen-lockfile"
            "--offline"
          ];

          nativeBuildInputs = tooling;
          preBuild = ''
            export NODE_PATH="$PWD/node_modules:$NODE_PATH"
          '';

          npmBuildScript = "build";
          doCheck = true;
          dontNpmInstall = true;

          installPhase = ''
            runHook preInstall

            cp -r dist/ $out/

            runHook postInstall
          '';

          npmTestScript = "echo No tests yet";
        };

        devShells.default = pkgs.mkShell {
          packages = tooling ++ [ pkgs.eslint ];

          shellHook = ''
            echo "⚛️  Node $(${node}/bin/node -v)!"
            echo "Run 'npm install' once, then 'npm dev' for hot-reload."
          '';
        };

        checks.default = self.packages.${system}.default;
      }
    );
}
