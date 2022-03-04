const TableReloadDelay = 3000
var refreshingTable = true;

var initiativeTable = document.getElementById("initTable")

var currData = []

document.getElementById("submit").addEventListener('click', function(event) {
    charName = document.getElementById("charName")
    initVal = document.getElementById("initVal")
    dexMod = document.getElementById("dexMod")

    if (!charName.value || !initVal.value || !dexMod.value)
        alert("Please fill in all fields")
    else {
        InitOrder.Chars.AddPlayer(charName.value, initVal.value, dexMod.value,
            function(event){
            if (event.target.status == 200) {
                initVal.value = ''
                CheckForTableUpdate()
            }
            else
                alert('ERROR '+ event.target.status +': ' + event.target.response)
        })
    }
})

function ReloadTable(data) {
    initiativeTable.innerHTML = Handlebars.templates.initiativeTable(data)
    currData = data.initiativeOrder
}

function CheckForTableUpdate() {
    InitOrder.Table.Get(false, function(event) {
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

CheckForTableUpdate()

setInterval(function() {
    if (refreshingTable)
        CheckForTableUpdate()
}, TableReloadDelay)