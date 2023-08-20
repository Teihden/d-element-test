ci:
	npm ci

start:
	NODE_ENV=development npx gulp

build:
	NODE_ENV=production npx gulp build

server:
	NODE_ENV=development npx gulp server

lint:
	npx stylelint ./src/css/**/*.css --fix --color
	npx pug-lint ./src/pug/**/*.pug --reporter node_modules/puglint-stylish
	npx eslint ./src/js/**/*.js

.PHONY: build
