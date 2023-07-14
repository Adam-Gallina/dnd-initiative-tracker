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
    AddEntry(key, InitEntry('Self', 8, 2, false))
})

const socket = io()

socket.on(SocketCodes.bkgdUpdate, function(/*name*/) {
    //if (currBackground === "")
    //    currBackground = bkgd
    //else if (bkgd != currBackground)
        location.reload()
})

const msgLog = document.getElementById('messages')
function ReloadMessages() {
    while (msgLog.firstChild)
        msgLog.removeChild(msgLog.firstChild)
        
    GetMessages(function(event) {    
        if (event.target.status == 200)
            JSON.parse(event.target.responseText).messages.forEach(
                msg => {
                    var li = document.createElement('li')
                    li.append(msg)
                    messages.append(li)
                })
    })
}

socket.on(SocketCodes.newMessage, function(msg) {
    var li = document.createElement('li')
    li.append(msg)
    messages.append(li)
})

socket.on(SocketCodes.msgUpdate, ReloadMessages)

const msgInp = document.getElementById('newMessage')
document.getElementById('sendMessage').addEventListener('click', function() {
    PostMessage(key, msgInp.value)
    msgInp.value = ''
})

document.getElementById('clearMessages').addEventListener('click', function() {
    ClearMessages(key)
})

ReloadMessages()