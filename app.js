var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var fs = require('fs');
var _ = require('underscore');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);


var port = process.env.PORT;
var environment = process.env.NODE_ENV;
var app = express();


var dbUrl = process.env.MONGOLAB_URI || 'mongodb://localhost/emt';
mongoose.connect(dbUrl);


// models loading
var models_path = __dirname + '/src/server/models';
var walk = function(path) {
    fs
        .readdirSync(path)
        .forEach(function(file) {
            var newPath = path + '/' + file;
            var stat = fs.statSync(newPath);

            if (stat.isFile()) {
                if (/(.*)\.(js|coffee)/.test(file)) {
                    require(newPath);
                }
            }
            else if (stat.isDirectory()) {
                walk(newPath);
            }
        });
};
walk(models_path);



app.set('views','./src/server/views/pages');  //views files
app.set('view engine','jade');//set templete
app.use(express.static(__dirname)); //set path of client files
app.locals.moment = require('moment');
// parse application
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());
app.use(session({
    secret:'imooc',
    resave: false,
    saveUninitialized: true,
    store: new mongoStore({
        url: dbUrl,
        collection: 'sessions'
    })
}));

app.set('view options', { layout: false });



require('./src/server/routes')(app);
app.listen(port);	//starts here!!!

console.log('Started on port:' + port);
console.log('NODE_ENV = ' + environment);