/**
 * Created by sunjunyi on 6/8/16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var TaskSchema = new Schema({
    co: String,
    company: String,
    segment: String,
    status:String,
    specialist: String,
    auditor: String,
    administrator: String,
    notes: String,
    ks:String,
    rr:String,
    srr:String,
    pa:String,
    dr:String,
    sa:String,
    pv:{
        type:Number,
        default:0
    },
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});


TaskSchema.pre('save',function(next){
    if(this.isNew){
        this.meta.createAt = this.meta.updateAt = Date.now();
    }
    else{
        this.meta.updateAt = Date.now();
    }
    next();
});


TaskSchema.statics = {
    fetch : function(cb){
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb);
    },
    findById : function(id,cb){
        return this
            .findOne({_id:id})
            .exec(cb);
    }
};

module.exports = TaskSchema;
