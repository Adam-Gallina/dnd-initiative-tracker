fs = require('fs')
const FNAME = 'character_data.json'

const dataTemplate = { 
    'dexMod':0
}

// Generate data file if it doesnt exist
data = require('./' + FNAME)

function SaveData() {
    fs.writeFile(FNAME, JSON.stringify(data), function(err) {
        return err ? false : true
    })
}

function GetDexMod(char) {
    char = char.toLowerCase()

    if (data.hasOwnProperty(char))
        return data[char].dexMod

    return 0, false
}

function SetDexMod(char, newVal) {
    char = char.toLowerCase()
    
    if (!data.hasOwnProperty(char))
        data[char] = structuredClone(dataTemplate)

    data[char].dexMod = newVal

    SaveData()
}

module.exports = {
    'GetDexMod': GetDexMod,
    'SetDexMod': SetDexMod
}
