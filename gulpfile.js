/* eslint-disable import/no-unresolved */
import gulp from 'gulp';
import stylelint from '@ronilaukkarinen/gulp-stylelint';
import pug from 'gulp-pug';
import pugLinter from 'gulp-pug-linter';
import htmlMin from 'gulp-html-minifier-terser';
import imageMin from 'gulp-imagemin';
import svgMin from 'gulp-svgmin';
import svgStore from 'gulp-svgstore';
import { deleteAsync } from 'del';
import browserSync from 'browser-sync';
import postcss from 'gulp-postcss';
import eslint from 'gulp-eslint-new';
import terser from 'gulp-terser';
import rename from 'gulp-rename';
import inject from 'gulp-inject';
import replace from 'gulp-replace';

const browser = browserSync.create();

// CSS
function lintCSS() {
  return gulp.src('src/css/**/*.css')
    .pipe(stylelint({
      failAfterError: true,
      reporters: [
        { formatter: 'string', console: true },
      ],
      fix: true,
    }));
}

function makeCSS() {
  if (process.env.NODE_ENV === 'development') {
    return gulp.src('src/css/styles.css')
      .pipe(postcss())
      .pipe(gulp.dest('build/css'))
      .pipe(browser.stream());
  }

  return gulp.src('src/css/styles.css')
    .pipe(postcss())
    .pipe(rename((path) => ({ ...path, extname: '.min.css' })))
    .pipe(gulp.dest('build/css'))
    .pipe(browser.stream());
}

// HTML
function lintPug() {
  return gulp.src('src/pug/**/*.pug')
    .pipe(pugLinter({
      reporter: 'puglint-stylish',
      failAfterError: true,
    }));
}

function compilePug() {
  return gulp.src('src/pug/pages/*.pug')
    .pipe(pug({
      pretty: false,
      doctype: 'html',
    }))
    .pipe(gulp.dest('src/html'));
}

function optimizeHTML() {
  return gulp.src('build/*.html')
    .pipe(replace(/src="js\/(.*?)js"/g, 'src="js/$1min.js"'))
    .pipe(replace(/href="css\/(.*?)css"/g, 'href="css/$1min.css"'))
    .pipe(htmlMin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'));
}

// Javascript
function lintJS() {
  if (process.env.NODE_ENV === 'development') {
    return gulp.src('src/js/**/*.js')
      .pipe(eslint({
        fix: true,
      }))
      .pipe(eslint.format())
      .pipe(eslint.failAfterError())
      .pipe(gulp.dest('build/js'))
      .pipe(browser.stream());
  }

  return gulp.src('src/js/**/*.js')
    .pipe(eslint({
      fix: true,
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

function optimizeJS() {
  return gulp.src('src/js/**/*.js')
    .pipe(terser())
    .pipe(replace('.js', '.min.js'))
    .pipe(rename((path) => ({ ...path, extname: '.min.js' })))
    .pipe(gulp.dest('build/js'));
}

// Images
function optimizeImages() {
  return gulp.src(['src/img/**/*.{png,jpg}', 'src/apple-touch-icon.png'], {
    since: gulp.lastRun(optimizeImages),
    base: 'src',
  })
    .pipe(imageMin())
    .pipe(gulp.dest('build'));
}

// SVG
async function optimizeSVG() {
  gulp.src([
    'src/img/**/*.svg',
    '!src/img/icons/*.svg',
  ])
    .pipe(svgMin())
    .pipe(gulp.dest('build/img'));
}

function makeSprite() {
  const sprite = gulp.src('src/img/icons/*.svg')
    .pipe(svgStore({ inlineSvg: true }));

  function fileToString(_, file) {
    return file.contents.toString('utf-8');
  }

  return gulp
    .src('src/html/index.html')
    .pipe(inject(sprite, {
      starttag: '<!-- inject:svg -->',
      endtag: '<!-- endinject -->',
      transform: fileToString,
      removeTags: true,
    }))
    .pipe(gulp.dest('build'))
    .pipe(browser.stream());
}

// Copy resources
function copyImages() {
  return gulp.src([
    'src/img/**/*.{png,jpg,svg}',
    '!src/img/icons/*.svg',
  ])
    .pipe(gulp.dest('build/img'));
}

function copyMisc() {
  return gulp.src([
    'src/*.ico',
    'src/apple-touch-icon.png',
    'src/*.webmanifest',
  ])
    .pipe(gulp.dest('build'))
    .pipe(browser.stream());
}

function copyFonts() {
  return gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('build/fonts/'))
    .pipe(browser.stream());
}

function copyVendor() {
  return gulp.src(['src/vendor/**/*.min.{css,js,mjs,mjs.map}'])
    .pipe(gulp.dest('build/vendor/'))
    .pipe(browser.stream());
}

// Clean
function clean() {
  return deleteAsync(['build']);
}

// Server
function browsersync() {
  browser.init({
    server: {
      baseDir: 'build',
    },
    cors: true,
    notify: false,
    open: false,
  });
}

function watcher(cb) {
  gulp.watch('src/pug/**/*.pug', gulp.series(lintPug, compilePug, makeSprite));
  gulp.watch('src/css/**/*.css', gulp.series(lintCSS, makeCSS));
  gulp.watch('src/img/icons/*.svg', makeSprite);
  gulp.watch([
    'src/img/**/*.{png,jpg,svg}',
    '!src/img/icons/*.svg',
  ], copyImages);
  gulp.watch([
    'src/*.ico',
    'src/apple-touch-icon.png',
    'src/*.webmanifest',
  ], copyMisc);
  gulp.watch(['src/vendor/**/*.min.{css,js,mjs}'], copyVendor);
  gulp.watch('src/fonts/**/*.{woff,woff2}', copyFonts);
  gulp.watch('src/js/**/*.js', gulp.series(lintJS));

  cb();
}

// ---------------------------------------------------------------------
// | Tasks                                                             |
// ---------------------------------------------------------------------

// Server
export const server = gulp.series(browsersync);

// Build
export const build = gulp.series(
  clean,
  gulp.parallel(
    gulp.series(lintPug, compilePug, makeSprite, optimizeHTML),
    gulp.series(lintCSS, makeCSS),
    gulp.series(lintJS, optimizeJS),
    copyFonts,
    copyMisc,
    copyVendor,
    optimizeImages,
    optimizeSVG,
  ),
);

// Default
export default gulp.series(
  clean,
  gulp.parallel(
    gulp.series(lintPug, compilePug, makeSprite),
    gulp.series(lintCSS, makeCSS),
    gulp.series(lintJS),
    copyFonts,
    copyMisc,
    copyVendor,
    copyImages,
  ),
  gulp.series(
    watcher,
    browsersync,
  ),
);
