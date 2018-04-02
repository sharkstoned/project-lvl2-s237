# Makefile

install:
	npm install

start:
	npm run babel-node -- src/bin/gendiff.js

build:
	rm -rf dist
	npm run build
	#chmod 744 dist/bin/*

test:
	npm test

lint:
	npm run eslint .

publish:
	npm publish

.PHONY: test
