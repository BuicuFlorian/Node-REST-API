const gulp = require('gulp');
const ts = require('gulp-typescript');
const tslint = require('gulp-tslint');
const runSequence = require('run-sequence');
const sourcemaps = require('gulp-sourcemaps');
const tsProject = ts.createProject('./tsconfig.json');

gulp.task('lint', () => {
    return gulp.src(['./server.ts', './api/**/*.ts'])
        .pipe(tslint({
            formatter: 'verbose',
            configuration: 'tslint.json'
        }))
        .pipe(tslint.report({
            summarizeFailureOutput: true
        }));
});

gulp.task('compile-server', () => {
    const tsProject = ts.createProject('tsconfig.json');
    const tsResult =
        gulp.src('./server.ts')
        .pipe(sourcemaps.init())
        .pipe(tsProject());
    return tsResult.pipe(sourcemaps.write('.', { includeContent: false, sourceRoot: '.' }))
        .pipe(gulp.dest('./build'));
});

gulp.task('compile-api', () => {
    const tsProject = ts.createProject('tsconfig.json');
    const tsResult =
        gulp.src('./api/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(tsProject());
    return tsResult.pipe(sourcemaps.write('.', { includeContent: false, sourceRoot: '.' }))
        .pipe(gulp.dest('./build/api'));
});

gulp.task('watch:server', () => {
    gulp.watch(['./server.ts', './api/**/*.ts'], ['compile-server', 'compile-api']);
});

gulp.task('default', () => {
    runSequence('lint', 'compile-server', 'compile-api');
});