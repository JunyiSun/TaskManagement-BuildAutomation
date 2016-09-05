
// Instrumentation Header
{
    var fs = require('fs');
    var __statement_KEeEwN, __expression_RCw9x6, __block_Nn5A84;
    var store = require('/Users/sunjunyi/Desktop/gitrepo/emt-internal-apps-poc/node_modules/gulp-coverage/contrib/coverage_store.js');
    
    __statement_KEeEwN = function(i) {
        var fd = store.register('/Users/sunjunyi/Desktop/gitrepo/emt-internal-apps-poc/src/server/models/task.js');
        fs.writeSync(fd, '{"statement": {"node": ' + i + '}},\n');
    }; 
    
    __expression_RCw9x6 = function(i) {
        var fd = store.register('/Users/sunjunyi/Desktop/gitrepo/emt-internal-apps-poc/src/server/models/task.js');
        fs.writeSync(fd, '{"expression": {"node": ' + i + '}},\n');
    }; 
    
    __block_Nn5A84 = function(i) {
        var fd = store.register('/Users/sunjunyi/Desktop/gitrepo/emt-internal-apps-poc/src/server/models/task.js');
        fs.writeSync(fd, '{"block": ' + i + '},\n');
    }; 
    __intro_WoupHZ = function(id, obj) {
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
    __extro_LXcMFe = function(id, obj) {
        var fd = store.register('/Users/sunjunyi/Desktop/gitrepo/emt-internal-apps-poc/src/server/models/task.js');
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
    __statement_KEeEwN(0);
    var mongoose = (__expression_RCw9x6(1), require('mongoose'));
}
{
    __statement_KEeEwN(2);
    var TaskSchema = (__expression_RCw9x6(3), require('../schemas/task'));
}
{
    __statement_KEeEwN(4);
    var Task = __extro_LXcMFe(5, __intro_WoupHZ(5, mongoose).model('Task', TaskSchema));
}
{
    __statement_KEeEwN(6);
    module.exports = Task;
}