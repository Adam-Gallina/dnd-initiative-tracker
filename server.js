var initiative = require('./initiative')

var express = require('express')
var exphbs = require('express-handlebars')


var app = express()
var port = process.env.PORT || 2282

app.engine('handlebars', exphbs.engine({defaultLayout : 'main'}))
app.set('view engine', 'handlebars')

app.use(express.static('public'))
app.use(express.json())

app.get('/', function(req, res, next) {
    res.status(200).render('home')
})

app.get('/order', function(req, res, next) {
    res.status(200).render('initiativeTable', { 'initiativeOrder' : initiative.Order })
})

app.post('/initiative/add', function(req, res, next) {
    data = req.body
    initiative.AddCreature(data.charName, parseInt(data.initVal), parseInt(data.dexMod))
    initiative.OrderInitiative()

    console.log(initiative.Order)

    res.status(200).send()
})

app.post('/initiative/reset', function(req, res, next) {
    initiative.Reset()

    res.status(200).send()
})

app.get('*', function(req, res) {
    console.log("404 for " + req.url)
})

app.listen(port, function() {
    console.log('-- Server is listening on port ' + port + '!')
})