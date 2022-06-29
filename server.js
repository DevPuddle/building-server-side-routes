//REQUIRE DEPENDENCIES
const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 8005
require('dotenv').config()

//DECLARED DB VARIABLES
let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'winners'

//CONNECT TO MONGO
MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

//SET MIDDLEWARE
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (request, response) => {
    db.collection('i').find().toArray()
        .then(data => {
            let nameList = data.map(item = item.speciesName)
            console.log(nameList)
            response.render('index.ejs', { info: nameList })
        })
        .catch(error => console.log(error))
})

// app.get('/',(request, response)=>{
//     db.collection('i').find().toArray()
//     .then(data => {
//         let nameList = data.map(a => a.speciesName)
//         console.log(nameList)
//         response.render('index.ejs', { info: nameList })
//     })
//     .catch(error => console.error(error))
// })

app.post('/api', (requset, response) => {
    console.log('Post Heard')
    db.collection('i').insertOne(
        request.body
    )
    .then(result => {
        console.log(result)
        response.redirect('/')
    })

})

app.put('/updateEntry', (requset, response) => {

})

app.delete('/deleteEntry', (requset, response) => {

})


// app.get('/', (request, response) => {
//     db.collection('i').find().toArray()
//     .then(data => {
//         response.render('index.ejs',  { info: i })
//     })
// })




//SET UP LOCALHOST ON PORT
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`)
})




