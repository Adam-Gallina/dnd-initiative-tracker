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

function GetCharacter(charName) {
    return charImages.characters.find(e => e.name.toLowerCase() == charName.toLowerCase())
}


// HTML requests
const { Router } = require('express')
const router = Router()

function GetImages(req, res, next) {
    req.handlebarsArgs = {
        charImages: charImages.characters,
        mapImages: charImages.maps,
        graveImages: charImages.gravestones,
        backgroundImg: currBackground.image,
        stretchImg: currBackground.stretchImg,
        blockCol: currBackground.color
    }
    next()
}


module.exports = {
    router: router,
    GetCharacter: GetCharacter,
    GetImages: GetImages
}
