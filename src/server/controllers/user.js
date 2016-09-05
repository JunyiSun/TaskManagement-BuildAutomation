/**
 * Created by sunjunyi on 6/8/16.
 */
var User = require('../models/user');
var underscore = require('underscore');
var fs = require('fs');
var path = require('path');


//sign up
exports.signup = function(req,res){
    var _user = req.body.user;
    var password = req.body.user.password;
    var confirm = req.body.user.confirmpassword;
    var role = req.body.user.role;
    var name = req.body.user.name;
    User.findOne({email:_user.email},function(err,user){
        if(err){
            console.log(err);
        }
        if(user){
            return res.json({data:0});
        }
        else{
            if (password==confirm){
                User.findOne({role:20},function(err,userObj){
                    if (err){
                        console.log(err);
                    }
                    user = new User(_user);
                    user.role = role;
                    user.name = name;
                    user.password = user.generateHash(password);
                    user.save(function(err,user){
                        if(err){
                            console.log(err);
                        }
                        req.session.user = user;   //save current admin user to session
                        return res.json({data:1});
                    });

                });
            }
            else{
                return res.json({data:2});
            }
        }
    });
};



// signin
exports.signin = function(req,res){
    var _user = req.body.user || '';
    var email = _user.email || '';
    var password = _user.password;

    User.findOne({email:email},function(err,user){
        if(err){
            console.log(err);
        }
        if(!user){
            console.log('Account Does Not Exist');
            return res.json({data:0});
        }
        //compare password
        isMatch = user.comparePassword(password);
        if (isMatch){
            req.session.user = user;   //save current user to session
            var _curr = req.session.user;
            if(_curr.role <= 10){
                return res.json({data:2});
            }
            else{
                return res.json({data:3});
            }
        }
        else{
            //Password does not match
            return res.json({data:1});
        }

    });
};



// logout
exports.logout = function(req,res){
    delete req.session.user;
    res.redirect('/');
};

exports.saveImage = function(req, res, next){
    var imageData = req.files.uploadImage;    //Upload
    var filePath = imageData.path;			//Path
    var originalFilename = imageData.originalFilename;//Original name

    if(originalFilename){
        fs.readFile(filePath,function(err,data){
            var timestamp = Date.now();  //get time
            var type = imageData.type.split('/')[1]; //get type
            var image = timestamp + '.' + type;   //rename
            //save to directory
            var newPath = path.join(__dirname,'../../','/client/images' + image);

            fs.writeFile(newPath,data,function(err){
                req.image = image;
                next();
            });
        });
    }else{
        //No image upload
        next();
    }
};


exports.save = function(req,res){
    var suser = req.session.user;
    var id = req.body.user._id;
    var userObj = req.body.user;
    var _user;
    // change image path
    if(req.image){
        userObj.image = req.image;
    }

    User.findById(id,function(err,user){
        if(err){
            console.log(err);
        }
        //underscore: extend changed content
        _user = underscore.extend(user,userObj);
        _user.save(function(err,user){
            if(err){
                console.log(err);
            }
            if (suser.role >10){
                res.redirect('/admin/user/list');
            }
            else{
                res.redirect('/regular/user/profile/'+user._id);
            }
        });
    });
};

exports.changepwd = function(req,res){
    var _user = req.body.user || '';
    var email = _user.email || '';
    var password = _user.password;
    var newpwd = _user.newpassword;
    var confirmpwd = _user.confirmnewpassword;
    console.log(_user);
    User.findOne({email:email},function(err,user){
        if(err){
            console.log(err);
        }
        if(!user){
            console.log('Account Does Not Exist');
            return res.json({data:0});
        }
        isMatch2 = user.comparePassword(password);
        if (isMatch2){
            if(newpwd == confirmpwd){
                newpwd = user.generateHash(newpwd);
                User.update({email:email},{$set:{password:newpwd}},function(err){
                    if(err){
                        console.log(err);
                    }
                });
                res.redirect('/');
            }
            else{
                return res.json({data:2});
            }
        }
        else{
            //Does not match
            return res.json({data:1});
        }
    });
};

//regular userlist
exports.regularList = function(req,res){
    var suser = req.session.user;
    User.fetch(function(err,users){
        if(err){
            console.log(err);
        }
        res.render('userlist_regular',{
            title:'Regular User List',
            sessionuser: suser,
            users:users
        });
    });
};

exports.regularProfile = function(req,res){
    var suser = req.session.user;
    var _id = req.params.id;
    //increase viewed number
    User.update({_id:_id},{$inc:{pv:1}},function(err){
        if(err){
            console.log(err);
        }
    });
    User.findById(_id,function(err,user){
        ChatWith
            .find({with:_id})
            .populate('from','name image')
            .populate('reply.from','name image')
            .populate('reply.to','name')
            .exec(function(err,chats){
                res.render('userprofile_regular',{
                    title:'Profile',
                    sessionuser: suser,
                    messages:chats,
                    user:user
                });
            });
    });
};

exports.regularEdit = function(req,res){
    var suser = req.session.user;
    var id = req.params.id;
    if(id){
        User.findById(id,function(err,user){
            res.render('useredit',{
                title: 'Edit Profile',
                sessionuser: suser,
                user: user
            });
        });
    }
};

//userlist page
exports.adminList = function(req,res){
    var suser = req.session.user;
    User.fetch(function(err,users){
        if(err){
            console.log(err);
        }
        res.render('userlist_admin',{
            title:'Welcome to Admin',
            sessionuser: suser,
            users:users
        });
    });
};

exports.adminProfile = function(req, res){
    var _id = req.params.id;
    var suser = req.session.user;
    //increase viewed number
    User.update({_id:_id},{$inc:{pv:1}},function(err){
        if(err){
            console.log(err);
        }
    });
    User.findById(_id,function(err,user){
        ChatWith
            .find({with:_id})
            .populate('from','name image')
            .populate('reply.from','name image')
            .populate('reply.to','name')
            .exec(function(err,chats){
                res.render('userprofile_admin',{
                    title:'Profile',
                    sessionuser: suser,
                    messages: chats,
                    user:user
                });
            });
    });
};

exports.adminEdit = function(req, res){
    var id = req.params.id;
    var suser = req.session.user;
    if(id){
        User.findById(id,function(err,user){
            res.render('useredit',{
                title: 'Edit Profile',
                sessionuser: suser,
                user: user
            });
        });
    }
};

exports.makeAdmin = function(req, res){
    var id = req.query.id;
    if (id){
        User.findById(id,function(err,user){
            if(user.role ==10){
                User.update({_id:user._id},{$set:{role:20}},function(err){
                    if(err){
                        console.log(err);
                    }
                    res.json({success:1});
                });
            }
            else{
                User.update({_id:user._id},{$set:{role:10}},function(err){
                    if(err){
                        console.log(err);
                    }
                    res.json({success:1});
                });
            }
        });
    }
};

//delete user account
exports.del = function(req, res){
    var id  = req.query.id;

    if(id){

        //Removes the user's textbooks
        Textbook.remove({userId: id}, function(err, tbs){
            if (err) console.log(err);
        });

        //Removes related traderequests
        TradeRequest.remove({$or:[ {userId: id}, {offerUserId: id}]}, function(err, rqs){
            if (err) console.log(err);
        });

        User.remove({_id:id},function(err,user){
            if(err){
                console.log(err);
            }
            res.json({success:1});
        });
    }
};

// midware for user
exports.signinRequired = function(req,res,next){
    var _user = req.session.user;

    if(!_user){
        res.redirect('/');
    }
    next();
};

exports.adminRequired = function(req,res,next){
    var _user = req.session.user;

    if(_user.role <= 10){
        res.redirect('/');
    }
    next();
};

exports.superadminRequired = function(req,res,next){
    var _user = req.session.user;

    if(_user.role < 20){
        res.redirect('/');
    }
    next();
};
