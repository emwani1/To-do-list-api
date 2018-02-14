const express = require('express');
const bodyparser = require('body-parser');


var {ObjectId} = require('mongodb');
var {mongoose} = require('./db/mongoose.js');
var {Todo} = require ('./models/todo');
var {User} = require('./models/user');


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
})

app.listen(3000,function () {
    console.log('Started on port 3000');
});

module.exports = {app:app};


