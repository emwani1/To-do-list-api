const {MongoClient, ObjectID} = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/TodoApp',function (error,db) {
    if(error)
        return console.log("Unable to connect to database");
    console.log("Connected to database");
    db.collection('Users').findOneAndDelete({name:"Edwin"}).then(function (result) {
        console.log(result.value.name);
    })



    //db.close();
});
