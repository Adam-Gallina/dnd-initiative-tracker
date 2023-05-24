const Requests = {
    AddChar:        { method: 'POST',   url: '/initiative' },
    UpdateTable:    { method: 'PATCH',  url: '/initiative' },
    RemoveChar:     { method: 'DELETE', url: '/initiative' },
    GetTable:       { method: 'GET',    url: '/initiative?enemies=true' },
    ResetTable:     { method: 'POST',   url: '/initiative/reset' },
    GetPlayerTable: { method: 'GET',    url: '/initiative?enemies=false' },

    SetDexMod:      { method: 'POST',   url: '/database'}
}

function InitEntry(name, value, mod, isPlayer) {
    return {
        name: name,
        total: value + mod,
        value: value,
        mod: mod,
        isPlayer: isPlayer
    }
}


function OpenXmlRequest(request, onLoad, urlParams = '') {
    var req = new XMLHttpRequest()
    req.open(request.method, request.url + urlParams)

    req.addEventListener('load', onLoad)

    return req
}


function AddEntry(entry, onLoad) {
    var req = OpenXmlRequest(Requests.AddChar, onLoad)
    req.setRequestHeader('Content-Type', 'application/json')
    
    req.send(JSON.stringify({ entry: entry }))
}

function RemoveChar(charName, onLoad) {
    var req = OpenXmlRequest(Requests.RemoveChar, onLoad, '/' + charName)
    
    req.send()
}

function GetTable(fullTable, onLoad) {
    var req = OpenXmlRequest(fullTable ? Requests.GetTable : Requests.GetPlayerTable, onLoad)
    
    req.send()
}

function UpdateTable(entries, onLoad) {
    var req = OpenXmlRequest(Requests.UpdateTable, onLoad)
    req.setRequestHeader('Content-Type', 'application/json')

    req.send(JSON.stringify({ entries: entries }))
}

function ClearTable(onLoad) {
    var req = OpenXmlRequest(Requests.ResetTable, onLoad)

    req.send()
}

function SetDexMod(charName, value, onLoad) {
    var req = OpenXmlRequest(Requests.SetDexMod, onLoad, '/' + charName)
    req.setRequestHeader('Content-Type', 'application/json')

    req.send(JSON.stringify({ dexMod: value }))
}

const InitOrder = {
    Chars: {
        Add: AddEntry,
        Remove: RemoveChar,
        GenEntry: InitEntry
    },
    Table:{
        Get: GetTable,
        Update: UpdateTable,
        Clear: ClearTable
    },
    Data:{
        SetDexMod: SetDexMod
    }
}