install:
	npm install
build:
	rm -rf dist
	npx webpack
dev:
	npx webpack-dev-server
lint:
	npx eslint .
