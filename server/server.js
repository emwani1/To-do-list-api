const express = require('express');
const bodyparser = require('body-parser');



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

app.listen(3000,function () {
    console.log('Started on port 3000');
});

