const { Router } = require('express')
const router = Router()


var Initiative = []

// Helper Functions
function InitEntry(name, value, mod, isPlayer) {
    return {
        name: name,
        total: value + mod,
        value: value,
        mod: mod,
        isPlayer: isPlayer
    }
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


// Get players from initiative
// /initiative?enemies=true
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
    const char = req.body
    const entry = InitEntry(
        char.charName,
        char.initVal,
        char.dexMod,
        char.isPlayer
    )

    if (GetInitEntry(entry.name)) {
        res.status(500).json({
            error: entry.name + " already exists in initiative order"
        })
    } else {
        Initiative.push(entry)
        res.status(200).send()
    }
})

// Update characters in initiative
router.patch('/', function(req, res) {
    const chars = req.body
    const failed = []
    
    for (var i = 0; i < chars.length; i++) {
        entry = GetInitEntry(chars[i].charName)
        if (entry) {
            entry.value = chars[i].initVal
            entry.mod = chars[i].dexMod
            entry.total = entry.value + entry.mod
        } else {
            failed.push(chars[i].charName)
        }
    }

    res.status(200).json({
        failed: failed
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


exports.router = router