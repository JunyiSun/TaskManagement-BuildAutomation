var gulp = require('gulp');
var config = require('./gulp.config')();
var args = require('yargs').argv;
var del = require('del');
var $ = require('gulp-load-plugins')({lazy:true});
var port = process.env.PORT || config.defaultPort;
var browserSync = require('browser-sync');
var mocha = require('gulp-mocha');
var coverage = require('gulp-coverage');
var open = require('gulp-open');
var os = require('os');

gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

gulp.task('vet', function(){
    log('Analyzing source with JSHint and JSCS');
    return gulp
    .src(config.alljs)
    .pipe($.if(args.verbose, $.print()))
    .pipe($.jscs())
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish',{verbose:true}))
    .pipe($.jshint.reporter('fail'));
});


gulp.task('styles',['clean-styles'], function(){
    log ('Compiling Less --> css');
    return gulp
        .src(config.less)
        .pipe($.plumber())
        .pipe($.less())
        .pipe($.autoprefixer({browsers:['last 2 version', '> 5%']}))
        .pipe(gulp.dest(config.temp));
});

gulp.task('clean-styles', function(){
    var files = config.temp + '**/*.css';
    clean(files);
});

gulp.task('less-watcher',function(){
    gulp.watch([config.less],['styles']);
});



gulp.task('inject', ['styles'], function(){
    log('Wire up the bower css + js and Inject customized js and css into html');
    var options = config.getWiredepDefaultOptions();
    var wiredep = require('wiredep').stream;

    return gulp
        .src(config.index)
        .pipe(wiredep(options))
        .pipe($.inject(gulp.src(config.js)))
        .pipe($.inject(gulp.src(config.css)))
        .pipe(gulp.dest(config.head));
});

gulp.task('optimize',['inject'],function(){
    log('Optimizing the js, css, html(jade)');

    var assets = $.useref.assets({searchPath:'./'});
    return gulp
        .src(config.index)
        .pipe($.plumber())
        .pipe(assets)
        .pipe(assets.restore())
        .pipe(gulp.dest(config.temp));

});

gulp.task('serve-dev', ['inject'], function(){
    log('Wire up the app and start server');
    serve(true, false);
});

gulp.task('build-test',['vet'],function(){
    return gulp
        .src(config.test,{read:false})
        .pipe(coverage.instrument({
            pattern:['src/server/**/*.js'],
            debugDirectory:'debug'
        }))
        .pipe(mocha({reporter:'spec'}))
        .pipe(coverage.gather())
        .pipe(coverage.format())
        .pipe(gulp.dest('reports'))
        .on('error',function(err){
            this.emit('end');
        });
});

gulp.task('test', ['build-test'],function(){
    var browser = os.platform() === 'linux' ? 'google-chrome' : (
        os.platform() === 'darwin' ? 'google chrome' : (
            os.platform() === 'win32' ? 'chrome' : 'firefox'));

    gulp.src('./reports/coverage.html')
        .pipe(open({app: browser}));
});

gulp.task('test-watcher',['vet'],function(){
    gulp.watch([config.alltest],['test']);
});

gulp.task('serve-test',function(done){
    log('Running the test and display on HTML');
    serve(true, true);
    done();
});
//=====================================================================
function clean(path){
    log ('Cleaning ' + $.util.colors.blue(path));
    del(path);
}


function log(msg){
    if (typeof(msg) === 'object'){
        for (var item in msg){
            if(msg.hasOwnProperty(item)){
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    }else{
        $.util.log($.util.colors.blue(msg));
    }
}

function startBrowserSync(isDev, testRunner){
    if(browserSync.active){
        return;
    }

    log('Starting browser-sync on port ' + port);

    var options = {
        proxy :'localhost:' + port,
        port: 3100,
        files: isDev? [config.client + '**/*.*',
            config.server +'views/**/*.*']: [],
        ghostMode :{
            clicks: true,
            location: false,
            forms: true,
            scroll: true
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'debug',
        logPrefix: 'gulp-patterns',
        notify: true,
        reloadDelay: 500
    };
    if(testRunner){
        options.startPath = 'testrunner.html';
    }

    browserSync(options);
}

function serve(isDev, testRunner){
    var nodeOptions = {
        scripts: config.nodeServer,
        delayTime: 1,
        env:{
            'PORT': port,
            'NODE_ENV': isDev ? 'dev' :'build'
        },
        watch: [config.server]
    };
    return $.nodemon(nodeOptions)
        .on('restart', function(ev){
            log('***nodemon restarted');
            log('files changed on restart: \n' + ev);
        })
        .on('start', function(){
            log('***nodemon started');
            startBrowserSync(isDev, testRunner);
        })
        .on('crash',function(){
            log('***nodemon crashed: script crashed for some reason');
        })
        .on('exit', function(){
            log('***nodemon exited cleanly');
        });
}