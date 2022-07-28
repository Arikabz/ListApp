const dotenv = require('dotenv').config()
const path = require('path')
const MongoClient = require('mongodb').MongoClient
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const connectionString = process.env.connectionString

        app.use(express.static(path.join(__dirname, "..", "build")))
        app.use(express.static('public'))


        app.listen(process.env.PORT || PORT, () => {
            console.log('Listening on ${process.env.PORT}')
        })
