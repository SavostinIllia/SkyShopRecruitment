let gulp = require('gulp'),
    sass = require('gulp-sass'),
    babel = require('gulp-babel'),
    browserSync = require('browser-sync'),
    cache = require('gulp-cache'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    rollup = require('rollup-stream'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer');



// const localhost_path = 'http://localhost:8888/wordpress/';

// Copy plugins from /node_modules
const pluginsToCopy = [
  './node_modules/slick-carousel/**/*.*',
];

// Bundle required JS libraries from /node_modules
const JSlibs = [
  './node_modules/jquery/dist/jquery.js',
  './node_modules/slick-carousel/slick/slick.js',
  // './node_modules/bootstrap/dist/js/bootstrap.js'
];


// Scss paths for foundation
const scss_include_paths = [
  
];

gulp.task('clean', async function() {
  del.sync('dist')
})

// Copy required libraries from /node_modules to /dist/assets
gulp.task('libs', function(){
	
	return gulp.src(pluginsToCopy, {base: './node_modules'})
	  .pipe(gulp.dest('./dist/assets/'))
})

gulp.task('jsLibs', function(){
  return gulp.src(JSlibs)
	  .pipe(sourcemaps.init())
    .pipe(concat('libs.js'))
		.pipe(uglify())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./dist/js'))
})


// Compile all .scss files and move from src to /dist
gulp.task('scss', function(){
  return gulp.src('./src/scss/**/*.scss', {base: './src/scss'})
	  .pipe(sourcemaps.init())
    .pipe(sass({
	    outputStyle: 'compressed',
	    includePaths: scss_include_paths,
	  }))
    .pipe(autoprefixer({
      browserslistrc: ['last 8 versions']
    }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
})


// Copy all .css files from /src to /dist
gulp.task('css', function(){
  return gulp.src(
    
    [
      './src/**/*.css', './src/*.css'
    ], {base: './src/'})
  	.pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
})


// Copy all .html files from /src to /dist
gulp.task('html', function(){
  return gulp.src(['./src/**/*.html', './src/*.html'], {base: './src/'})
  	.pipe(gulp.dest('./dist'))
})



// Copy all files from /src/img and all .png files to /dist
gulp.task('images', function(){
	return gulp.src('./src/**/*.{jpg,jpeg,png,svg,gif}', {base: './src/'} )
    .pipe(gulp.dest('./dist')); 
})

// Copy all files from /src/*** */ and all docs files to /dist
gulp.task('documents', function(){
	return gulp.src('./src/**/*.{pdf,docx}', {base: './src/'} )
    .pipe(gulp.dest('./dist')); 
})

// Compile app.js files from /src to /dist
gulp.task('scripts', function() {
	return rollup({
    input: './src/js/app.js',
    format: 'iife',
    sourcemap: true
  })
  .pipe(source('app.js'))
  .pipe(buffer())
	
	.pipe(sourcemaps.init({loadMaps: true}))
  .pipe(babel({
		presets: ['@babel/preset-env']
	}))
  .pipe(uglify())
  .pipe(sourcemaps.write('./maps'))
  .pipe(gulp.dest('./dist/js'));
});

gulp.task('clearCache', function(done) {
  cache.clearAll();
  done();
});

gulp.task('serve', function(done){
	browserSync.init({
    // proxy: localhost_path,
    open: false,
    reloadOnRestart: true,
    server: "./dist"
  });
  done();
});


gulp.task('reload', function(done){
	browserSync.reload();
	done();
});


// Watch
gulp.task('watch', function(){
  gulp.watch(['src/scss/**/*.scss', 'src/scss/*.scss'], gulp.series('scss'));
  gulp.watch(['./src/**/*.css', './src/*.css'], gulp.series('css'));
  gulp.watch(['./src/**/*.html', './src/*.html'], gulp.series('html', 'clearCache', 'reload'));
  gulp.watch('./src/js/**/*.js', gulp.series('scripts', 'clearCache', 'reload'));
  gulp.watch('./src/**/*.{jpg,jpeg,png,svg,gif}', gulp.series('images'));
  gulp.watch('./src/**/*.{pdf,docx}', gulp.series('documents'));
});


// Export files from /src to /dist
gulp.task('export', gulp.parallel('scss', 'css', 'html', 'scripts', 'images', 'documents'));

// Clean, copy from node_modules and export /src to /dist
gulp.task('build', gulp.series('clean', 'libs', 'jsLibs', 'export'))

gulp.task('dev', gulp.series('build', 'serve', 'watch' ));
gulp.task('prod', gulp.series('build'));
