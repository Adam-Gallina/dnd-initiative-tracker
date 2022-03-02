function GetServerData(url, onLoad) {
    
}

function PostServerData(url, data, onLoad) {
    var req = new XMLHttpRequest()
    req.open('POST', url)
    req.setRequestHeader('Content-Type', 'application/json')
    
    if (arguments.length == 3)
        req.addEventListener('load', onLoad)

    req.send(JSON.stringify(data))
}

const InitOrder = {
    'GetData':GetServerData,
    'PostData':PostServerData,
    'urls':{
        'AddChar':'/initiative/char/add',
        'UpdateChar':'/initiative/char/update',
        'RemoveChar':'/initiative/char/remove',
        'GetTable':'/initiative/table/order',
        'ResetTable':'/initiative/table/reset'
    }
}