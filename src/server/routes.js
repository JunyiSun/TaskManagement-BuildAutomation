var Index = require('./controllers/index');
var User = require('./controllers/user');
var Task = require('./controllers/task');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();



module.exports = function(app){
    //pre handle user
    app.use(function(req,res,next){
        app.locals.user = req.session.user;
        next();
    });

    // index page
    app.get('/',Index.index);


//section of user ==============================================================
// signup
app.post('/user/signup',User.signup);
// signin
app.post('/user/signin',User.signin);
// logout
app.get('/logout',User.logout);

/*
 User.signinRequired
 User.adminRequired
 */
app.post('/user/saveprofile', multipartMiddleware,User.signinRequired,User.saveImage, User.save);
app.post('/user/changepassword',multipartMiddleware,User.signinRequired,User.changepwd);

app.get('/regular/user/list',User.signinRequired,User.regularList);
app.get('/regular/user/profile/:id',User.signinRequired,User.regularProfile);
app.get('/regular/user/edit/:id', User.signinRequired, User.regularEdit);

app.get('/admin/user/list',User.signinRequired, User.adminRequired, User.adminList);
app.get('/admin/user/profile/:id',User.signinRequired, User.adminRequired, User.adminProfile);
app.get('/admin/user/edit/:id',User.signinRequired, User.adminRequired, User.adminEdit);
app.delete('/admin/user/list', User.signinRequired, User.adminRequired, User.del);
app.put('/admin/user/profile', User.signinRequired, User.adminRequired, User.makeAdmin);

    //section of task==========================================================
    app.get('/regular/task/new', User.signinRequired, Task.new);
    app.post('/regular/task',multipartMiddleware, Task.submit);
    app.post('/regular/task/edit',multipartMiddleware, Task.save);
    app.post('/regular/task/add',multipartMiddleware, Task.add);
    app.post('/regular/task/remove_add',multipartMiddleware, Task.remove_add);

    app.get('/task/:id', User.signinRequired, Task.detail);

    app.get('/regular/task/update/:id', User.signinRequired, Task.update);
    app.get('/admin/task/update/:id',User.signinRequired,User.adminRequired,Task.update);
    app.get('/list/task/team_workload',User.signinRequired,Task.workload);
    app.get('/list/task/my_schedule',User.signinRequired,Task.schedule);
    app.get('/list/task/early_input',User.signinRequired,Task.earlyinput);

    app.delete('/admin/task/list', Task.del);

};
