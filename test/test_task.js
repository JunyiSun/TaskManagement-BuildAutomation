/**
 * Created by sunjunyi on 6/17/16.
 */
var should = require('should');
//var app = require('../server');
var mongoose = require('mongoose');
var Task = require('../src/server/models/task');
var Task = mongoose.model('Task');

var task;

describe('<Unit Test', function() {
    describe('Array', function() {
        it('should start empty', function() {
            var arr = [];

            arr.length.should.equal(0);
        });
        it('should start empty (failing test for demo purpose)', function() {
            var arr = [5, 7];

            arr.length.should.equal(2);
        });
    });

    describe('Model Task:', function() {
        before(function(done) {
            task = {
                co: '1',
                company: 'ADP'
            };

            done();
        });

    });
    describe('Task save', function() {
        it('should save without problems', function(done) {
            var _task = new Task(task);

            _task.save(function(err) {
                should.not.exist(err);
                _task.remove(function(err){
                    should.not.exist(err);
                });
            });
            done();
        });
        it('should have default page viewed 0', function(done) {
            var _task = new Task(task);

            _task.save(function(err) {
                _task.rating.should.equal(100);
                _task.remove(function(err) {
                });
            });
            done();
        });
        after(function(done){
            //clear user info
            done();
        });
    });
});
