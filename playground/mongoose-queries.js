
const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require ('./../server/models/todo');
const {User} = require('./../server/models/user');

// var id = '5a822319c11fdb3d38e22681';

var Usrid = '5a7e7d3539930f0c28a6d3d1';

if(!ObjectID.isValid(Usrid)){
    console.log("User id is invalid")
}

User.findById(Usrid).then(function (user) {
    console.log(JSON.stringify(user,undefined,2));
}).catch(function (e) {
    //console.log(e);
});

// if(!ObjectID.isValid(id)){
//     console.log('ID is not valid')
// }
// // Todo.find({
// //     _id:id
// // }).then(function (todos) {
// //     console.log('Todos',todos);
// // });
// //
// // Todo.findOne({
// //     _id:id
// // }).then(function (todo) {
// //     console.log('Todo',todo);
// // });
//
// Todo.findById(id).then(function (todoid) {
//     console.log('Todo By ID',todoid);
// }).catch(function (e) {
//     console.log(e);
// });