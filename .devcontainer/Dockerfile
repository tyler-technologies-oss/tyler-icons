# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.205.1/containers/typescript-node/.devcontainer/base.Dockerfile

# [Choice] Node.js version (use -bullseye variants on local arm64/Apple Silicon): 16, 14, 12, 16-bullseye, 14-bullseye, 12-bullseye, 16-buster, 14-buster, 12-buster
ARG VARIANT="16-bullseye"
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:0-${VARIANT}

# Add vscode-tcw-snippets
ARG GITHUB_TOKEN
RUN export GITHUB_TOKEN=${GITHUB_TOKEN}
RUN git clone https://${GITHUB_TOKEN}@github.com/tyler-technologies/vscode-tcw-snippets.git /home/node/.vscode-server/extensions/vscode-tcw-snippets
RUN sudo chown -R node /home/node/