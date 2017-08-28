var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var pkg = require('./package.json');
var changed = require('gulp-changed');

// Set the banner content
var banner = ['/*!\n',
  ' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
  ' * Copyright 2013-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
  ' * Licensed under <%= pkg.license %> (https://github.com/BlackrockDigital/<%= pkg.name %>/blob/master/LICENSE)\n',
  ' */\n',
  ''
].join('');

// Compiles SCSS files from /scss into /css
gulp.task('sass', function() {
  return gulp.src('scss/creative.scss')
    .pipe(sass())
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Minify compiled CSS
gulp.task('minify-css', ['sass'], function() {
  return gulp.src('css/creative.css')
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Minify custom JS
gulp.task('minify-js', function() {
  return gulp.src('js/creative.js')
    .pipe(uglify())
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('js'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Copy vendor files from /node_modules into /vendor
// NOTE: requires `npm install` before running!
gulp.task('copy', function() {
  gulp.src([
      'node_modules/bootstrap/dist/**/*',
      '!**/npm.js',
      '!**/bootstrap-theme.*',
      '!**/*.map'
    ])
    .pipe(gulp.dest('vendor/bootstrap'))

  gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
    .pipe(gulp.dest('vendor/jquery'))

  gulp.src(['node_modules/magnific-popup/dist/*'])
    .pipe(gulp.dest('vendor/magnific-popup'))

  gulp.src(['node_modules/scrollreveal/dist/*.js'])
    .pipe(gulp.dest('vendor/scrollreveal'))

  gulp.src(['node_modules/popper.js/dist/umd/popper.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
    .pipe(gulp.dest('vendor/popper'))

  gulp.src(['node_modules/jquery.easing/*.js'])
    .pipe(gulp.dest('vendor/jquery-easing'))

  gulp.src([
      'node_modules/font-awesome/**',
      '!node_modules/font-awesome/**/*.map',
      '!node_modules/font-awesome/.npmignore',
      '!node_modules/font-awesome/*.txt',
      '!node_modules/font-awesome/*.md',
      '!node_modules/font-awesome/*.json'
    ])
    .pipe(gulp.dest('vendor/font-awesome'))
})

// Default task
gulp.task('default', ['sass', 'minify-css', 'minify-js', 'copy']);

// Configure the browserSync task
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: ''
    },
  })
})

// Dev task with browserSync
gulp.task('dev', ['browserSync', 'sass', 'minify-css', 'minify-js'], function() {
  gulp.watch('scss/*.scss', ['sass']);
  gulp.watch('css/*.css', ['minify-css']);
  gulp.watch('js/*.js', ['minify-js']);
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('*.html', browserSync.reload);
  gulp.watch('js/**/*.js', browserSync.reload);
});

gulp.task('build', ['sass', 'minify-css', 'minify-js', 'copy'], function() {
  gulp.src(['css/**'])
    .pipe(changed('production/css', {hasChanged: changed.compareContents}))
    .pipe(gulp.dest('production/css'))
    
  gulp.src(['img/**'])
    .pipe(changed('production/img', {hasChanged: changed.compareContents}))
    .pipe(gulp.dest('production/img'))
    
  gulp.src(['js/**'])
    .pipe(changed('production/js', {hasChanged: changed.compareContents}))
    .pipe(gulp.dest('production/js'))
    
  gulp.src(['vendor/**'])
    .pipe(changed('production/vendor', {hasChanged: changed.compareContents}))
    .pipe(gulp.dest('production/vendor'))
    
  gulp.src(['index.html'])
    .pipe(changed('production/', {hasChanged: changed.compareContents}))
    .pipe(gulp.dest('production/'))
    
  gulp.src(['android-chrome-192x192.png'])
    .pipe(changed('production/', {hasChanged: changed.compareContents}))
    .pipe(gulp.dest('production/'))
    
  gulp.src(['android-chrome-512x512.png'])
    .pipe(changed('production/', {hasChanged: changed.compareContents}))
    .pipe(gulp.dest('production/'))
    
  gulp.src(['apple-touch-icon.png'])
    .pipe(changed('production/', {hasChanged: changed.compareContents}))
    .pipe(gulp.dest('production/'))
    
  gulp.src(['browserconfig.xml'])
    .pipe(changed('production/', {hasChanged: changed.compareContents}))
    .pipe(gulp.dest('production/'))
    
  gulp.src(['favicon-16x16.png'])
    .pipe(changed('production/', {hasChanged: changed.compareContents}))
    .pipe(gulp.dest('production/'))
    
  gulp.src(['favicon-32x32.png'])
    .pipe(changed('production/', {hasChanged: changed.compareContents}))
    .pipe(gulp.dest('production/'))
    
  gulp.src(['favicon.ico'])
    .pipe(changed('production/', {hasChanged: changed.compareContents}))
    .pipe(gulp.dest('production/'))
    
  gulp.src(['manifest.json'])
    .pipe(changed('production/', {hasChanged: changed.compareContents}))
    .pipe(gulp.dest('production/'))
    
  gulp.src(['mstile-150x150.png'])
    .pipe(changed('production/', {hasChanged: changed.compareContents}))
    .pipe(gulp.dest('production/'))
    
  gulp.src(['safari-pinned-tab.svg'])
    .pipe(changed('production/', {hasChanged: changed.compareContents}))
    .pipe(gulp.dest('production/'))
});

