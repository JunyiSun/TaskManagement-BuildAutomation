/**
 * Created by sunjunyi on 6/14/16.
 */
module.exports = function(){
    var client = './src/client/';
    var server = './src/server/';
    var test = './test/*.js';

    var config = {
        temp: './.temp/',

        //all js that I want to vet
        alljs :[
            './src/**/*.js',
            './*.js',
            '!./src/client/libs/**/*.js'
        ],

        index: server + 'views/head.html',

        js: [client +'js/*.js',
            client + 'app/*.js'
            ],

        css: [client + 'css/*.css',
            './bower_components/bootstrap/dist/css/bootstrap.min.css'],

        less: client + 'css/styles.less',
        head: server + 'views/includes/',

        test: test,
        alltest: [test,
            server + '**/*/js'
        ],

        defaultPort: 8000,
        nodeServer:'./app.js',
        server: server,


        bower:{
            json: require('./bower.json'),
            directory: './bower_components',
            ignorePath: '../..'
        }
    };

    config.getWiredepDefaultOptions = function(){
        var options= {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };
        return options;
    };
    return config;
};