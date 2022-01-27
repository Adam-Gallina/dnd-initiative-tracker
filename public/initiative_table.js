const TableReloadDelay = 3000
var refreshingTable = true;

var initiativeTable = document.getElementById("initTable")

function ReloadTable() {
    var req = new XMLHttpRequest()
    req.open('GET', '/initiative/order')

    req.addEventListener('load', function(event) {
        if (event.target.status == 404) {
            console.log("404: Couldn't retrieve initiative data")
            return
        }

        var data = JSON.parse(event.target.responseText)
        initiativeTable.innerHTML = Handlebars.templates.initiativeTable(data)
    })

    req.send()
}

document.getElementById('edit').addEventListener('click', function(event) {
    var valueBtns = document.querySelectorAll('.initiativeEntry')
    var editBtn = event.target

    var data = { 'initiativeOrder' : [] }

    for (var i = 0; i < valueBtns.length; i++) {
        val = valueBtns[i].querySelector('#value')
        mod = valueBtns[i].querySelector('#mod')
        if (refreshingTable) {
            val.removeAttribute('readonly')
            mod.removeAttribute('readonly')
        }
        else {
            val.setAttribute('readonly', 'readonly')
            mod.setAttribute('readonly', 'readonly')

            data.initiativeOrder.push({
                'charName': valueBtns[i].getAttribute('name'),
                'initVal': val.value,
                'dexMod': mod.value
            })
        }
    }

    if (!refreshingTable) {
        var req = new XMLHttpRequest()
        req.open('POST', '/initiative/update')
        req.setRequestHeader('Content-Type', 'application/json')

        req.addEventListener('load', function(event) {    
            if (event.target.status == 200) {
                refreshingTable = !refreshingTable
                editBtn.value = refreshingTable ? "Edit" : "Save"
            } else {
                alert("Error " + event.target.status + " when saving changes")
            }
        })

        req.send(JSON.stringify(data))
    }
    else {
        refreshingTable = !refreshingTable
        editBtn.value = refreshingTable ? "Edit" : "Save"
    }
})

document.getElementById('reset').addEventListener('click', function() {
    var req = new XMLHttpRequest()
    req.open('POST', '/initiative/reset')

    req.addEventListener('load', function(event) {
        if (event.target.status == 200) {
            ReloadTable()
        } else {
            alert("Error " + event.target.status + " when trying to reset table")
        }
    })

    req.send()
})

document.getElementById('submit').addEventListener('click', function(event) {
    charName = document.getElementById("npcName")
    count = document.getElementById("totalNpc")
    initVal = Math.floor(Math.random() * 20) + 1
    dexMod = document.getElementById("dexMod")

    if (!charName.value || !count.value || !dexMod.value)
        alert("Please fill in all fields")
    else {
        
        npcTotal = parseInt(count.value)
        for (var i = 0; i < npcTotal; i++) {
            var req = new XMLHttpRequest()
            req.open('POST', '/initiative/add')
            req.setRequestHeader('Content-Type', 'application/json')
            
            req.addEventListener('load', function(event) {
                if (event.target.status == 200) {
                    ReloadTable()
                } else {
                    alert("Error " + event.target.status + " when trying to add new NPCs")
                }
            })

            req.send(JSON.stringify({
                'charName': charName.value + (npcTotal > 1 ? ' ' + i : ''),
                'initVal': initVal,
                'dexMod': dexMod.value
            }))
        }

        charName.value = ''
        count.value = '1'
        dexMod.value = ''
    }
})

ReloadTable()

setInterval(function() {
    if (refreshingTable)
        ReloadTable()
}, TableReloadDelay)