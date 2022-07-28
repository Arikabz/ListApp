const dotenv = require('dotenv').config()
const path = require('path')
const MongoClient = require('mongodb').MongoClient
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const connectionString = process.env.connectionString

MongoClient.connect(connectionString, {})
    .then(client => {
        console.log('Connected to Database')

        const db = client.db('listAppdb1')
        const listCollection = db.collection('list-userID')

        app.use(express.json())
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json())
        app.use(express.static(path.join(__dirname, "..", "build")))
        app.use(express.static('public'))
        app.use((req,res,next) => {
            res.sendFile(path.join(__dirname, "..", "build", "index.html"))
        })

        app.get('/', (req,res) => {
            db.collection('list-userID').find()
                .then(results => {
                    console.log(results)
                    res.json(results)
                })
        })
        app.post('/addItem', (req, res) => {
  1             //res.sendFile(__dirname + '/index.html');
            listCollection.insertOne({id: nextId(), item: req.body.item, userID: req.body.userID})
                .then(result => {
                    res.redirect('/')
                    console.log(result)
                })
  7                 .catch(error => console.error(error))
  8         });

        app.listen(process.env.PORT || PORT, () => {
            console.log('Listening on ${process.env.PORT}')
        })
    })
    .catch(error => console.error(error))
