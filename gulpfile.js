var gulp = require("gulp");
var browserSync = require("browser-sync").create();
var sass = require("gulp-sass");

//compile bootstrap and custom sass and inject into browser
gulp.task("sass", function(){
  return gulp.src(["node_modules/bootstrap/scss/bootstrap.scss", "src/scss/*.scss"])
    .pipe(sass())
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.stream());
});

//moving js files
gulp.task("js", function(){
  return gulp.src(["node_modules/bootstrap/dist/js/bootstrap.min.js", "node_modules/jquery/dist/jquery.min.js", "node_modules/popper.js/dist/umd/popper.min.js"])
    .pipe(gulp.dest("src/js"))
    .pipe(browserSync.stream());
});


//server and watching scss/html files
gulp.task("server", ["sass"], function(){
  browserSync.init({
    server: "./src"
  });

  gulp.watch(["node_modules/bootstrap/scss/bootstrap.scss", "src/scss/*.scss"], ["sass"]);
  gulp.watch("src/*.html").on("change", browserSync.reload);
});

gulp.task("copyImages", function(){
  return gulp.src("./src/assets/images/**/*")
    .pipe(gulp.dest("./docs/assets/images"));
});

gulp.task("copyHtml", function(){
  return gulp.src("./src/index.html")
    .pipe(gulp.dest("./docs"));
});

gulp.task("copyJs", function(){
  return gulp.src("./src/js/**/*")
    .pipe(gulp.dest("./docs/assets/scripts"));
});

gulp.task("copyCss", function(){
  return gulp.src("./src/css/**/*")
    .pipe(gulp.dest("./docs/assets/styles"));
});

gulp.task("build", ["copyImages","copyHtml","copyJs","copyCss"]);

gulp.task("default", ["js", "server"]);