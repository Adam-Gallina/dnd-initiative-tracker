document.getElementById("submit").addEventListener('click', function(event) {
    charName = document.getElementById("charName")
    initVal = document.getElementById("initVal")
    dexMod = document.getElementById("dexMod")

    if (!charName.value || !initVal.value || !dexMod.value)
        alert("Please fill in all fields")
    else {
        InitOrder.Chars.Add(charName.value, initVal.value, dexMod.value,
            function(event){
            if (event.target.status == 200)
                initVal.value = ''
            else
                alert('ERROR '+ event.target.status +': ' + event.target.response)
        })
    }
})