install:
	npm install
start:
	npx babel-node src/bin/gendiff __tests__/__fixtures__/simple/before.json __tests__/__fixtures__/simple/after.json
start-plain:
	npx babel-node -- src/bin/gendiff --format plain __tests__/__fixtures__/simple/before.json __tests__/__fixtures__/simple/after.json
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