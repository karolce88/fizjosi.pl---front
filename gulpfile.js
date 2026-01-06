const { src, dest, series, parallel, watch } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const cssnano = require('gulp-cssnano')
const autoprefixer = require('gulp-autoprefixer')
const rename = require('gulp-rename')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const imagemin = require('gulp-imagemin')
const sourcemaps = require('gulp-sourcemaps')
const browserSync = require('browser-sync').create()
const clean = require('gulp-clean')
const kit = require('gulp-kit')

const paths = {
  sass: './src/sass/**/*.scss',
  js: './src/js/**/*.js',
  img: './src/img/*',

  sassDest: './dist/css',
  jsDest: './dist/js',
  imgDest: './dist/img',

  // źródła .kit
  kit: './html/**/*.kit',

  // co czyścimy
  distImg: './dist/img',
}

// --- BUILD TASKS ---

function sassCompiler() {
  return src(paths.sass)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write())
    .pipe(dest(paths.sassDest))
}

function javaScript() {
  return src(paths.js)
    .pipe(sourcemaps.init())
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write())
    .pipe(dest(paths.jsDest))
}

function convertImages() {
  return src(paths.img).pipe(imagemin()).pipe(dest(paths.imgDest))
}

function deleteImg() {
  return src(paths.distImg, { read: false, allowEmpty: true }).pipe(clean())
}

/**
 * Kompiluje .kit do .html w katalogu głównym projektu.
 * Wyklucza partiale zaczynające się od "_" (np. _nav.kit).
 */
function handleKits() {
  return src([paths.kit, '!./html/_*.kit', '!./html/**/_*.kit'])
    .pipe(kit())
    .pipe(dest('./'))
}

// --- DEV SERVER ---

function startBrowserSync(done) {
  browserSync.init({
    server: { baseDir: './' },
    port: 3002,
    ui: false,
    notify: false,
    open: true,
  })
  done()
}

function reload(done) {
  browserSync.reload()
  done()
}

function watchFiles() {
  // kit -> html
  watch([paths.kit], series(handleKits, reload))

  // sass -> css
  watch(paths.sass, series(sassCompiler, reload))

  // js -> min js
  watch(paths.js, series(javaScript, reload))

  // images -> min images
  watch(paths.img, series(convertImages, reload))

  // jeśli ręcznie edytujesz *.html w root, też odśwież
  watch('./*.html', series(reload))
}

// --- MAIN ---

const build = parallel(handleKits, sassCompiler, javaScript, convertImages)
const dev = series(build, startBrowserSync, watchFiles)

exports.sass = sassCompiler
exports.js = javaScript
exports.kit = handleKits
exports.images = convertImages
exports.deleteImg = deleteImg
exports.build = build
exports.default = dev
