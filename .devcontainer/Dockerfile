# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.205.1/containers/typescript-node/.devcontainer/base.Dockerfile

# [Choice] Node.js version (use -bullseye variants on local arm64/Apple Silicon): 16, 14, 12, 16-bullseye, 14-bullseye, 12-bullseye, 16-buster, 14-buster, 12-buster
ARG VARIANT="16-bullseye"
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:0-${VARIANT}

# Install the key and debian repository for Chrome's stable branch
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list

# Install Google Chrome
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
	&& apt-get -y install --no-install-recommends google-chrome-stable

# configure npm to use artifactory from local env
ARG ARTIFACTORY_USERNAME
ARG ARTIFACTORY_TOKEN
ARG ARTIFACTORY_REGISTRY
ENV ARTIFACTORY_USERNAME ${ARTIFACTORY_USERNAME}
ENV ARTIFACTORY_TOKEN ${ARTIFACTORY_TOKEN}
ENV ARTIFACTORY_REGISTRY ${ARTIFACTORY_REGISTRY}
RUN echo "registry=${ARTIFACTORY_REGISTRY}\n \
_auth=${ARTIFACTORY_TOKEN}\n \
email=${ARTIFACTORY_USERNAME}\n \
always-auth=true" >> ~/.npmrc

# Install Angular CLI globally
RUN su node -c "echo n | npm install -g @angular/cli"