var initiative = require('./initiative')
var db = require('./database')

var path = require('path')
var fs = require('fs')

var express = require('express')
var exphbs = require('express-handlebars')


function GetImages(files) {
    if (!files)
        return []
        
    images = []
    for (i = 0; i < files.length; i++)
        if (files[i].charAt(0) != '.')
            images.push({'name': path.parse(files[i]).name, 'file': files[i] })
    return images
}

var app = express()
var port = process.env.PORT || 2282

app.engine('handlebars', exphbs.engine({defaultLayout : 'main'}))
app.set('view engine', 'handlebars')

app.use(express.static('public'))
app.use(express.json())

app.get('/', function(req, res, next) {
    fs.readdir('./public/images/characters', function(err, charFiles) {
    fs.readdir('./public/images/maps', function(err, mapFiles) {
    fs.readdir('./public/images/gravestones', function(err, graveFiles) {
        res.status(200).render('home', { 
            'charImages': GetImages(charFiles),
            'mapImages': GetImages(mapFiles),
            'graveImages': GetImages(graveFiles)
        })
    })
    })
    })    
})

app.get('/order', function(req, res, next) {
    res.status(200).render('order')
})

app.get('/settings', function(req, res, next) {
    res.status(200).render('settings')
})

app.get('/:charName', function(req, res, next) {
    fs.readdir('./public/images/characters', function(err, charFiles) {
    fs.readdir('./public/images/maps', function(err, mapFiles) {
    fs.readdir('./public/images/gravestones', function(err, graveFiles) {
        res.status(200).render('home', { 
            'charImages': GetImages(charFiles),
            'mapImages': GetImages(mapFiles),
            'graveImages': GetImages(graveFiles),
            'charName': req.params.charName.replace(/\w\S*/g, function(txt) {return txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()}),
            'charMod': db.GetDexMod(req.params.charName)[0]
        })
    })
    })
    })
})

/*app.get('/chant', function(req, res, next) {
	res.status(200).send('<h1>Ubi est Fidget. Afferte eum ad nos. Volumus animam suam. </h1>')
})*/

app.get('/initiative/table/order', function(req, res, next) {
    initiative.Sort()

    res.status(200).send({ 
        'initiativeOrder': initiative.Get(false),
        'playersOnly': false
    })
})

app.get('/initiative/table/playerOrder', function(req, res, next) {
    initiative.Sort()
    
    res.status(200).send({ 
        'initiativeOrder': initiative.Get(true),
        'playersOnly': true
    })
})

app.post('/initiative/char/add', function(req, res, next) {
    data = req.body
    
    if (initiative.Add(data.charName, parseInt(data.initVal), parseInt(data.dexMod), data.isPlayer))
        res.status(200).send()
    else
        res.status(500).send('Name already in initiative order')
})

app.post('/initiative/table/update', function(req, res, next) {
    data = req.body.initiativeOrder

    for (var i = 0; i < data.length; i++) {
        if (!initiative.Update(data[i].charName, parseInt(data[i].initVal), parseInt(data[i].dexMod)))
            console.log("Failed to update initiative data for " + data[i].charName)
    }
    
    res.status(200).send()
})

app.post('/initiative/char/remove', function(req, res, next) {
    data = req.body

    if (initiative.Remove(data.charName))
        res.status(200).send()
    else
        res.status(500).send(data.charName + ' was not able to be removed')
})

app.post('/initiative/table/reset', function(req, res, next) {
    initiative.Reset()

    res.status(200).send()
})

app.post('/database/dexMod', function(req, res, next) {
    data = req.body

    db.SetDexMod(data.charName, data.dexMod)

    res.status(200).send()
})

app.get('*', function(req, res) {
    console.log("404 for " + req.url)
})

app.listen(port, function() {
    console.log('-- Server is listening on port ' + port + '!')
})