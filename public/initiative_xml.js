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

function AddChar(charName, initVal, dexMod, onLoad) {
    var data = {
        'charName': charName,
        'initVal': initVal,
        'dexMod': dexMod
    }
    PostServerData(urls.AddChar, data, onLoad)
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

function UpdateTable(data, onLoad) {
    PostServerData(urls.UpdateTable, data, onLoad)
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
    }
}