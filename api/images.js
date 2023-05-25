try {
    var charImages = require('../images.json')
} catch (error) {
    console.log("Error loading images.json: " + error.message)
    var charImages = {}
}

var currBackground = {
    name: "Scroll",
    image: "./images/scroll_tile.jpg",
    color: "tan"
}
if (charImages.backgrounds) {
    for (i = 0; i < charImages.backgrounds.length; i++) {
        if (charImages.backgrounds[i].default) {
            currBackground = charImages.backgrounds[i]
            break
        }
    }
} else {
    console.log("[ERROR] No backgrounds found in images.json, using default")
}

function GetCharacter(charName) {
    return charImages.characters.find(e => e.name.toLowerCase() == charName.toLowerCase())
}


// HTML requests
const { Router } = require('express')
const router = Router()

function GetImages(req, res, next) {
    const bkgds = JSON.parse(JSON.stringify(charImages.backgrounds))
    for (i = 0; i < bkgds.length; i++)
        if (bkgds[i].name.toLowerCase() == currBackground.name.toLowerCase()) {
            bkgds[i].selected = true
            break
        }

    req.handlebarsArgs = {
        charImages: charImages.characters,
        mapImages: charImages.maps,
        graveImages: charImages.gravestones,
        backgroundName: currBackground.name,
        backgroundImg: currBackground.image,
        stretchImg: currBackground.stretchImg,
        blockCol: currBackground.color,
        backgrounds: bkgds
    }
    next()
}

router.get('/currBackground', function(req, res) {
    res.status(200).json({
        currBackground: currBackground.name
    })
})

router.post('/background/:bkgd', function (req, res) {
    bkgd = null
    for (i = 0; i < charImages.backgrounds.length; i++) {
        if (charImages.backgrounds[i].name.toLowerCase() == req.params.bkgd.toLowerCase()) {
            bkgd = charImages.backgrounds[i]
            break
        }
    }

    if (!bkgd) {
        res.status(404).json({ error: "No background loaded named "  + req.params.name })
    } else {
        currBackground = bkgd
        res.status(200).send()
    }
})


module.exports = {
    router: router,
    GetCharacter: GetCharacter,
    GetImages: GetImages
}
