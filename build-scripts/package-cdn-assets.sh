#!/bin/bash

die() {
  local _ret="${2:-1}"
  echo "$1" >&2
  exit "${_ret}"
}

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)" || die "Couldn't determine the script's running directory, bailing out" 2

# Change directories to the root of the project before processing
cd "${script_dir}/.." || die "Couldn't change to root project directory, bailing out." 2

# Create the output directory and link the SVG icon files
mkdir -p dist/cdn/v2/icons
ln -s "$(pwd)/dist/svg" "$(pwd)/dist/cdn/v2/icons/svg"

# Create the metadata directory and link the metadata file
mkdir -p dist/cdn/v2/metadata/icons
ln -s "$(pwd)/tyler-icons-metadata.json" "$(pwd)/dist/cdn/v2/metadata/icons/tyler-icons-metadata.json"

# Compress the assets into a tarball (this is the directory structure that will be pushed to the bucket)
cd "$(pwd)/dist" && tar -czvhf deployment-assets.tar.gz -C cdn .
