const TableReloadDelay = 3000
var refreshingTable = true;

var initiativeTable = document.getElementById("charInit")

var currBackground = ""
var currData = []
var onTableReload = null
var modPerms = false


function ReadCharEntry(clearName, clearInit, clearDex, isPlayer) {
    var charName = document.getElementById("charName")
    var initVal = document.getElementById("initVal")
    var dexMod = document.getElementById("dexMod")

    if (!charName.value || !initVal.value || !dexMod.value) {
        alert("Please fill in all fields")
        return null
    }

    entry = InitOrder.Chars.GenEntry(
        charName.value,
        parseInt(initVal.value),
        parseInt(dexMod.value),
        isPlayer
    )

    if (clearName)
        charName.value = ''
    if (clearInit)
        initVal.value = ''
    if (clearDex)
        dexMod.value = ''

    return entry
}

function SubmitCharEntry(entry) {
    InitOrder.Chars.Add(
        key,
        entry,
        function(event){
        if (event.target.status == 200) {
            CheckForTableUpdate()
        }
        else
            alert('ERROR '+ event.target.status +': ' + event.target.response)
    })
}


function ReloadTable(data) {
    data.modPerms = modPerms
    initiativeTable.innerHTML = Handlebars.templates.initiativeTable(data)
    currData = data.initiativeOrder

    if (onTableReload)
        onTableReload(data)
}

function CheckForTableUpdate() {
    InitOrder.Table.Get(true, function(event) {
        if (event.target.status == 404) {
            console.log("404: Couldn't retrieve initiative data")
            return
        }

        data = JSON.parse(event.target.responseText)
        order = data.initiativeOrder
        if (order.length != currData.length)
            ReloadTable(data)
        else {
            for (var i = 0; i < order.length; i++) {
                if (JSON.stringify(order[i]) != JSON.stringify(currData[i])) {
                    ReloadTable(data)
                    break
                }
            }
        }
    })
}


const socket = io()

socket.on(SocketCodes.bkgdUpdate, function(/*name*/) {
    //if (currBackground === "")
    //    currBackground = bkgd
    //else if (bkgd != currBackground)
        location.reload()
})

socket.on(SocketCodes.initUpdate, function() {
    if (refreshingTable)
        CheckForTableUpdate()
})

CheckForTableUpdate()