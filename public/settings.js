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