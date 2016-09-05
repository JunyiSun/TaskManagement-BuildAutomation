
// Instrumentation Header
{
    var fs = require('fs');
    var __statement_iRLR2g, __expression_ixVv2r, __block_Z5QCL5;
    var store = require('/Users/sunjunyi/Desktop/gitrepo/emt-internal-apps-poc/node_modules/gulp-coverage/contrib/coverage_store.js');
    
    __statement_iRLR2g = function(i) {
        var fd = store.register('/Users/sunjunyi/Desktop/gitrepo/emt-internal-apps-poc/src/server/models/user.js');
        fs.writeSync(fd, '{"statement": {"node": ' + i + '}},\n');
    }; 
    
    __expression_ixVv2r = function(i) {
        var fd = store.register('/Users/sunjunyi/Desktop/gitrepo/emt-internal-apps-poc/src/server/models/user.js');
        fs.writeSync(fd, '{"expression": {"node": ' + i + '}},\n');
    }; 
    
    __block_Z5QCL5 = function(i) {
        var fd = store.register('/Users/sunjunyi/Desktop/gitrepo/emt-internal-apps-poc/src/server/models/user.js');
        fs.writeSync(fd, '{"block": ' + i + '},\n');
    }; 
    __intro_Q7RW7V = function(id, obj) {
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
    __extro_g0TL8U = function(id, obj) {
        var fd = store.register('/Users/sunjunyi/Desktop/gitrepo/emt-internal-apps-poc/src/server/models/user.js');
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
    __statement_iRLR2g(0);
    var mongoose = (__expression_ixVv2r(1), require('mongoose'));
}
{
    __statement_iRLR2g(2);
    var UserSchema = (__expression_ixVv2r(3), require('../schemas/user'));
}
{
    __statement_iRLR2g(4);
    var User = __extro_g0TL8U(5, __intro_Q7RW7V(5, mongoose).model('User', UserSchema));
}
{
    __statement_iRLR2g(6);
    module.exports = User;
}