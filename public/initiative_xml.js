const Requests = {
    AddChar:        { method: 'POST',   url: '/initiative' },
    UpdateTable:    { method: 'PATCH',  url: '/initiative' },
    RemoveChar:     { method: 'DELETE', url: '/initiative' },
    GetTable:       { method: 'GET',    url: '/initiative?enemies=true' },
    ResetTable:     { method: 'POST',   url: '/initiative/reset' },
    GetPlayerTable: { method: 'GET',    url: '/initiative?enemies=false' },

    SetDexMod:      { method: 'POST',   url: '/database' },

    SetBkgd:        { method: 'POST',   url: '/images/background' },
    ReloadImgs:     { method: 'POST',    url: '/images/reloadImages' },

    GetMessages:    { method: 'GET',    url: '/messages' },
    SendMessage:    { method: 'POST',   url: '/messages' },
    ClearMessages:  { method: 'POST',   url: '/messages/clear' },

    CheckKey:       { method: 'POST',   url: '/auth'}
}

const SocketCodes = {
    bkgdUpdate: 'background update',
    initUpdate: 'initiative update',
    currInit: 'curr initiative',
    newMessage: 'dm message',
    msgUpdate: 'message update'
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

function SendAuthorizedJSON(xml, key, body) {
    xml.setRequestHeader('Content-Type', 'application/json')
    if (body == null)
        body = {}
    body.key = key
    xml.send(JSON.stringify(body))
}


function AddEntry(key, entry, onLoad) {
    var req = OpenXmlRequest(Requests.AddChar, onLoad)
    req.setRequestHeader('Content-Type', 'application/json')
    
    req.send(JSON.stringify({ key: key, entry: entry }))
}

function RemoveChar(key, charName, onLoad) {
    var req = OpenXmlRequest(Requests.RemoveChar, onLoad, '/' + charName)
    req.setRequestHeader('Content-Type', 'application/json')
    
    req.send(JSON.stringify({ key: key }))
}

function GetTable(fullTable, onLoad) {
    var req = OpenXmlRequest(fullTable ? Requests.GetTable : Requests.GetPlayerTable, onLoad)
    
    req.send()
}

function UpdateTable(key, entries, onLoad) {
    var req = OpenXmlRequest(Requests.UpdateTable, onLoad)
    req.setRequestHeader('Content-Type', 'application/json')

    req.send(JSON.stringify({ key: key, entries: entries }))
}

function ClearTable(key, onLoad) {
    var req = OpenXmlRequest(Requests.ResetTable, onLoad)
    req.setRequestHeader('Content-Type', 'application/json')

    req.send(JSON.stringify({ key: key }))
}

function SetDexMod(key, charName, value, onLoad) {
    var req = OpenXmlRequest(Requests.SetDexMod, onLoad, '/' + charName)
    req.setRequestHeader('Content-Type', 'application/json')

    req.send(JSON.stringify({ key: key, dexMod: value }))
}


function ChangeBackground(key, background, onLoad) {
    var req = OpenXmlRequest(Requests.SetBkgd, onLoad, '/' + background)
    req.setRequestHeader('Content-Type', 'application/json')

    req.send(JSON.stringify({ key: key }))
}

function ReloadImgs(key, onLoad) {
    var req = OpenXmlRequest(Requests.ReloadImgs, onLoad)
    req.setRequestHeader('Content-Type', 'application/json')
    
    req.send(JSON.stringify({ key: key }))
}


function GetMessages(onLoad) {
    var req = OpenXmlRequest(Requests.GetMessages, onLoad)
    req.send()
}

function PostMessage(key, msg, onLoad) {
    var req = OpenXmlRequest(Requests.SendMessage, onLoad)
    req.setRequestHeader('Content-Type', 'application/json')

    req.send(JSON.stringify({ key: key, message: msg }))
}

function ClearMessages(key, onLoad) {
    SendAuthorizedJSON(OpenXmlRequest(Requests.ClearMessages, onLoad), key)
}


function CheckKey(key, onLoad) {
    var req = OpenXmlRequest(Requests.CheckKey, onLoad)
    req.setRequestHeader('Content-Type', 'application/json')

    req.send(JSON.stringify({ key: key }))
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
    },
    Images:{
        ChangeBkgd: ChangeBackground,
        Reload: ReloadImgs
    }
}