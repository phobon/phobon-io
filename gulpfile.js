require("babel-polyfill");

var gulp = require('gulp');
var clean = require('gulp-clean');

var copy = require('gulp-copy');

// Typescript transpiling
var tsc = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');

// Bundling
var browserify = require("browserify");
var through = require("through2");
var globby = require("globby");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");

// Minifying
var babel = require("gulp-babel");
var uglify = require("gulp-uglify");

// Stylesheet transpiling
var less = require('gulp-less');
var postcss = require('gulp-postcss');
var nano = require('cssnano');
var autoprefixer = require('autoprefixer');
var rename = require('gulp-rename');

// Use this task to just compile the typescript
gulp.task('tsc', function() {
    var result = gulp.src(['./src/**/*.ts', './typings/**/*.ts'])    
        .pipe(sourcemaps.init())
        .pipe(tsc({
            target: 'ES6',
            module: 'commonjs'            
        }));
        
    return result.js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/scripts'))
});

// Compile less files (css preprocessor)
gulp.task('less', function() {
    var processors = [autoprefixer, nano];    
    return gulp.src('./src/stylesheets/phobon.less')
        .pipe(less())
        .pipe(postcss(processors))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./public/stylesheets'))
});

// Clean all of our old js files
gulp.task('clean', function() {    
    return gulp.src(['./public/scripts/*.js'])
        .pipe(clean());
});

gulp.task('polyfill', function() {
    gulp.src(['./node_modules/babel-polyfill/dist/polyfill.min.js'])
        .pipe(gulp.dest('./public/scripts/deps/'));
});

gulp.task('dev', ['clean', 'polyfill', 'tsc', 'less'], function() {
    var bundledStream = through();
    
    // Set up our bundled stream with the output that we want to achieve.
    bundledStream
        .pipe(source('./public/scripts/phobon.dev.js'))
        .pipe(new buffer())   
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./'));        
    
    // Match files based on a pattern and pipe into our bundled stream.
    globby(['./public/scripts/*.js', './public/scripts/**/*.js', '!./public/scripts/deps/*.js']).then(function(entries) {
        var b = browserify({ entries: entries }); 
        b.bundle().pipe(bundledStream);
    }).catch(function(err) {
        bundledStream.emit('error', err);
    });
    
    return bundledStream;
});

// Build our release files - if you don't mind compiling taking a couple of seconds, use this.
gulp.task('release', ['clean', 'tsc', 'less'], function() {
    var bundledStream = through();
    
    // Set up our bundled stream with the output that we want to achieve.
    bundledStream
        .pipe(source('./public/scripts/phobon.min.js'))
        .pipe(new buffer())   
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./'));        
    
    // Match files based on a pattern and pipe into our bundled stream.
    globby(['./public/scripts/*.js', './public/scripts/**/*.js', '!./public/scripts/deps/*.js']).then(function(entries) {
        var b = browserify({ entries: entries }); 
        b.bundle().pipe(bundledStream);
    }).catch(function(err) {
        bundledStream.emit('error', err);
    });
    
    return bundledStream;
});