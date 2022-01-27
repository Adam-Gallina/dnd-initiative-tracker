document.getElementById('reset').addEventListener('click', function() {
    var req = new XMLHttpRequest()
    req.open('POST', '/initiative/reset')
    req.send()
})

document.getElementById('submit').addEventListener('click', function(event) {
    charName = document.getElementById("npcName")
    count = document.getElementById("totalNpc")
    initVal = Math.floor(Math.random() * 20) + 1
    dexMod = document.getElementById("dexMod")

    if (!charName.value || !count.value || !dexMod.value)
        alert("Please fill in all fields")
    else {
        
        npcTotal = parseInt(count.value)
        for (var i = 0; i < npcTotal; i++) {
            var req = new XMLHttpRequest()
            req.open('POST', '/initiative/add')
            req.setRequestHeader('Content-Type', 'application/json')
            
            req.addEventListener('load', function(event) {
                console.log(event)
            })

            req.send(JSON.stringify({
                'charName': charName.value + (npcTotal > 1 ? ' ' + i : ''),
                'initVal': initVal,
                'dexMod': dexMod.value
            }))
        }

        charName.value = ''
        count.value = '1'
        dexMod.value = ''
    }
})