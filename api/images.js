const { io, codes } = require('./socket.js')

const defaultBackground = {
    name: "Scroll",
    image: "./images/scroll_tile.jpg",
    color: "tan",
    darkColor: "rgb(204, 164, 112)"
}

var charImages = {}
var currBackground = defaultBackground
function LoadImages() {
    try {
        charImages = require(process.env.IMG_FILE || '../images.json')
    } catch (error) {
        charImages = {}
        return { ec: 1, msg: error.message }
    }

    var currBackground = defaultBackground
    if (charImages.backgrounds) {
        for (i = 0; i < charImages.backgrounds.length; i++) {
            if (charImages.backgrounds[i].default) {
                currBackground = charImages.backgrounds[i]
                break
            }
        }
    } else {
        return { ec: 1, msg: "No backgrounds found in images.json, only loading default" }
    }

    return { ec: 0 }
}

err = LoadImages()
if (err.ec == 1)
    console.log(err.msg)



function GetCharacter(charName) {
    return charImages.characters.find(e => e.name.toLowerCase() == charName.toLowerCase())
}


// HTML requests
const { Router, static } = require('express')
const { requireAuthentication } = require('../lib/auth')
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
        darkCol: currBackground.darkColor,
        backgrounds: bkgds
    }
    next()
}

router.post('/background/:bkgd', requireAuthentication, function (req, res, next) {
    if (!req.authorized)
        next()
    else {
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
            if (currBackground != bkgd) {
                currBackground = bkgd
                io.emit(codes.bkgdUpdate, currBackground)
            }
            res.status(200).send()
        }
    }
})

router.post('/reloadImages', requireAuthentication, function(req, res, next) {
    if (!req.authorized)
        next()
    else {
        err = LoadImages()
        if (err.ec == 1)
            res.status(400).json({ error: err.msg })
        else
            res.status(200).send()
    }
})


module.exports = {
    router: router,
    GetCharacter: GetCharacter,
    GetImages: GetImages
}
