
// Instrumentation Header
{
    var fs = require('fs');
    var __statement_T_Gj8z, __expression_R$9k5T, __block_o6f9R6;
    var store = require('/Users/sunjunyi/Desktop/gitrepo/emt-internal-apps-poc/node_modules/gulp-coverage/contrib/coverage_store.js');
    
    __statement_T_Gj8z = function(i) {
        var fd = store.register('/Users/sunjunyi/Desktop/gitrepo/emt-internal-apps-poc/src/server/schemas/user.js');
        fs.writeSync(fd, '{"statement": {"node": ' + i + '}},\n');
    }; 
    
    __expression_R$9k5T = function(i) {
        var fd = store.register('/Users/sunjunyi/Desktop/gitrepo/emt-internal-apps-poc/src/server/schemas/user.js');
        fs.writeSync(fd, '{"expression": {"node": ' + i + '}},\n');
    }; 
    
    __block_o6f9R6 = function(i) {
        var fd = store.register('/Users/sunjunyi/Desktop/gitrepo/emt-internal-apps-poc/src/server/schemas/user.js');
        fs.writeSync(fd, '{"block": ' + i + '},\n');
    }; 
    __intro_ftQ$EA = function(id, obj) {
        // console.log('__intro: ', id, ', obj.__instrumented_miss: ', obj.__instrumented_miss, ', obj.length: ', obj.length);
        (typeof obj === 'object' || typeof obj === 'function') &&
            Object.defineProperty && Object.defineProperty(obj, '__instrumented_miss', {enumerable: false, writable: true});
        obj.__instrumented_miss = obj.__instrumented_miss || [];
        if ('undefined' !== typeof obj && null !== obj && 'undefined' !== typeof obj.__instrumented_miss) {
            if (obj.length === 0) {
                // console.log('interim miss: ', id);
                obj.__instrumented_miss[id] = true;
            } else {
                obj.__instrumented_miss[id] = false;
            }
        }
        return obj;
    };
    function isProbablyChainable(obj, id) {
        return obj &&
            obj.__instrumented_miss[id] !== undefined &&
            'number' === typeof obj.length;
    }
    __extro_HKJAu0 = function(id, obj) {
        var fd = store.register('/Users/sunjunyi/Desktop/gitrepo/emt-internal-apps-poc/src/server/schemas/user.js');
        // console.log('__extro: ', id, ', obj.__instrumented_miss: ', obj.__instrumented_miss, ', obj.length: ', obj.length);
        if ('undefined' !== typeof obj && null !== obj && 'undefined' !== typeof obj.__instrumented_miss) {
            if (isProbablyChainable(obj, id) && obj.length === 0 && obj.__instrumented_miss[id]) {
                // if the call was not a "constructor" - i.e. it did not add things to the chainable
                // and it did not return anything from the chainable, it is a miss
                // console.log('miss: ', id);
            } else {
                fs.writeSync(fd, '{"chain": {"node": ' + id + '}},\n');
            }
            obj.__instrumented_miss[id] = undefined;
        } else {
            fs.writeSync(fd, '{"chain": {"node": ' + id + '}},\n');
        }
        return obj;
    };
};
////////////////////////

// Instrumented Code
{
    __statement_T_Gj8z(0);
    var mongoose = (__expression_R$9k5T(1), require('mongoose'));
}
{
    __statement_T_Gj8z(2);
    var Schema = mongoose.Schema;
}
{
    __statement_T_Gj8z(3);
    var ObjectId = Schema.Types.ObjectId;
}
{
    __statement_T_Gj8z(4);
    var bcrypt = (__expression_R$9k5T(5), require('bcrypt'));
}
{
    __statement_T_Gj8z(6);
    var UserSchema = new Schema({
            email: {
                unique: true,
                type: String,
                index: true
            },
            password: String,
            name: String,
            description: String,
            image: String,
            role: {
                type: String,
                default: 'Administrator'
            },
            tasks: [
                {
                    type: ObjectId,
                    ref: 'Task'
                }
            ],
            pv: {
                type: Number,
                default: 0
            },
            meta: {
                createAt: {
                    type: Date,
                    default: __extro_HKJAu0(7, __intro_ftQ$EA(7, Date).now())
                },
                updateAt: {
                    type: Date,
                    default: __extro_HKJAu0(8, __intro_ftQ$EA(8, Date).now())
                }
            }
        });
}
{
    __statement_T_Gj8z(9);
    __extro_HKJAu0(10, __intro_ftQ$EA(10, UserSchema).pre('save', function (next) {
        __block_o6f9R6(0);
        {
            __statement_T_Gj8z(11);
            var user = this;
        }
        if (this.isNew) {
            __block_o6f9R6(1);
            {
                __statement_T_Gj8z(12);
                this.meta.createAt = this.meta.updateAt = __extro_HKJAu0(13, __intro_ftQ$EA(13, Date).now());
            }
            {
                __statement_T_Gj8z(14);
                this.image = 'gravatar.png';
            }
        } else {
            __block_o6f9R6(2);
            {
                __statement_T_Gj8z(15);
                this.meta.updateAt = __extro_HKJAu0(16, __intro_ftQ$EA(16, Date).now());
            }
        }
        {
            __statement_T_Gj8z(17);
            __expression_R$9k5T(18), next();
        }
    }));
}
{
    __statement_T_Gj8z(19);
    UserSchema.methods = {
        generateHash: function (password) {
            __block_o6f9R6(3);
            return __expression_R$9k5T(20), __extro_HKJAu0(21, __intro_ftQ$EA(21, bcrypt).hashSync(password, __extro_HKJAu0(22, __intro_ftQ$EA(22, bcrypt).genSaltSync(9))));
        },
        comparePassword: function (password) {
            __block_o6f9R6(4);
            return __expression_R$9k5T(23), __extro_HKJAu0(24, __intro_ftQ$EA(24, bcrypt).compareSync(password, this.password));
        }
    };
}
{
    __statement_T_Gj8z(25);
    UserSchema.statics = {
        fetch: function (cb) {
            __block_o6f9R6(5);
            return __expression_R$9k5T(26), __extro_HKJAu0(27, __intro_ftQ$EA(27, __extro_HKJAu0(28, __intro_ftQ$EA(28, __extro_HKJAu0(29, __intro_ftQ$EA(29, this).find({}))).sort('meta.updateAt'))).exec(cb));
        },
        findById: function (id, cb) {
            __block_o6f9R6(6);
            return __expression_R$9k5T(30), __extro_HKJAu0(31, __intro_ftQ$EA(31, __extro_HKJAu0(32, __intro_ftQ$EA(32, this).findOne({
                _id: id
            }))).exec(cb));
        }
    };
}
{
    __statement_T_Gj8z(33);
    module.exports = UserSchema;
}