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
git:
	git add . && git commit && git push
