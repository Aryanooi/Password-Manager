const bodyParser = require('body-parser');
const express = require('express')
require('dotenv').config()
const { MongoClient } = require('mongodb');
const port = 3000
var cors = require('cors')

const app = express()
app.use(bodyParser.json())

app.use(cors())
// console.log(process.env.MONGO_URI)


// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'passOp';
// get all the passwords
app.get('/', async (req, res) => {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    // console.log('Found documents =>', findResult);
    res.json(findResult )
})
// save a passwords
app.post('/', async (req, res) => {
    const password=req.body;
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const insertResult = await collection.insertOne(password);
    res.send({success:true, result:insertResult})
})
//delete a password
app.delete('/', async (req, res) => {
    const password=req.body;
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const insertResult = await collection.deleteOne(password);
    res.send({success:true, result:insertResult})
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})