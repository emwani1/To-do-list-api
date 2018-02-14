
require('/config/config.js');
const express = require('express');
const bodyparser = require('body-parser');
const _ = require('lodash');


var {ObjectId} = require('mongodb');
var {mongoose} = require('./db/mongoose.js');
var {Todo} = require ('./models/todo');
var {User} = require('./models/user');

const port  = process.env.PORT
var app = express();

app.use(bodyparser.json());

app.post('/todos',function (req,res) {
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then(function (success) {
       res.send(success);
    },function (error) {
       res.status(400).send(error);
    });
});

app.get('/todos',function (req,res) {
    Todo.find().then(function (todos) {
        res.send({todos});
    },function (e) {
       res.status(400).send(e);
    });
});


app.get('/todos/:id',function (req,res) {
    var id = req.params.id;
    if(!ObjectId.isValid(id)){
        return res.status(404).send();
    }else{
        Todo.findById(id).then(function (todo) {
            if(!todo){
                res.status(404).send();
            }else{
                res.send(todo);
            }
        }).catch(function (error) {
            res.status(400).send();
        })
    }
});

app.delete('/todos/:id',function (req,res) {
    // get the id
    var id = req.params.id;
    if(!ObjectId.isValid(id)){
        return res.status(404);
    }else{
        Todo.findByIdAndRemove(id).then(function (todo) {
            if(!todo){

                res.status(404).send("No item found")
            }else{
                res.send({todo: todo});
            }
        }).catch(function (e) {
            res.status(400);
        });
    }
});

app.patch('/todos/:id',function (req,res) {
    var id = req.params.id;
    var body = _.pick(req.body, ['text','completed']);
    if(!ObjectId.isValid(id)){
        return res.status(404).send();
    }
    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false;
        body.completedAt = false;
    }
    Todo.findByIdAndUpdate(id, {$set: body}, {$new: true}).then(function (todo) {
      if(!todo){
          return res.status(404).send();
      }
      res.send({todo:todo});
    }).catch(function (error) {
        res.status(404).send();
    })
})

app.listen(port,function () {
    console.log(`Started up at ${port}`);
});

module.exports = {app:app};


