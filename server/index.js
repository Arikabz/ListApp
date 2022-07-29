const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')
require('dotenv').config()
const path = require('path')
const connectionString = process.env.connectionString
const PORT = 3002

let db,
    dbName = 'listAppdb',
    listCollection

MongoClient.connect(connectionString, { useUnifiedTopology: false })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
        listCollection = db.collection('listID-items')
    })

app.use(express('public'))
app.use(express.urlencoded({ extended: true}))
app.use(express.json())
app.use(express.static(path.join(__dirname, "..", "build")))
app.use((req,res,next)=>{
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
            for ( var i = 0; i < charactersLength; i++  ) {
                      result += characters.charAt(Math.floor(Math.random() * 
                       charactersLength));
            }
               return result;
        }
        function Item (itemNo, itemName, author){
            this.itemNo = itemNo
            this.itemName = itemName
            this.author = author
        }

app.get('/', (req,res) => {
    console.log('Got a client!')
})

app.get('/getList', (req,res) => {
    const id = req.body.listID
    const listItems = listCollection.find(list => list.listID == id).toArray()
})

app.get('api/:id', (req,res) => {
    const id = req.params.id
    listCollection.find(list => list.listID == id)
        .then(results => {
            console.log(results)
            res.json(results)
        })
})

app.get('/test', (res,req) => {
    console.log('test successful')
})

app.post('/newList', (req,res) => {
    const newList = new List()
    console.log(newList)
    listCollection.insertOne(newList)
        .then(result => {
            res.redirect('/')
            console.log(result)
        })
})

app.put('/addItem/:id', (req,res) => {
    const id = request.params.id
    const newItem = new Item(newNumber(), req.body.itemName, req.body.author)
    var arrlist = listCollection.find(list => list.listID == id).items
    arrlist.push(newItem)
    listCollection.findOneAndUpdate({listID: id},
        {
            $set: {
                items: arrlist
            }
        }, {
            upsert: false
        })
        .catch(error => console.log(error))
})

app.listen(PORT, ()=>{
    console.log(`Listening on ${PORT}`)
})
