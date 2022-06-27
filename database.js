fs = require('fs')
const FNAME = 'character_data.json'

const dataTemplate = { 
    'dexMod':0
}

function LoadData() {
    // Generate data file if it doesnt exist
    return require('./' + FNAME)
}

function SaveData(data) {
    fs.writeFile(FNAME, JSON.stringify(data), function(err) {
        return err ? false : true
    })
}

function GetDexMod(char) {
    data = LoadData()

    char = char.toLowerCase()

    if (data.hasOwnProperty(char))
        return [data[char].dexMod, true]

    return [0, false]
}

function SetDexMod(char, newVal) {
    data = LoadData()

    char = char.toLowerCase()
    
    if (!data.hasOwnProperty(char))
        data[char] = structuredClone(dataTemplate)

    data[char].dexMod = newVal

    SaveData(data)
}

module.exports = {
    'GetDexMod': GetDexMod,
    'SetDexMod': SetDexMod
}
