
//////////////////////////////////////
// Simple task to update our views  //
//////////////////////////////////////

const gulp = require('gulp');
const sass = require('gulp-sass');
// const minify = require('gulp-minify');
const nodemon = require('gulp-nodemon');
const bs = require('browser-sync').create();


// our browser-sync config + nodemon chain
gulp.task('browser-sync', ['nodemon'], function() {
	bs.init(null, {
		proxy: "http://localhost:3000",
		port: 4000,
	});
});

// the real stuff
gulp.task('default', ['browser-sync'], function () {
	gulp.watch('./views/**/*.pug', bs.reload);
	gulp.watch('./public/**/*.js', bs.reload);
	gulp.watch('./public/**/*.sass', ['sass']);
	gulp.watch(['./routes/**/*.js', './app.js', './bin/www'], ['bs-delay']);
});

gulp.task('sass', function () {
	gulp.src('public/stylesheets/sass/style.sass')
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest('public/stylesheets'))
	// .pipe(bs.reload)
}); 

// give nodemon time to restart
gulp.task('bs-delay', function () {
  setTimeout(function () {
    bs.reload({ stream: false });
  }, 1000);
});

// our gulp-nodemon task
gulp.task('nodemon', function (cb) {
	var started = false;
	return nodemon({
		script: './bin/www',
		ext: 'js',
		ignore: ['public/**/*.js'],
		env: {
			'NODE_ENV': 'development',
			'DEBUG': 'appname:*'
	 }
	}).on('start', function () {
		//avoid nodemon being started multiple times
		if (!started) {
			cb();
			started = true;
		}
	})
	.on('crash', function() {
		// console.log('nodemon.crash');
	})
	.on('restart', function() {
		// console.log('nodemon.restart');
	})
	.once('quit', function () {
		// handle ctrl+c without a big weep
		process.exit();
	});
});