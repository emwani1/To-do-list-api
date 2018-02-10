const {MongoClient, ObjectID} = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/TodoApp',function (error,db) {
    if (error)
        return console.log("Unable to connect to database");
    console.log("Connected to database");
    // db.collection('Todos').find({completed:true}).toArray().then(function (docs) {
    //     console.log('To Do\'s');
    //     console.log(JSON.stringify(docs,undefined,2));
    // },function (err) {
    //     console.log(err);
    // });

   db.collection('Users').find({name: "Bob"}).toArray().then(function (doc) {
       console.log('User');
       console.log(doc[0].name);
   },function (error) {
       console.log("Unable to to retreve");
   })

});