default: help
## This help screen.
help:
	@printf "Available targets:\n\n"
	@awk '/^[a-zA-Z\-\_0-9%:\\]+/ { \
		helpMessage = match(lastLine, /^## (.*)/); \
		if (helpMessage) { \
			helpCommand = $$1; \
			helpMessage = substr(lastLine, RSTART + 3, RLENGTH); \
			gsub("\\\\", "", helpCommand); \
			gsub(":+$$", "", helpCommand); \
			printf "  \x1b[32;01m%-35s\x1b[0m %s\n", helpCommand, helpMessage; \
		} \
	} \
	{ lastLine = $$0 }' $(MAKEFILE_LIST) | sort -u
	@printf "\n"

# Initialize project via npm install
init:
	@echo "no" | npm install

## Empty node_modules folder
clean-nm:
	@if [ "$$(ls -A ./node_modules)" ]; then \
	  echo "emptying ./node_modules folder" && \
	  rm -rf ./node_modules/* ./node_modules/.* 2> /dev/null || true && \
	  echo "./node_modules folder is empty"; \
	else \
	  echo "./node_modules folder is empty" && \
	  exit 0; \
	fi

## Clean built assets
clean-build:
	@[ "$$(ls -A ./node_modules)" ] && npm run clean || echo "unable to clean build assets without node_modules due to dependency on rimraf"

## Clean all dependencies and build related resources
clean-all: clean-build clean-nm
