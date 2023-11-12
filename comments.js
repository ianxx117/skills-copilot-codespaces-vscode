//create web server
//create express object
//create app object
const express = require('express')
const app = express()
//create port
const port = 3000
//create bodyParser object
const bodyParser = require('body-parser')
//create mysql object
const mysql = require('mysql')
//create connection object
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'express'
})
//connect to database
connection.connect()
//create static file path
app.use(express.static('public'))
//create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })
//create router
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html')
})
//get comment
app.get('/getComment', function(req, res) {
    connection.query('select * from comment', function(err, result) {
        if (err) throw err
        res.send(result)
    })
})
//add comment
app.post('/addComment', urlencodedParser, function(req, res) {
    connection.query("insert into comment (name, comment) values ('" + req.body.name + "', '" + req.body.comment + "')", function(err, result) {
        if (err) throw err
        res.send('success')
    })
})
//delete comment
app.post('/deleteComment', urlencodedParser, function(req, res) {
    connection.query("delete from comment where id = '" + req.body.id + "'", function(err, result) {
        if (err) throw err
        res.send('success')
    })
})
//update comment
app.post('/updateComment', urlencodedParser, function(req, res) {
    connection.query("update comment set name = '" + req.body.name + "', comment = '" + req.body.comment + "' where id = '" + req.body.id + "'", function(err, result) {
        if (err) throw err
        res.send('success')
    })
})
//listen port
app.listen(port, () => console.log(`Examp app listening on port ${port}!`))