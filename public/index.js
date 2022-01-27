document.getElementById("submit").addEventListener('click', function(event) {
    charName = document.getElementById("charName")
    initVal = document.getElementById("initVal")
    dexMod = document.getElementById("dexMod")

    if (!charName.value || !initVal.value || !dexMod.value)
        alert("Please fill in all fields")
    else {
        var req = new XMLHttpRequest()
        req.open('POST', '/initiative/add')
        req.setRequestHeader('Content-Type', 'application/json')
        
        req.addEventListener('load', function(event) {
            console.log(event)
        })

        req.send(JSON.stringify({
            'charName': charName.value,
            'initVal': initVal.value,
            'dexMod': dexMod.value
        }))

        charName.value = ''
        initVal.value = ''
        dexMod.value = ''
    }
})