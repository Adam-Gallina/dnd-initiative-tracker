var urls = {
    'AddChar':'/initiative/char/add',
    'UpdateTable':'/initiative/table/update',
    'RemoveChar':'/initiative/char/remove',
    'GetTable':'/initiative/table/order',
    'ResetTable':'/initiative/table/reset'
}

function GetServerData(url, onLoad) {
    var req = new XMLHttpRequest()
    req.open('GET', url)

    req.addEventListener('load', onLoad)

    req.send()
}

function PostServerData(url, data, onLoad) {
    var req = new XMLHttpRequest()
    req.open('POST', url)
    req.setRequestHeader('Content-Type', 'application/json')
    
    if (arguments.length == 3)
        req.addEventListener('load', onLoad)

    req.send(JSON.stringify(data))
}

function GenChar(charName, initVal, dexMod) {
    return {
        'charName': charName,
        'initVal': initVal,
        'dexMod': dexMod
    }
}

function AddChar(charName, initVal, dexMod, onLoad) {
    PostServerData(urls.AddChar, GenChar(charName, initVal, dexMod), onLoad)
}

function RemoveChar(charName, onLoad) {
    var data = {
        'charName': charName
    }
    PostServerData(urls.RemoveChar, data, onLoad)
}

function GetTable(onLoad) {
    GetServerData(urls.GetTable, onLoad)
}

function UpdateTable(updatedChars, onLoad) {
    PostServerData(urls.UpdateTable, { 'initiativeOrder':updatedChars }, onLoad)
}

function ClearTable(onLoad) {
    PostServerData(urls.ResetTable, {}, onLoad)
}

const InitOrder = {
    'Chars':{
        'Add':AddChar,
        'Remove':RemoveChar
    },
    'Table':{
        'Get':GetTable,
        'Update':UpdateTable,
        'Clear':ClearTable
    },
    'GenChar':GenChar
}