const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));  // Definindo o compilador 'sass'
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
const htmlmin = require('gulp-htmlmin');  // Importando o gulp-htmlmin

// Definir os caminhos de arquivos
const paths = {
src: 'src',
dist: 'dist',
scss: 'src/scss/**/*.scss',
js: 'src/js/**/*.js',
images: 'src/images/**/*',
html: 'src/*.html',
cssDest: 'dist/css',
jsDest: 'dist/js',
imagesDest: 'dist/images',
htmlDest: 'dist'
};

// Tarefa para compilar Sass para CSS
gulp.task('sass', () => {
return gulp.src(paths.scss)
.pipe(sass().on('error', sass.logError))
.pipe(cleanCSS())
.pipe(rename({ suffix: '.min' }))
.pipe(gulp.dest(paths.cssDest))
.pipe(browserSync.stream());
});

// Tarefa para minificar JavaScript
gulp.task('scripts', () => {
return gulp.src(paths.js)
.pipe(uglify())
.pipe(rename({ suffix: '.min' }))
.pipe(gulp.dest(paths.jsDest))
.pipe(browserSync.stream());
});

// Tarefa para otimizar as imagens
gulp.task('images', () => {
return gulp.src(paths.images)
.pipe(imagemin())
.pipe(gulp.dest(paths.imagesDest));
});

// Tarefa para minificar HTML
gulp.task('html', () => {
return gulp.src(paths.html)
.pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
.pipe(gulp.dest(paths.htmlDest));
});

// Tarefa para iniciar o servidor de desenvolvimento
gulp.task('serve', () => {
browserSync.init({
server: paths.dist
});

// Observando as alterações nos arquivos
gulp.watch(paths.scss, gulp.series('sass'));
gulp.watch(paths.js, gulp.series('scripts'));
gulp.watch(paths.images, gulp.series('images'));
gulp.watch(paths.html, gulp.series('html'));  // Observando os arquivos HTML também
gulp.watch(`${paths.dist}/*.html`).on('change', browserSync.reload);
});

// Tarefa de build
gulp.task('build', gulp.series('sass', 'scripts', 'images', 'html'));  // Incluindo a tarefa 'html' no build

// Tarefa padrão
gulp.task('default', gulp.series('build', 'serve'));
