const TableReloadDelay = 1000

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
        console.log(data)
        console.log(Handlebars.templates.initiativeTable(data))
        initiativeTable.innerHTML = Handlebars.templates.initiativeTable(data)
    })

    req.send()
}

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

setInterval(ReloadTable, TableReloadDelay)