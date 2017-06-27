'use strict';
var gulp    = require('gulp'),
		browserSync = require('browser-sync').create(),
		SSI         = require('browsersync-ssi'),
		concat      = require('gulp-concat'),
		minify      = require('gulp-minify'),
		plumber     = require('gulp-plumber'),
		sass        = require('gulp-sass'),
		autoprefixer= require('gulp-autoprefixer'),
		minifycss   = require('gulp-minify-css'),
		zip         = require('gulp-zip'),
		spritesmith = require('gulp.spritesmith');

gulp.task('server',function(){
	browserSync.init({
      server: {
         baseDir:["./src/"],
      }
  });
  gulp.watch(['./src/sass/*.scss'],['sass']);
  gulp.watch(['./src/index.html','./src/html/*.html'],['sass']).on('change',browserSync.reload);
  gulp.watch(['./src/js/**/*.js']).on('change',browserSync.reload);
})

gulp.task('build',['css','js','html','sprite','img'],function(){
	console.log('转移html')
	console.log('打包完毕，写编号')
});

gulp.task('css',function(){
	return gulp.src(['./src/css/*.css'])
	.pipe(minifycss())
	.pipe(gulp.dest('./build/css'))
})
gulp.task('sprite',function(){
	return gulp.src(['./src/sprite/*.css','./src/sprite/*.png'])
	.pipe(gulp.dest('./build/sprite/'))
})

gulp.task('img',function(){
	return gulp.src(['./src/images/*.png','./src/images/*.jpg'])
	.pipe(gulp.dest('./build/images/'))
})

gulp.task('js',function(){
	return gulp.src('./src/js/**/*.js')
					.pipe(plumber())
					.pipe(minify({
							ext:{
								min:'.js'
							},
							noSource:true
						}))
					.pipe(gulp.dest('build/js/'))
})

gulp.task('html',function(){
	return gulp.src(['./src/*.html','./src/**/*.html'])
					.pipe(plumber())
					.pipe(gulp.dest('build/'))
})

gulp.task('sass',function(){
	return gulp.src('./src/sass/*.scss')
	  .pipe(sass.sync().on('error', sass.logError))
    .pipe(sass({outputStyle:"compact"}))
    .pipe(autoprefixer())
    .pipe(gulp.dest("./src/css"))
    .pipe(browserSync.stream());
})


gulp.task('icon',function(){
	return gulp.src('./src/icon/*.png')
	.pipe(spritesmith({
				imgName: 'sprite.png',//保存合并后图片的地址
				cssName: 'sprite.css',//保存合并后对于css样式的地址
				padding:5,//合并时两个图片的间距
        algorithm: 'binary-tree',//注释1
        cssTemplate: function (data) {
          var arr=[];
          data.sprites.forEach(function (sprite) {
              arr.push(".icon-"+sprite.name+
              "{" +
              "background-image: url('"+sprite.escaped_image+"');"+
              "background-position: "+sprite.px.offset_x+" "+sprite.px.offset_y+";"+
              "width:"+sprite.px.width+";"+
              "height:"+sprite.px.height+";"+
              "}\n");
          });
          return arr.join("");
      	}
		}))
		.pipe(gulp.dest('./src/sprite'))
})