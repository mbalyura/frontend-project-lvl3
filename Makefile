install:
	npm install
build:
	npx webpack
dev:
	npx webpack-dev-server --open
lint:
	npx eslint .
stats:
	npx webpack --json > stats.json && webpack-bundle-analyzer stats.json
deploy:
	surge dist rss-aggregator.surge.sh
cors:
	node cors/cors.js

.PHONY : cors