var Initiative;

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
    if (name in Initiative) {
        return false;
    }

    Initiative.push(InitEntry(name, iValue, iMod))

    return true;
}

/*
        if init[i]['val'] == 20:
            if init[j]['val'] == 20:
                if init[i]['mod'] > init[j]['mod']:
                    temp = init.pop(i)
                    init.insert(j, temp)
                    break
            else:
                temp = init.pop(i)
                init.insert(j, temp)
                break
        elif init[i]['tot'] > init[j]['tot']:
            temp = init.pop(i)
            init.insert(j, temp)
            break
        elif init[i]['tot'] == init[j]['tot'] and init[i]['mod'] > init[j]['mod']:
            temp = init.pop(i)
            init.insert(j, temp)
            break
*/

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

ResetInitiative()

module.exports = {
    'AddCreature':AddCreature,
    'OrderInitiative':OrderInitiative,
    'Order':Initiative
}