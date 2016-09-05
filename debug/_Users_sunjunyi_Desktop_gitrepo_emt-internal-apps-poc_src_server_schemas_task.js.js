
// Instrumentation Header
{
    var fs = require('fs');
    var __statement_zBDKHX, __expression_H5LNl1, __block_W82DH1;
    var store = require('/Users/sunjunyi/Desktop/gitrepo/emt-internal-apps-poc/node_modules/gulp-coverage/contrib/coverage_store.js');
    
    __statement_zBDKHX = function(i) {
        var fd = store.register('/Users/sunjunyi/Desktop/gitrepo/emt-internal-apps-poc/src/server/schemas/task.js');
        fs.writeSync(fd, '{"statement": {"node": ' + i + '}},\n');
    }; 
    
    __expression_H5LNl1 = function(i) {
        var fd = store.register('/Users/sunjunyi/Desktop/gitrepo/emt-internal-apps-poc/src/server/schemas/task.js');
        fs.writeSync(fd, '{"expression": {"node": ' + i + '}},\n');
    }; 
    
    __block_W82DH1 = function(i) {
        var fd = store.register('/Users/sunjunyi/Desktop/gitrepo/emt-internal-apps-poc/src/server/schemas/task.js');
        fs.writeSync(fd, '{"block": ' + i + '},\n');
    }; 
    __intro_xewxCW = function(id, obj) {
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
    __extro_DhDsk6 = function(id, obj) {
        var fd = store.register('/Users/sunjunyi/Desktop/gitrepo/emt-internal-apps-poc/src/server/schemas/task.js');
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
    __statement_zBDKHX(0);
    var mongoose = (__expression_H5LNl1(1), require('mongoose'));
}
{
    __statement_zBDKHX(2);
    var Schema = mongoose.Schema;
}
{
    __statement_zBDKHX(3);
    var ObjectId = Schema.Types.ObjectId;
}
{
    __statement_zBDKHX(4);
    var TaskSchema = new Schema({
            co: String,
            company: String,
            segment: String,
            status: String,
            specialist: String,
            auditor: String,
            administrator: String,
            notes: String,
            ks: String,
            rr: String,
            srr: String,
            pa: String,
            dr: String,
            sa: String,
            pv: {
                type: Number,
                default: 0
            },
            meta: {
                createAt: {
                    type: Date,
                    default: __extro_DhDsk6(5, __intro_xewxCW(5, Date).now())
                },
                updateAt: {
                    type: Date,
                    default: __extro_DhDsk6(6, __intro_xewxCW(6, Date).now())
                }
            }
        });
}
{
    __statement_zBDKHX(7);
    __extro_DhDsk6(8, __intro_xewxCW(8, TaskSchema).pre('save', function (next) {
        __block_W82DH1(0);
        if (this.isNew) {
            __block_W82DH1(1);
            {
                __statement_zBDKHX(9);
                this.meta.createAt = this.meta.updateAt = __extro_DhDsk6(10, __intro_xewxCW(10, Date).now());
            }
        } else {
            __block_W82DH1(2);
            {
                __statement_zBDKHX(11);
                this.meta.updateAt = __extro_DhDsk6(12, __intro_xewxCW(12, Date).now());
            }
        }
        {
            __statement_zBDKHX(13);
            __expression_H5LNl1(14), next();
        }
    }));
}
{
    __statement_zBDKHX(15);
    TaskSchema.statics = {
        fetch: function (cb) {
            __block_W82DH1(3);
            return __expression_H5LNl1(16), __extro_DhDsk6(17, __intro_xewxCW(17, __extro_DhDsk6(18, __intro_xewxCW(18, __extro_DhDsk6(19, __intro_xewxCW(19, this).find({}))).sort('meta.updateAt'))).exec(cb));
        },
        findById: function (id, cb) {
            __block_W82DH1(4);
            return __expression_H5LNl1(20), __extro_DhDsk6(21, __intro_xewxCW(21, __extro_DhDsk6(22, __intro_xewxCW(22, this).findOne({
                _id: id
            }))).exec(cb));
        }
    };
}
{
    __statement_zBDKHX(23);
    module.exports = TaskSchema;
}