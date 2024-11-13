"use strict"

import { src, dest } from 'gulp';
import gulp from "gulp";
import autoprefixer from "gulp-autoprefixer";
import cssbeautify from "gulp-cssbeautify";
import removeComments from "gulp-strip-css-comments";
import rename from "gulp-rename";
import gulpSass from "gulp-sass";
import sass from "sass"; 
import cssnano from "gulp-cssnano"; 
import uglify from "gulp-uglify" ;
import plumber from "gulp-plumber";
import panini from "panini";
import imagemin from "gulp-imagemin";
import del from "del";
import browserSync, { stream } from 'browser-sync';
import rigger from "gulp-rigger";
import notify from "gulp-notify";
import gifsicle from 'imagemin-gifsicle';


const sassCompiler = gulpSass(sass); 
const bs =browserSync.create();

/* Paths */
const srcPath = "src/"
const distPath = "dist/"

const path = {
    build:{
        html: distPath,
        css: distPath + "assets/css/",
        js: distPath + "assets/js/",
        images: distPath + "assets/images/",
        fonts: distPath + "assets/fonts/"
    },
    src:{
        html:srcPath + "*.html",
        css:srcPath +  "assets/scss/*.scss",
        js:srcPath +  "assets/js/*.js",
        images: srcPath + "assets/images/**/*.{jpeg,png,svg,gif,ico,webp,xml,json}",
        fonts: srcPath + "assets/fonts/**/*.{eot,woff,woff2,ttf,svg}"
    },
    watch:{
        html:   srcPath + "**/*.html",
        css:    srcPath +  "assets/scss/**/*.scss",
        js:     srcPath +  "assets/js/**/*.js",
        images: srcPath + "assets/images/**/*.{jpeg,png,svg,gif,ico,webp,xml,json}",
        fonts:  srcPath + "assets/fonts/**/*.{eot,woff,woff2,ttf,svg}"
    },
    clean:"./" + distPath
}

function html(){
    return src(path.src.html, {base: srcPath})
        .pipe(plumber())
        .pipe(dest(path.build.html))
        .pipe(browserSync.reload({stream: true}));
}

function css(){
    return src(path.src.css, {base : srcPath+ "assets/scss/"})
    .pipe(plumber({errorHandler: notify.onError("Error: scss")}))
    .pipe(sassCompiler().on('error', sassCompiler.logError))
    .pipe(autoprefixer())
    .pipe(cssbeautify())
    .pipe(dest(path.build.css))
    .pipe(cssnano({
        zindex:false,
        discardComments:{
            removeAll:true
        }
    }))
    .pipe(removeComments())
    .pipe(rename({
        suffix:".min",
        extname: ".css"
    }))
    .pipe(dest(path.build.css))
    .pipe(browserSync.reload({stream: true}));
}

function js(){
    return src(path.src.js, {base : srcPath+ "assets/js/"})
    .pipe(plumber({errorHandler: notify.onError("Error: js")}))
    .pipe(rigger())
    .pipe(dest(path.build.js))
    .pipe(uglify())
    .pipe(rename({
        suffix: ".min",
        extname: ".js"
    }))
    .pipe(dest(path.build.js))
    .pipe(browserSync.reload({stream: true}));
}


function images(){
    return src (path.src.images,{base: srcPath+ "assets/images/" ,encoding: false })
    .pipe(dest(path.build.images))
    .pipe(browserSync.reload({stream: true}));
}

function clean(){
    return del(path.clean)
}

function fonts(){
    return src (path.src.fonts,{base: srcPath+ "assets/fonts/" })
    .pipe(browserSync.reload({stream: true}));
}

function watchFiles(){
    gulp.watch((path.watch.html),html)
    gulp.watch((path.watch.css),css)
    gulp.watch((path.watch.js),js)
    gulp.watch((path.watch.images),images)
    gulp.watch((path.watch.fonts),fonts)
}

function serv(){
    browserSync.init({
        server:{
            baseDir:"./"+distPath
        }
    });
}

const build = gulp.series(clean, gulp.parallel(html,css,js,images,fonts));
const watch = gulp.parallel(build,watchFiles,serv);


export { html };
export { css };
export { js };
export { images };
export { clean };
export { fonts };
export { build };
export { watch }; 
export default watch;
