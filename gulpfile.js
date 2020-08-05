var gulp = require('gulp');
var concat = require('gulp-concat'); //- 多个文件合并为一个；
var minifyCss = require('gulp-minify-css'); //- 压缩CSS为一行；
// var minifyJS = require('gulp-minify'); //- 压缩CSS为一行；
var uglify = require('gulp-uglify') // - 压缩JS
var rev = require('gulp-rev'); //- 对文件名加MD5后缀
var revCollector = require('gulp-rev-collector'); //- 路径替换

function cssConcat() {
  return gulp.src(
    [
      // './src/assets/font-awesome-4.6.3/css/font-awesome.min.css',
      './src/assets/fonts/fonts.css',
      './src/assets/plugin.min.css',
      './src/assets/layout.min.css',
      './src/assets/theme-and-page.min.css',
      './src/assets/responsive.min.css',
    ]) //- 需要处理的css文件，放到一个字符串数组里
    .pipe(concat('concat.min.css')) //- 合并后的文件名
    .pipe(minifyCss()) //- 压缩处理成一行
    .pipe(rev()) //- 文件名加MD5后缀
    .pipe(gulp.dest('./src/assets')) //- 输出文件本地
    .pipe(rev.manifest()) //- 生成一个rev-manifest.json
    .pipe(gulp.dest('./gulp/css')); //- 将 rev-manifest.json 保存到 rev 目录内
}

function jsConcat() {
  return gulp.src(
      [
        './src/assets/three.js',
        './src/assets/threeLegacyJSONLoader.js',
        './src/assets/other-plugin.js',
        // './src/assets/all.min.js',
      ]) //- 需要处理的css文件，放到一个字符串数组里
    .pipe(concat('concat.min.js')) //- 合并后的文件名
    // .pipe(uglify()) //- 压缩处理成一行
    .pipe(rev()) //- 文件名加MD5后缀
    .pipe(gulp.dest('./src/assets')) //- 输出文件本地
    .pipe(rev.manifest()) //- 生成一个rev-manifest.json
    .pipe(gulp.dest('./gulp/js')); //- 将 rev-manifest.json 保存到 rev 目录内
}

function replace() {
  return gulp.src(['./gulp/**/*.json', './src/index.html'])
    .pipe(revCollector({
      replaceReved: true,
      dirReplacements: {
        'css': 'assets',
        '/js/': '/assets',
        // 'cdn/': function (manifest_value) {
        //   return '//cdn' + (Math.floor(Math.random() * 9) + 1) + '.' + 'exsample.dot' + '/img/' + manifest_value;
        // }
      }
    }))
    .pipe(gulp.dest('./src'));
}

exports.default = gulp.series(cssConcat, jsConcat, replace);
exports.replace = gulp.series(replace);
exports.js = gulp.series(jsConcat);