#!/bin/bash

die() {
  local _ret="${2:-1}"
  echo "$1" >&2
  exit "${_ret}"
}

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)" || die "Couldn't determine the script's running directory, which probably matters, bailing out" 2

# Change directories to the root of the project before processing
cd "${script_dir}/.." || die "Couldn't change to root project directory, bailing out." 2

mkdir -p dist/cdn/v1/icons
ln -s "$(pwd)/dist/svg" "$(pwd)/dist/cdn/v1/icons/svg"

mkdir -p dist/cdn/v1/metadata/icons
ln -s "$(pwd)/dist/tyler-icons-metadata-svg.json" "$(pwd)/dist/cdn/v1/metadata/icons/tyler-icons-metadata-svg.v1.json"

cd "$(pwd)/dist" && tar -czvhf cdn-assets.tar.gz -C cdn .

echo "::set-output name=package-path::$(pwd)/cdn-assets.tar.gz"
