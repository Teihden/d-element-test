ci:
	npm ci

lint:
	npx stylelint ./src/scss/**/*.scss --fix --color
	npx pug-lint ./src/pug/**/*.pug --reporter node_modules/puglint-stylish
	npx eslint ./src/js/**/*.js
