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

const socket = io()

socket.on(SocketCodes.bkgdUpdate, function(/*name*/) {
    //if (currBackground === "")
    //    currBackground = bkgd
    //else if (bkgd != currBackground)
        location.reload()
})
