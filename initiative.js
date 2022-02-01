var Initiative;

function GetInitiative() {
    return Initiative
}

function InitEntry(name, value, mod) {
    return {
        'name':name,
        'total': value + mod,
        'value': value,
        'mod': mod
    }
}

function ResetInitiative() {
    Initiative = []
}

function AddCreature(name, iValue, iMod) {
    if (Initiative.find(i => i.name.toLowerCase() == name.toLowerCase())) {
        return false;
    }

    Initiative.push(InitEntry(name, iValue, iMod))

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
    for (var i = 0; i < Initiative.length; i++) {
        if (Initiative[i].name == name) {
            Initiative[i].total = iValue + iMod
            Initiative[i].value = iValue
            Initiative[i].mod = iMod
            return true
        }
    }

    return false
}

ResetInitiative()

module.exports = {
    'Get':GetInitiative,
    'Reset':ResetInitiative,
    'Add':AddCreature,
    'Sort':OrderInitiative,
    'Update':UpdateInitiativeValue
}