document.getElementById("submit").addEventListener('click', function(event) {
    var entry = ReadCharEntry(false, true, false, true)
    if (entry)
        SubmitCharEntry(entry)
})

if (document.getElementById("charName").hasAttribute('readonly')) {
    document.getElementById("dexMod").addEventListener('change', function(event) {
        charName = document.getElementById("charName")
        dexMod = document.getElementById("dexMod")
        InitOrder.Data.SetDexMod(charName.value, dexMod.value)
    })
}


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

ReloadMessages()
CheckForTableUpdate()