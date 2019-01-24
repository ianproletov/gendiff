install:
	npm install
start:
	npx babel-node src/bin/gendiff __tests__/__fixtures__/before.json __tests__/__fixtures__/after.json
gendiff-help:
	npx babel-node -- src/bin/gendiff.js --help
publish:
	npm publish
lint:
	npx eslint .
test:
	npm test
test-watch:
	npm test --watch