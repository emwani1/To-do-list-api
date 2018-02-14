
const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require ('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then(function () {
//
// });

Todo.findByIdAndRemove('5a8390e187f6a306994e309b').then(function (todo) {
    console.log(todo);
});