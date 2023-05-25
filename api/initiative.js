const { GetCharacter } = require('./images')

var Initiative = []

// Helper Functions
function IsValidEntry(entry) {
    return entry && entry.name && entry.hasOwnProperty('total') && entry.hasOwnProperty('value') && entry.hasOwnProperty('mod') && entry.hasOwnProperty('isPlayer')
}

function GetInitEntry(name) {
    if (!name)
        return null
    
    return Initiative.find(i => i.name.toLowerCase() == name.toLowerCase())
}

// Initiative modification functions
function SortInitiative() {
    Initiative.sort(function(i, j) {
        if (j.value == 20 && i.value != 20)
            return 0

        if (i.value == 20) {
            return j.value == 20 ? j.mod - i.mod : -1
        } else if (i.total == j.total) {
            return j.mod - i.mod
        } else {
            return j.total - i.total
        }
    })
}

// Html requests
const { Router } = require('express')
const router = Router()

// Get players from initiative
// Query: ?enemies=<bool>
router.get('/', function(req, res) {
    const playersOnly = !(req.query.enemies.toLowerCase() == "true") || false
    
    SortInitiative()
    const initiative = playersOnly ? Initiative.filter(i => i.isPlayer) : Initiative

    res.status(200).json({
        initiativeOrder: initiative,
        playersOnly: playersOnly
    })
})

// Clear initiative table
router.post('/reset', function(req, res) {
    Initiative = []

    res.status(200).send()
})

// Add char to initiative
router.post('/', function(req, res) {
    const entry = IsValidEntry(req.body.entry) ? req.body.entry : null

    if (!entry) {
        res.status(400).json({
            error: "Request body is not a properly formatted Entry object"
        })
    } else if (GetInitEntry(entry.name)) {
        res.status(500).json({
            error: entry.name + " already exists in initiative order"
        })
    } else {
        image = GetCharacter(entry.name)
        if (image)
            entry.thumbnail = image.thumbnail

        Initiative.push(entry)
        res.status(200).send()
    }
})

// Update characters in initiative
router.patch('/', function(req, res) {
    const chars = req.body.entries
    const failed = []
    const invalid = []

    for (var i = 0; i < chars.length; i++) {
        if (!IsValidEntry(chars[i])) {
            invalid.push(chars[i])
            continue
        }

        entry = GetInitEntry(chars[i].name)
        if (entry) {
            entry.value = chars[i].value
            entry.mod = chars[i].mod
            entry.total = entry.value + entry.mod
        } else {
            failed.push(chars[i])
        }
    }

    res.status(200).json({
        failed: failed,
        invalid: invalid
    })
})

// Remove char in initiative
router.delete('/:charName', function(req, res) {
    const entry = GetInitEntry(req.params.charName)

    if (!entry) {
        res.status(404).json({
            error: req.params.charName + " does not exist in initiative"
        })
    } else {
        Initiative.splice(Initiative.indexOf(entry), 1)
        res.status(200).send()
    }
})


module.exports = {
    router: router
}