const dotenv = require('dotenv').config()
const path = require('path')
const MongoClient = require('mongodb').MongoClient
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const connectionString = process.env.connectionString

MongoClient.connect(connectionString, {})
    .then(client => {
        console.log('Connected to listAppdb1')

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

        function List (){
            this.listID = makeid()
            this.items = []
        }
        function makeid() {
                var result           = '';
                var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
                var charactersLength = 6;
            for ( var i = 0; i < length; i++  ) {
                      result += characters.charAt(Math.floor(Math.random() * 
                       charactersLength));
                   
            }
               return result;
            
        }
        function Item (no,name,auth){
            this.itemNo = no
            this.itemName = name
            this.author = auth
        }
        app.get('/', (req,res) => {
            listCollection.find()
                .then(results => {
                    console.log(results)
                    res.json(results)
                })
        })
        app.get('/:id', (req,res) => {
            const id = request.params.id
            listCollection.find(list => list.listID == id)
                .then(results => {
                    console.log(results)
                    res.json(results)
                })
        }) 
        app.post('/newList', (req, res) => {
            console.log(req)
               //res.sendFile(__dirname + '/index.html');
            const newList = new List();
            console.log(newList)
            listCollection.insertOne(newList)
                .then(result => {
                    res.redirect('/')
                    console.log(result)
                })
        })

        app.get('/test', (res,req)=>{
            console.log('test success')
        })

            app.put('/addItem/:id', (req, res) => {
               //res.sendFile(__dirname + '/index.html');
            const id = request.params.id 
            const newItem = new Item(no, req.body.itemName, req.body.author)
            var arrlist = listCollection.find(list => list.listID == id).items
                arrlist.push(newItem)
                listCollection.findOneAndUpdate({listID: id }, {
                    $set: {
                        items: arrlist
                    }
                }, {upsert: false})
                .then(result => {
                    res.redirect('/')
                    console.log(result)
                })
                   .catch(error => console.error(error))
           });

        app.listen(process.env.PORT || PORT, () => {
            console.log('Listening on ${process.env.PORT}')
        })
    })
    .catch(error => console.error(error))
