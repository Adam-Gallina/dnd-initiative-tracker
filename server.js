var initiative = require('./api/initiative')
var db = require('./database')
try {
    var charImages = require('./images.json')
} catch (error) {
    console.log("Error loading images.json: " + error.message)
    var charImages = {}
}

function GetThumbnails(initiative) {
    for (i = 0; i < initiative.length; i++) {
        char = charImages.characters.find(element => element.name == initiative[i].name)
        if (char) {
            initiative[i].thumbnail = char.thumbnail
            if (char.only_image)
                initiative[i].only_image = true
        }
    }
    return initiative
}

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

app.get('/', function(req, res, next) {
    res.status(200).render('home', { 
        'charImages': charImages.characters,
        'mapImages': charImages.maps,
        'graveImages': charImages.gravestones
    })
})

app.get('/order', function(req, res, next) {
    res.status(200).render('order')
})

app.get('/:charName', function(req, res, next) {
    res.status(200).render('home', { 
        'charImages': charImages.characters,
        'mapImages': charImages.maps,
        'graveImages': charImages.gravestones,
        'charName': req.params.charName.replace(/\w\S*/g, function(txt) {return txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()}),
        'charMod': db.GetDexMod(req.params.charName)[0]
    })
})

app.get('*', function(req, res) {
    console.log("404 for " + req.url)

    res.status(404).send('Could not find requested resource')
})

app.listen(port, function() {
    console.log('-- Server is listening on port ' + port + '!')
})