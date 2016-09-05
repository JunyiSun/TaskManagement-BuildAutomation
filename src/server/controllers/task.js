var Task = require('../models/task');
var User = require('../models/user');
var underscore = require('underscore');
var fs = require('fs');
var path = require('path');

exports.detail = function(req,res){
    var suser = req.session.user;
    var _id = req.params.id;
    //increase viewed number
    Task.update({_id:_id},{$inc:{pv:1}},function(err){
        if(err){
            console.log(err);
        }
    });
    Task.findById(_id,function(err,task){
        res.render('task_detail',{
            title:'Detail',
            sessionuser: suser,
            task:task
        });
    });
};

exports.new = function(req,res){
    var suser = req.session.user;
    User.fetch(function(err,users){
        if(err){
            console.log(err);
        }
        res.render('task_new',{
            title:'Create Task Page',
            sessionuser: suser,
            users: users,
            task:{}
        });
    });

};


exports.submit = function(req,res){
    var id = req.body.task._id;
    var taskObj = req.body.task;
    var _task;


    Task.findById(id,function(err,task){
        if(err){
            console.log(err);
        }
        if(task){
            _task = underscore.extend(task,taskObj);
            _task.save(function(err,task){
                if(err){
                    console.log(err);
                }
                res.redirect('/task/' + task._id);
            });
        }
        else{
            _task = new Task(taskObj);
            _task.save(function(err,task){
                if(err){
                    console.log(err);
                }
                else{
                    task.save(function(err,task){
                        res.redirect('/task/' + task._id);
                    });
                }
            });
        }
    });
};

exports.save = function(req,res){
    var id = req.body.task._id;
    var taskObj = req.body.task;
    var _task;

    Task.findById(id,function(err,task){
        if(err){
            console.log(err);
        }
        if(task){
            _task = underscore.extend(task,taskObj);
            _task.save(function(err,task){
                if(err){
                    console.log(err);
                }
                res.redirect('/task/' + task._id);
            });
        }
    });
};

exports.update = function(req,res){
    var _id = req.params.id;
    var suser = req.session.user;

    Task.findById(_id,function(err,task){
      User.findOne({name:task.status},function(err,user){
            if(err){
                console.log(err);
            }
            res.render('task_update',{
                title:'Update Page',
                task:task,
                sessionuser: suser,
                statusrole:user.role
            });
        });
      });
};

exports.workload = function(req,res){
    var suser = req.session.user;
    Task.find({})
        .exec(function(err,tasks){
            if(err){
                console.log(err);
            }
            res.render('task_team_workload',{
                title:'Team Workload',
                sessionuser: suser,
                tasks:tasks
            });
        });
};

exports.schedule = function(req,res){
    var suser = req.session.user;
    Task.find({})
        .exec(function(err,tasks){
            if(err){
                console.log(err);
            }
            res.render('task_my_schedule',{
                title:'My Schedule',
                sessionuser: suser,
                tasks:tasks
            });
        });
};

exports.earlyinput = function(req,res){
    var suser = req.session.user;
    Task.find({})
        .exec(function(err,tasks){
            if(err){
                console.log(err);
            }
            res.render('task_early_input',{
                title:'Early Input',
                sessionuser: suser,
                tasks:tasks
            });
        });
};

exports.del = function(req,res){
    var id  = req.query.id;
    if(id){
        Task.remove({_id:id},function(err,task){
            if(err){
                console.log(err);
            }
            res.json({success:1});
        });
    }
};


exports.remove_add = function(req,res){
    var id  = req.query.id;
    var suser = req.session.user;
    if(id){
        Task.findById({_id:id},function(err,task){
          Task.update({_id:task._id},{$set:{status:undefined}},function(err){
            if(err){
                console.log(err);
            }
            res.json({success:1});
        });
    });
  }
};


exports.add = function(req,res){
    var id  = req.query.id;
    var suser = req.session.user;
    if(id){
        Task.findById({_id:id},function(err,task){
          Task.update({_id:task._id},{$set:{status:suser.name}},function(err){
            if(err){
                console.log(err);
            }
            res.json({success:1});
        });
    });
  }
};
