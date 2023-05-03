/* eslint-disable import/no-extraneous-dependencies */
import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import stylelint from '@ronilaukkarinen/gulp-stylelint';
import pug from 'gulp-pug';
import pugLinter from 'gulp-pug-linter';
import htmlmin from 'gulp-html-minifier-terser';
import imagemin from 'gulp-imagemin';
import svgmin from 'gulp-svgmin';
import { stacksvg } from 'gulp-stacksvg';
import { deleteAsync } from 'del';
import browserSync from 'browser-sync';
import postcss from 'gulp-postcss';
import csso from 'postcss-csso'
import autoprefixer from 'autoprefixer';
import purgecss from 'gulp-purgecss';
import eslint from 'gulp-eslint';
import terser from 'gulp-terser';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';

const browser = browserSync.create();
const sass = gulpSass(dartSass);

// CSS
function lintSass() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(stylelint({
      configFile: './.stylelintrc.cjs',
      failAfterError: true,
      reporters: [
        { formatter: 'string', console: true },
      ],
      fix: true,
    }));
}

function compileScss() {
  return gulp.src('src/scss/**/*.scss', { sourcemaps: true })
    .pipe(sass({
      outputStyle: 'compressed', // compressed | expanded
    }))
    .pipe(rename((path) => {
      // eslint-disable-next-line no-param-reassign
      path.extname = '.min.css';
    }))
    .pipe(gulp.dest('build/css/', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

function purgeCSS() {
  return gulp.src('build/css/*.css')
    .pipe(purgecss({
      content: ['build/*.html'],
      variables: true,
    }))
    .pipe(gulp.dest('build/css'));
}

function postCSS() {
  return gulp.src('build/css/*.css')
    .pipe(postcss([
      autoprefixer(),
      csso(),
    ]))
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
      pretty: false, // true | false
      doctype: 'html',
    }))
    .pipe(gulp.dest('build/'))
    .pipe(browser.stream());
}

function optimizeHTML() {
  return gulp.src('build/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'));
}

// Javascript
function lintJS() {
  return gulp.src('src/js/')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

function copyJS() {
  return gulp.src('src/js/**/*')
    .pipe(gulp.dest('build/js/'))
    .pipe(browser.stream());
}

function optimizeJS() {
  return gulp.src('build/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(terser())
    .pipe(rename((path) => {
      // eslint-disable-next-line no-param-reassign
      path.extname = '.min.js';
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('build/js'));
}

// Images
function imageMin() {
  return gulp.src(['src/img/**/*.{png,jpg}', 'src/apple-touch-icon.png'], {
    since: gulp.lastRun(imageMin),
    base: 'src',
  })
    .pipe(imagemin())
    .pipe(gulp.dest('build'))
    .pipe(browserSync.stream());
}

function copyImages() {
  return gulp.src([
    'src/img/**/*.{png,jpg,svg}',
    '!src/img/icons/*.svg',
  ])
    .pipe(gulp.dest('build/img'));
}

// SVG
async function svgMin() {
  gulp.src([
    'src/img/**/*.svg',
    '!src/img/icons/*.svg',
  ])
    .pipe(svgmin())
    .pipe(gulp.dest('build/img'));
}

function stackSVG() {
  return gulp.src([
    'src/img/icons/*.svg',
  ])
    .pipe(svgmin())
    .pipe(stacksvg({ output: 'stack' }))
    .pipe(gulp.dest('build/img/icons'));
}

// Copy resourses
function copyMisc() {
  return gulp.src(['src/favicon.ico', 'src/manifest.webmanifest'])
    .pipe(gulp.dest('build/'))
    .pipe(browser.stream());
}

function copyFonts() {
  return gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('build/fonts/'))
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

function watcher() {
  gulp.watch('src/pug/**/*.pug', gulp.series(lintPug, compilePug));
  gulp.watch('src/scss/**/*.scss', gulp.series(lintSass, compileScss));
  gulp.watch(['src/img/**/*', 'src/apple-touch-icon.png'], copyImages);
  gulp.watch(['src/favicon.ico', 'src/manifest.webmanifest'], copyMisc);
  gulp.watch('src/fonts/**/*', copyFonts);
  gulp.watch('src/js/**/*', gulp.series(lintJS, copyJS, optimizeJS));
}

// Build
export const build = gulp.series(
  clean,
  gulp.parallel(
    gulp.series(lintPug, compilePug, optimizeHTML),
    gulp.series(lintSass, compileScss, purgeCSS, postCSS),
    gulp.series(lintJS, copyJS, optimizeJS),
    copyFonts,
    copyMisc,
    imageMin,
    svgMin,
    stackSVG,
  ),
);

// Default
export default gulp.series(
  clean,
  gulp.parallel(
    gulp.series(lintPug, compilePug),
    gulp.series(lintSass, compileScss),
    gulp.series(lintJS, copyJS, optimizeJS),
    copyFonts,
    copyMisc,
    copyImages,
    stackSVG,
  ),
  gulp.series(
    browsersync,
    watcher,
  ),
);
