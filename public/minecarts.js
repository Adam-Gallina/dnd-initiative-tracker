const indicators = {
    'A': ['┘', '┐'],
    'B': ['─', '┐'],
    'C': ['┘', '┐'],
    'AB': ['┘', '─'],
    'BC': ['─', '┐'],
    'AC': ['──', '─┐'],
}

function toggleA() {
    var req = OpenXmlRequest(
        {method: 'POST', url:'/minecarts/togglea'}, 
        function(event){
            if (event.target.status == 200)
                redrawMinecarts(JSON.parse(event.target.responseText))
            else
                alert('ERROR '+ event.target.status +': ' + event.target.response)
    })
    req.setRequestHeader('Content-Type', 'application/json')
    req.send(JSON.stringify({key: key}))
}

function toggleB() {
    var req = OpenXmlRequest(
        {method: 'POST', url:'/minecarts/toggleb'}, 
        function(event){
            if (event.target.status == 200)
                redrawMinecarts(JSON.parse(event.target.responseText))
            else
                alert('ERROR '+ event.target.status +': ' + event.target.response)
    })
    req.setRequestHeader('Content-Type', 'application/json')
    req.send(JSON.stringify({key: key}))
}
function toggleC() {
    var req = OpenXmlRequest(
        {method: 'POST', url:'/minecarts/togglec'}, 
        function(event){
            if (event.target.status == 200)
                redrawMinecarts(JSON.parse(event.target.responseText))
            else
                alert('ERROR '+ event.target.status +': ' + event.target.response)
    })
    req.setRequestHeader('Content-Type', 'application/json')
    req.send(JSON.stringify({key: key}))
}

function redrawMinecarts(data) {
    document.getElementById('A').innerHTML = indicators['A'][data['A'] ? 0 : 1]
    document.getElementById('B').innerHTML = indicators['B'][data['B'] ? 0 : 1]
    document.getElementById('C').innerHTML = indicators['C'][data['C'] ? 0 : 1]
    document.getElementById('AB').innerHTML = indicators['AB'][data['AB'] ? 0 : 1]
    document.getElementById('BC').innerHTML = indicators['BC'][data['BC'] ? 0 : 1]
    document.getElementById('AC').innerHTML = indicators['AC'][data['AC'] ? 0 : 1]
}


var req = OpenXmlRequest(
    {method: 'GET', url:'/minecarts/minecartstate'}, 
    function(event){
        if (event.target.status == 200)
            redrawMinecarts(JSON.parse(event.target.responseText))
        else
            alert('ERROR '+ event.target.status +': ' + event.target.response)
})
req.send()
