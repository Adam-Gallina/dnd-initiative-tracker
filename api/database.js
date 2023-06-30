fs = require('fs')
const FNAME = 'character_data.json'


// Data IO
function LoadData() {
    try {
        return require('../' + FNAME)
    } catch {
        fs.writeFileSync(FNAME, '{}', function(err) {
            console.log('[ERROR] Could not load ' + FNAME)
            return {}
        })
    }

    return LoadData()
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


// HTML requests
const { Router } = require('express')
const { requireAuthentication } = require('../lib/auth')
const router = Router()

const dataTemplate = { 
    dexMod: 0
}

router.post('/:charName', requireAuthentication, function(req, res, next) {
    if (!req.authorized)
        next()
    else {
        if (!req.body.dexMod) {
            res.status(400).json({
                error: "Request body needs a dexMod field"
            })
        } else {
            const data = LoadData()

            var char = req.params.charName.toLowerCase()
            
            if (!data.hasOwnProperty(char))
                data[char] = structuredClone(dataTemplate)

            data[char].dexMod = req.body.dexMod

            SaveData(data)

            res.status(200).send()
        }
    }
})

exports.router = router


module.exports = {
    router: router,
    GetDexMod: GetDexMod
}
