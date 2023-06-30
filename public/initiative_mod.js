var currCharacter = -1
var totalCharacters = 0

modPerms = true
onTableReload = function(data) {
    deleteBtns = document.querySelectorAll('#delete')
    deleteBtns.forEach(
        (x, i) => x.addEventListener('click', function(event) {
            InitOrder.Chars.Remove(key, event.target.parentNode.parentNode.getAttribute('name'), 
                function(event) {
                    if (event.target.status == 200) {
                        CheckForTableUpdate()
                    }
                    else {
                        alert(event.target.status + ': ' + event.target.response)
                    }
                }
            )
        }
    ))
    
    totalCharacters = deleteBtns.length
    if (totalCharacters > 0) {
        if (currCharacter < 0)
            currCharacter = 0
        else if (currCharacter >= totalCharacters)
            currCharacter = totalCharacters - 1
    }
    
    if (currCharacter != -1)
        deleteBtns[currCharacter].parentNode.parentNode.classList.add("highlight")
}

function SetOrderHighlight(curr, next) {
    deleteBtns = document.querySelectorAll('#delete')
    
    if (deleteBtns[curr].parentNode.parentNode.classList.contains('highlight'))
        deleteBtns[curr].parentNode.parentNode.classList.remove('highlight')

    deleteBtns[next].parentNode.parentNode.classList.add('highlight')
}

document.getElementById('edit').addEventListener('click', function(event) {
    var valueBtns = document.querySelectorAll('.initiativeEntry')
    var editBtn = event.target

    var data = []

    for (var i = 0; i < valueBtns.length; i++) {
        val = valueBtns[i].querySelector('#value')
        mod = valueBtns[i].querySelector('#mod')
        if (refreshingTable) {
            val.removeAttribute('readonly')
            mod.removeAttribute('readonly')
        }
        else {
            val.setAttribute('readonly', 'readonly')
            mod.setAttribute('readonly', 'readonly')

            data.push(InitOrder.Chars.GenEntry(
                valueBtns[i].getAttribute('name'),
                parseInt(val.value),
                parseInt(mod.value),
                'unknown'
            ))
        }
    }

    if (!refreshingTable) {
        InitOrder.Table.Update(key, data, function(event) {
            if (event.target.status == 200) {
                refreshingTable = true
                editBtn.value = "Edit"
                CheckForTableUpdate()
            } else {
                alert("Error " + event.target.status + " when saving changes")
            }
        })
    }
    else {
        refreshingTable = false
        editBtn.value = "Save"
    }
})

document.getElementById('next').addEventListener('click', function() {
    next = currCharacter + 1 < totalCharacters ? currCharacter + 1 : 0
    SetOrderHighlight(currCharacter, next)
    currCharacter = next
})

document.getElementById('reset').addEventListener('click', function() {
    console.log(key)
    InitOrder.Table.Clear(key, function(event) {
        currCharacter = -1
        if (event.target.status == 200) {
            CheckForTableUpdate()
        } else {
            alert("Error " + event.target.status + " when trying to reset table")
        }
    })
})

document.getElementById('submit').addEventListener('click', function(event) {
    var charNameVal = document.getElementById("charName").value

    var count = document.getElementById("totalNpc")
    var isPlayer = document.getElementById("isPlayer")

    initVal = document.getElementById("initVal")
    if (!initVal.value)
        initVal.value = Math.floor(Math.random() * 20) + 1

    var entry = ReadCharEntry(true, true, true, isPlayer.checked)
    
    if (entry) {
        npcTotal = parseInt(count.value)
        
        for (var i = 0; i < npcTotal; i++) {
            entry.name = charNameVal + (npcTotal > 1 ? ' ' + i : '')
            
            SubmitCharEntry(entry)
        }

        count.value = '1'
        isPlayer.checked = false
    }
})