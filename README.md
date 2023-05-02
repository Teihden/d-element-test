# Project "Device"
[![CI](https://github.com/Teihden/device/actions/workflows/CI.yml/badge.svg)](https://github.com/Teihden/device/actions/workflows/CI.yml)
[![Github Pages](https://github.com/Teihden/device/actions/workflows/github-pages.yml/badge.svg)](https://github.com/Teihden/device/actions/workflows/github-pages.yml)

## Setup

```shell
# Install dependencies
make install
```

## CLI

```shell
# Runs Stylelint, pug-lint, Eslint against source code for quality
make lint
```

## Gulp tasks

```shell
# To package a site for production run
npx gulp build

# To get started developing a site with a development server (default task)
npx gulp
```
