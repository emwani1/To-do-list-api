const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');
const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [
    {
        _id: new ObjectID(),
        text:"First test todo"

    },
    {
        _id: new ObjectID (),
        text:"Second test todo",
        completed:false,
        completedAt:333
    }
];

beforeEach(function (done) {
    Todo.remove({}).then(function () {
        return Todo.insertMany(todos);
    }).then(function () {
        done();
    })
});

describe('POST/todos',function () {
    it('should create a new todo',function (done) {
        var text = 'Test todo text';
        request(app)
            .post('/todos')
            .send({text:text})
            .expect(200)
            .expect(function (res) {
                expect(res.body.text).toBe(text);
            })
            .end((function (error,res) {
                if(error)
                    return done(error);
                Todo.find().then(function (todos) {
                    expect(todos.length).toBe(3);
                    expect(todos[2].text).toBe(text);
                    done()
                }).catch(function (e) {
                    done(e);
                });
            }));
         });
    it('should not create to do with invalid data',function (done) {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end(function (err,res) {
                if (err)
                    return done(err);
                Todo.find().then(function (todos) {
                    expect(todos.length).toBe(2);
                    done();
                }).catch(function (e) {
                    done(e);
                })
            })

    })
    });

describe('GET /todos',function () {
    it('should get all todos',function (done) {
        request(app)
            .get('/todos')
            .expect(200)
            .expect(function (res) {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    })
});


describe('GET /todos/id',function () {
    it('shoud return todo doc',function (done) {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect(function (res) {
               expect(res.body.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should return 404 if todo is not found', function (done) {
        var ned = new ObjectID ();
        request(app)
            .get(`/todos/${ned.toHexString()}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 for non object ids',function (done) {
        var _id = 123
        request(app)
            .get(`/todos/${_id}`)
            .expect(404)
            .end(done)
    })
});

describe('DELETE /todos/:id',function () {
    it('should remove todo',function (done) {
        var hexId = todos[0]._id.toHexString();
        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect(function (res) {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(function (error,result) {
                if(error)
                    return done(error);
                Todo.findById(hexId).then(function (todo) {
                    expect(todo).toNotExist();
                    done();
                }).catch(function (e) {
                    done(e);
                });

            });
    });
    it('should return 404 if todo not found',function (done) {
        var hexId = new ObjectID();
        request(app)
            .delete(`/todos/${hexId.toHexString()}`)
            .expect(404)
            .end(done);


    });




});


describe('PATCH /todos/:id',function () {
    it('should update the todo',function (done) {
        var id = todos[0]._id.toHexString();
        var text = 'Update is made';
        request(app)
            .patch(`/todos/${id}`)
            .send({text,completed:true})
            .send({text,completed:true})
            .expect(200)
            .expect(function (res) {
                expect(res.body.todo.text).toBe(text)
            })
            .end(done)


    });
    // it('should clear completedAt when todo is not completed',function (done) {
    //
    // })
})