/* eslint-disable import/no-extraneous-dependencies */
import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import stylelint from '@ronilaukkarinen/gulp-stylelint';
import pug from 'gulp-pug';
import pugLinter from 'gulp-pug-linter';
import imagemin from 'gulp-imagemin';
import { deleteSync } from 'del';
import browserSyncJob from 'browser-sync';
import purgecss from 'gulp-purgecss';
import autoprefixer from 'autoprefixer';
import postcss from 'gulp-postcss';
import eslint from 'gulp-eslint';

const browserSync = browserSyncJob.create();
const sass = gulpSass(dartSass);

function imageMin(cb) {
  gulp.src(['src/img/**/*', 'src/apple-touch-icon.png'], {
    since: gulp.lastRun(imageMin),
    base: 'src',
  })
    .pipe(imagemin())
    .pipe(gulp.dest('build'))
    .pipe(browserSync.stream());

  cb();
}

async function clean() {
  return deleteSync(['build/']);
}

function copyMisc() {
  return gulp.src(['src/favicon.ico', 'src/manifest.webmanifest'])
    .pipe(gulp.dest('build/'))
    .pipe(browserSync.stream());
}

function copyFonts() {
  return gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('build/fonts/'))
    .pipe(browserSync.stream());
}

function copyJS() {
  return gulp.src('src/js/**/*')
    .pipe(gulp.dest('build/js/'))
    .pipe(browserSync.stream());
}

function lintJS() {
  return gulp.src('src/js/')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

function browsersync() {
  browserSync.init({
    server: 'build/',
    serveStaticOptions: {
      extensions: ['html'],
    },
    open: false,
  });
}

// function lintSass() {
//   return gulp.src('src/scss/**/*.scss')
//     .pipe(stylelint({
//       configFile: './.stylelintrc.js',
//       failAfterError: true,
//       reporters: [
//         { formatter: 'string', console: true },
//       ],
//       fix: true,
//     }));
// }

function compileSass() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass({
      outputStyle: 'compressed', // compressed | expanded
    }))
    .pipe(gulp.dest('build/css/'))
    .pipe(browserSync.stream());
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
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.stream());
}

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
    .pipe(browserSync.stream());
}

function watcher() {
  gulp.watch('src/scss/**/*.scss', gulp.series(compileSass));
  // gulp.watch('src/scss/**/*.scss', gulp.series(lintSass, compileSass));
  gulp.watch('src/pug/**/*.pug', gulp.series(lintPug, compilePug));
  gulp.watch(['src/img/**/*', 'src/apple-touch-icon.png'], imageMin);
  gulp.watch(['src/favicon.ico', 'src/manifest.webmanifest'], copyMisc);
  gulp.watch('src/fonts/**/*', copyFonts);
  gulp.watch('src/js/**/*', gulp.series(lintJS, copyJS));
}

gulp.task(
  'copy',
  gulp.series(
    copyFonts,
    copyMisc,
  ),
);

gulp.task(
  'build',
  gulp.series(
    clean,
    gulp.series(lintPug, compilePug),
    gulp.series(compileSass, purgeCSS, postCSS),
    gulp.series(lintJS, copyJS),
    'copy',
    imageMin,
  ),
);

// gulp.task(
//   'build',
//   gulp.series(
//     clean,
//     gulp.series(lintPug, compilePug),
//     gulp.series(lintSass, compileSass, purgeCSS, postCSS),
//     gulp.series(lintJS, copyJS),
//     'copy',
//     imageMin,
//   ),
// );

gulp.task(
  'default',
  gulp.parallel(
    clean,
    gulp.series(lintPug, compilePug),
    gulp.series(compileSass),
    gulp.series(lintJS, copyJS),
    'copy',
    imageMin,
    browsersync,
    watcher,
  ),
);

// gulp.task(
//   'default',
//   gulp.parallel(
//     clean,
//     gulp.series(lintPug, compilePug),
//     gulp.series(lintSass, compileSass),
//     gulp.series(lintJS, copyJS),
//     'copy',
//     imageMin,
//     browsersync,
//     watcher,
//   ),
// );
