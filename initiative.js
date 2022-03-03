var Initiative;

function GetInitiative(playersOnly) {
    if (playersOnly)
        return Initiative.filter(i => i.isPlayer)
    return Initiative
}

function InitEntry(name, value, mod, isPlayer) {
    return {
        'name':name,
        'total': value + mod,
        'value': value,
        'mod': mod,
        'isPlayer': isPlayer
    }
}

function GetInitEntry(name) {
    return Initiative.find(i => i.name.toLowerCase() == name.toLowerCase())
}

function ResetInitiative() {
    Initiative = []
}

function AddCreature(name, iValue, iMod, isPlayer) {
    if (GetInitEntry(name)) {
        return false;
    }

    Initiative.push(InitEntry(name, iValue, iMod, isPlayer))

    return true;
}

function OrderInitiative() {
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

function UpdateInitiativeValue(name, iValue, iMod) {
    entry = GetInitEntry(name)
    if (entry) {
        entry.total = iValue + iMod
        entry.value = iValue
        entry.mod = iMod
        return true
    }

    return false
}

function RemoveInitiativeValue(name) {
    if (GetInitEntry(name)) {
        Initiative = Initiative.filter(i => i.name.toLowerCase() != name.toLowerCase())
        return true
    }

    return false
}

ResetInitiative()

module.exports = {
    'Get':GetInitiative,
    'Reset':ResetInitiative,
    'Add':AddCreature,
    'Sort':OrderInitiative,
    'Update':UpdateInitiativeValue,
    'Remove':RemoveInitiativeValue
}