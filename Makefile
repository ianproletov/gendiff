install:
	npm install
start:
	npx babel-node src/index.js
gendiff-help:
	npx babel-node -- src/bin/gendiff.js --help
publish:
	npm publish
lint:
	npx eslint .
test:
	npm test --watch