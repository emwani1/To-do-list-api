// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/TodoApp',function (error,db) {
    if(error)
        return console.log("Unable to connect to database");
    console.log("Connected to database");


    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // },function (error,result) {
    //     if(error)
    //         return console.log('Unable to insert to do',error);
    //     console.log(JSON.stringify(result.ops,undefined,2));
    // });

    // db.collection('Users').insertOne({
    //     name: 'Edwin',
    //     age: 22,
    //     location: 'Baltimore'
    // },function (error,result) {
    //     if(error)
    //         return console.log('Unable to addd record in collection : ',e);
    //     console.log(JSON.stringify(result.ops[0]._id.getTimestamp(),undefined,2));
    // });

    db.close();
});
