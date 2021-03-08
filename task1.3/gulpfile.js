let preprocessor = 'sass'

const { src, dest, parallel, series, watch } = require('gulp')
const browserSync = require('browser-sync').create()
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const cleancss = require('gulp-clean-css')

function browsersync() {
	browserSync.init({ // Инициализация Browsersync
		server: { baseDir: 'app/' }, // Указываем папку сервера
		notify: false, // Отключаем уведомления
		online: true // Режим работы: true или false
	})
}

function styles(){
  return src('app/styles/scss' + preprocessor)
  .pipe(autoprefixer({overrideBrowserslist:['last 10 version'],grid:true}))
  .pipe(cleancss( { level: { 1: { specialComments: 0 } }/* , format: 'beautify' */ } ))
  .pipe(dest('app/styles/css/'))
  .pipe(browserSync.stream())
}

function startwatch(){
  watch('app/**/*' + preprocessor + '/**/*', styles)
  watch('app/**/*').on ('change', browserSync.reload)
}

function buildcopy() {
	return src([
		'app/styles/css/**/*.min.css',
		'app/img/**/*',
		'app/**/*.html',
		], { base: 'app' }) // Параметр "base" сохраняет структуру проекта при копировании
	.pipe(dest('dist'))
}

	function cleandist() {
    return del('dist/**/*', { force: true })
}

exports.browsersync = browsersync;
exports.styles = styles;

exports.build = series(cleandist, styles, buildcopy);
exports.default = parallel(styles, browsersync, startwatch);