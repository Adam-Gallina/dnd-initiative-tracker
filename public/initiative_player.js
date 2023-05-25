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