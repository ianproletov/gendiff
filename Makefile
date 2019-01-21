install:
	npm install
gendiff:
	npx babel-node -- src/bin/gendiff.js --help
publish:
	npm publish
lint:
	npx eslint .