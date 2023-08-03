const TableReloadDelay = 3000
var refreshingTable = true;

var initiativeTable = document.getElementById("charInit")
var currCharacter = -1

var currBackground = ""
var currData = { initiativeOrder: [] }
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
    currData = data
    if (currData.initiativeOrder.length == 0)
        fillerEntryIdx = -1

    if (onTableReload)
        onTableReload(data)
}

function CheckForTableUpdate() {
    InitOrder.Table.Get(modPerms, function(event) {
        if (event.target.status == 404) {
            console.log("404: Couldn't retrieve initiative data")
            return
        }

        data = JSON.parse(event.target.responseText)
        order = data.initiativeOrder
        if (order.length != currData.initiativeOrder.length)
            ReloadTable(data)
        else {
            for (var i = 0; i < order.length; i++) {
                if (JSON.stringify(order[i]) != JSON.stringify(currData.initiativeOrder[i])) {
                    ReloadTable(data)
                    break
                }
            }
        }
    })
}

const fillerEntry = InitEntry('filler_character', 0, 0, true)
fillerEntry.thumbnail = './images/hidden_thumbnail.jpg'
fillerEntry.only_image = true
var fillerEntryIdx = -1
function SetOrderHighlight(curr, next) {
    var doReload = false
    if (fillerEntryIdx != -1) {
        currData.initiativeOrder.splice(fillerEntryIdx, 1)
        fillerEntryIdx = -1
        doReload = true
    }

    var c = n = null
    var fakeN = false
    for (var i = 0; i < currData.initiativeOrder.length; i++) {
        if (c == null && currData.initiativeOrder[i].position == curr)
            c = i
        if (n == null && currData.initiativeOrder[i].position == next)
            n = i
        if (n == null && currData.initiativeOrder[i].position > next) {
            n = i
            fakeN = true
        }
    }

    if (n == null || fakeN) {
        if (n == null) {
            n = currData.initiativeOrder.length
            currData.initiativeOrder.push(fillerEntry)
        } else {
            currData.initiativeOrder.splice(n, 0, fillerEntry)
        }
        fillerEntryIdx = n
        doReload = true
    }

    if (doReload)
        ReloadTable(currData)
    
    var entries = document.querySelectorAll('.initiativeEntry')
    if (c != null && entries.length > c && entries[c].classList.contains('highlight')) {
        entries[c].classList.remove('highlight')
        entries[c].classList.remove('slide-out')
        entries[c].classList.add('slide-in')
    }

    if (n != null && entries.length > n) {
        entries[n].classList.add('highlight')
        entries[n].classList.add('slide-out')
        entries[n].classList.remove('slide-in')
    }
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

socket.on(SocketCodes.currInit, function(val) {
    SetOrderHighlight(currCharacter, val)
    currCharacter = val
})
