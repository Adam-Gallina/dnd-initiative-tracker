var initiative = require('./api/initiative')
var db = require('./api/database')
var images = require('./api/images')

var express = require('express')
var exphbs = require('express-handlebars')


var app = express()
var port = process.env.PORT || 2282

app.engine('handlebars', exphbs.engine({defaultLayout : 'main'}))
app.set('view engine', 'handlebars')

app.use(express.static('public'))
app.use(express.json())

app.use('/initiative', initiative.router)
app.use('/database', db.router)
app.use('/images', images.router)

app.get('/', images.GetImages, function(req, res, next) {
    res.status(200).render('home', req.handlebarsArgs)
})

app.get('/order', images.GetImages, function(req, res, next) {
    res.status(200).render('order', req.handlebarsArgs)
})

app.get('/:charName', images.GetImages, function(req, res, next) {
    var args = req.handlebarsArgs
    args.charName = req.params.charName.replace(/\w\S*/g, function(txt) {return txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()})
    args.charMod = db.GetDexMod(req.params.charName)[0]

    res.status(200).render('home', args)
})

app.get('*', function(req, res) {
    console.log("404 for " + req.url)

    res.status(404).send('Error 404: Could not find requested resource')
})

app.listen(port, function() {
    console.log('-- Server is listening on port ' + port + '!')
})