require('dotenv').config()

const db = require('./api/database')
const images = require('./api/images')

const port = process.env.PORT || 2282

const express = require('express')
const exphbs = require('express-handlebars')

const { app, server, io } = require('./api/socket')
const { requireAuthentication } = require('./lib/auth')


app.engine('handlebars', exphbs.engine({defaultLayout : 'main'}))
app.set('view engine', 'handlebars')

app.use(express.static('public'))
if (process.env.CUSTOM_IMG)
    app.use(express.static(process.env.CUSTOM_IMG))

app.use(express.json())

app.use('/initiative', require('./api/initiative').router)
app.use('/database', db.router)
app.use('/images', images.router)
app.use('/messages', require('./api/messages').router)

app.get('/', images.GetImages, function(req, res, next) {
    res.status(200).render('home', req.handlebarsArgs)
})

app.get('/order', images.GetImages, function(req, res, next) {
    res.status(200).render('order', req.handlebarsArgs)
})

app.get('/settings', images.GetImages, function(req, res, next) {
    res.status(200).render('settings', req.handlebarsArgs)
})

app.post('/auth', requireAuthentication, function(req, res, next) {
    if (req.authorized)
        res.status(200).send()
    else
        res.status(400).send()
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

server.listen(port, function() {
    console.log('-- Server is listening on port ' + port + '!')
})