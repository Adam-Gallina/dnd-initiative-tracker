const TableReloadDelay = 3000
var refreshingTable = true;

var initiativeTable = document.getElementById("charInit")

var currData = []

var currCharacter = -1
var totalCharacters = 0

function ReloadTable(data) {
    data.modPerms = true
    initiativeTable.innerHTML = Handlebars.templates.initiativeTable(data)
    currData = data.initiativeOrder

    deleteBtns = document.querySelectorAll('#delete')

    deleteBtns.forEach(
        (x, i) => x.addEventListener('click', function(event) {
            InitOrder.Chars.Remove(event.target.parentNode.parentNode.getAttribute('name'), 
                function(event) {
                    if (event.target.status == 200) {
                        CheckForTableUpdate()
                    }
                    else {
                        alert(event.target.status + ': ' + event.target.response)
                    }
                }
            )
        }
    ))
    
    totalCharacters = deleteBtns.length
    if (totalCharacters > 0 && currCharacter == -1)
        currCharacter = 0
    
    deleteBtns[currCharacter].parentNode.parentNode.classList.add("highlight")
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

function SetOrderHighlight(curr, next) {
    deleteBtns = document.querySelectorAll('#delete')
    
    if (deleteBtns[curr].parentNode.parentNode.classList.contains('highlight'))
        deleteBtns[curr].parentNode.parentNode.classList.remove('highlight')

    deleteBtns[next].parentNode.parentNode.classList.add('highlight')
}

document.getElementById('edit').addEventListener('click', function(event) {
    var valueBtns = document.querySelectorAll('.initiativeEntry')
    var editBtn = event.target

    var data = []

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

            data.push(InitOrder.GenChar(
                valueBtns[i].getAttribute('name'),
                val.value,
                mod.value))
        }
    }

    if (!refreshingTable) {
        InitOrder.Table.Update(data, function(event) {    
            if (event.target.status == 200) {
                refreshingTable = !refreshingTable
                editBtn.value = refreshingTable ? "Edit" : "Save"
            } else {
                alert("Error " + event.target.status + " when saving changes")
            }
        })
    }
    else {
        refreshingTable = !refreshingTable
        editBtn.value = refreshingTable ? "Edit" : "Save"
    }
})

document.getElementById('next').addEventListener('click', function() {
    next = currCharacter + 1 < totalCharacters ? currCharacter + 1 : 0
    SetOrderHighlight(currCharacter, next)
    currCharacter = next
})

document.getElementById('reset').addEventListener('click', function() {
    InitOrder.Table.Clear(function(event) {
        if (event.target.status == 200) {
            CheckForTableUpdate()
        } else {
            alert("Error " + event.target.status + " when trying to reset table")
        }
    })
})

document.getElementById('submit').addEventListener('click', function(event) {
    charName = document.getElementById("npcName")
    count = document.getElementById("totalNpc")
    initVal = document.getElementById("initVal")
    dexMod = document.getElementById("dexMod")
    isPlayer = document.getElementById("isPlayer")

    var Add = isPlayer.checked ? InitOrder.Chars.AddPlayer : InitOrder.Chars.AddNpc

    if (!initVal.value)
        initVal.value = Math.floor(Math.random() * 20) + 1

    if (!charName.value || !count.value || !dexMod.value)
        alert("Please fill in all fields")
    else {
        npcTotal = parseInt(count.value)
        
        for (var i = 0; i < npcTotal; i++) {
            Add(charName.value + (npcTotal > 1 ? ' ' + i : ''), parseInt(initVal.value), dexMod.value,
                function(event) {
                if (event.target.status == 200) {
                    CheckForTableUpdate()
                } else {
                    alert("Error " + event.target.status + " when trying to add new NPCs")
                }
            })
        }

        charName.value = ''
        count.value = '1'
        initVal.value = ''
        dexMod.value = ''
        isPlayer.checked = false
    }
})

CheckForTableUpdate()

setInterval(function() {
    if (refreshingTable)
        CheckForTableUpdate()
}, TableReloadDelay)