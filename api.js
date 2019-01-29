const express = require('express'),
    mongodb = require('mongodb').MongoClient,
    url = 'mongodb://localhost:27017',
    multer = require('multer'),
    upload = multer({dest: 'uploads/'}),
    router = express.Router(),
    connectionString = "mongodb://localhost:27017";

router.get('/', (req, res)=> {
    res.send('api works');
});

router.get('/todos', (req, res)=> {
    mongodb.connect(url, (errDB, resDB)=> {
        if (errDB) throw errDB;
        let db = resDB.db('mydb');
        db.collection('todos').find({}).toArray((err, resault)=> {
            if (err) throw err;
            console.log(resault);
            res.json(resault); 
        })
    })
});

router.delete('/todo/:id', (req, res)=> {
    let id = req.params.id;
    mongodb.connect(url, (errDB, resDB)=> {
        if (errDB) throw errDB;
        let db = resDB.db('mydb');
        db.collection('todos').deleteOne({id: id}, (err, resault)=> {
            if (err) throw err;
            console.log('todo deleted');
            res.json(resault); 
        })
    })
});

router.post('/todos', (req, res)=> {
    let todo = req.body;
    mongodb.connect(url, (errDB, resDB)=> {
        if (errDB) throw errDB;
        let db = resDB.db('mydb');
        db.collection('todos').insertOne(todo, (err, resault)=> {
            if (err) throw err;
            console.log('todo added');
            res.json(todo); 
        })
    })
});

module.exports = router;