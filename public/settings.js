document.getElementById("theme").addEventListener('change', function() {
    InitOrder.Images.ChangeBkgd(key, this.value, function(event) {
        if (event.target.status == 200)
            location.reload()
        else
            alert("Error while changing background")
    })
})

document.getElementById("debugPlayers").addEventListener('click', function() {
    AddEntry(key, InitEntry('Gorblor', 5, 1, true))
    AddEntry(key, InitEntry('Serenity', 10, 4, false))
    AddEntry(key, InitEntry('Amity',  7, -2, true))
    AddEntry(key, InitEntry('Zephyr', 20, 5, true))
    AddEntry(key, InitEntry('Frances', 15, 3, false))
    AddEntry(key, InitEntry('Self', 1, 2, false))
})

document.getElementById("refreshImages").addEventListener('click', function() {
    InitOrder.Images.Reload(key, function(event) {
        console.log(event.target.responseText)
        if (event.target.status == 200)
            location.reload()
        else if (event.target.status == 400)
            alert('Error while reloading images: ' + JSON.parse(event.target.responseText).error)
        else
            alert('Error ' + event.target.status + ' while trying to reload images files')
    })
})

const snakeLever = document.getElementById('snakeLever')
const newtLever = document.getElementById('newtLever')
const owlLever = document.getElementById('owlLever')
const lightDisplay = document.getElementById('lightDisplay')
document.getElementById('saveMinecart').addEventListener('click', function() {    
    var req = OpenXmlRequest(
        {method: 'POST', url:'/minecarts/controls'}, 
        function(event){
            if (event.target.status != 200)
                alert("Failed to submit minecart state")
    })
    req.setRequestHeader('Content-Type', 'application/json')
    req.send(JSON.stringify({
        key: key,
        "snake": snakeLever.checked,
        "newt": newtLever.checked,
        "owl": owlLever.checked,
        "display": lightDisplay.checked
    }))
})

// Load current minecart state
var req = OpenXmlRequest(
    {method: 'GET', url:'/minecarts/minecartstate'}, 
    function(event){
        if (event.target.status == 200) {
            var vals = JSON.parse(event.target.responseText)
            snakeLever.checked = vals.snake
            newtLever.checked = vals.newt
            owlLever.checked = vals.owl
            lightDisplay.checked = vals.display
        } else {
            alert("Could not load existing minecart state")
        }
})
req.setRequestHeader('Content-Type', 'application/json')
req.send()

const socket = io()

socket.on(SocketCodes.bkgdUpdate, function(/*name*/) {
    //if (currBackground === "")
    //    currBackground = bkgd
    //else if (bkgd != currBackground)
        location.reload()
})
