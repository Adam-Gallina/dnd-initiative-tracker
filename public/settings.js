document.getElementById("theme").addEventListener('change', function() {
    InitOrder.Images.ChangeBkgd(key, this.value, function(event) {
        if (event.target.status == 200)
            location.reload()
        else
            alert("Error while changing background")
    })
})

const socket = io()

socket.on(SocketCodes.bkgdUpdate, function(/*name*/) {
    //if (currBackground === "")
    //    currBackground = bkgd
    //else if (bkgd != currBackground)
        location.reload()
})