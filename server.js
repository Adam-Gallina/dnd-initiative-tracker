// Todo: Delete entries in initiative

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
    res.status(200).render('order')
})

app.get('/initiative/order', function(req, res, next) {
    initiative.Sort()

    res.status(200).send({ 'initiativeOrder': initiative.Get() })
})

app.post('/initiative/add', function(req, res, next) {
    data = req.body
    if (initiative.Add(data.charName, parseInt(data.initVal), parseInt(data.dexMod)))
        res.status(200).send()
    else
        res.status(500).send('Name already in initiative order')
})

app.post('/initiative/update', function(req, res, next) {
    data = req.body.initiativeOrder

    for (var i = 0; i < data.length; i++) {
        if (!initiative.Update(data[i].charName, parseInt(data[i].initVal), parseInt(data[i].dexMod)))
            console.log("Failed to update initiative data for " + data[i].charName)
    }
    
    res.status(200).send()
})

app.post('/initiative/reset', function(req, res, next) {
    initiative.Reset()

    console.log(initiative.Get())

    res.status(200).send()
})

app.get('*', function(req, res) {
    console.log("404 for " + req.url)
})

app.listen(port, function() {
    console.log('-- Server is listening on port ' + port + '!')
})