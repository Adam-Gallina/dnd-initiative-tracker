try {
    var charImages = require('../images.json')
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

function GetCharacter(charName) {
    return charImages.characters.find(e => e.name.toLowerCase() == charName.toLowerCase())
}

module.exports = {
    characters: charImages.characters,
    maps: charImages.maps,
    gravestones: charImages.gravestones,
    GetCharacter: GetCharacter
}
