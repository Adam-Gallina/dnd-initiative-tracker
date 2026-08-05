const indicators = {
    'A': ['┘', '┐'],
    'B': ['─', '┐'],
    'C': ['┘', '┐'],
    'AB': ['┘', '─'],
    'BC': ['─', '┐'],
    'AC': ['─', '┐'],
}

function toggleA() {
    var req = OpenXmlRequest(
        {method: 'POST', url:'/minecarts/togglea'}, 
        function(event){
            if (event.target.status != 200)
                alert('ERROR '+ event.target.status +': ' + event.target.response)
    })
    req.setRequestHeader('Content-Type', 'application/json')
    req.send(JSON.stringify({key: key}))
}

function toggleB() {
    var req = OpenXmlRequest(
        {method: 'POST', url:'/minecarts/toggleb'}, 
        function(event){
            if (event.target.status != 200)
                alert('ERROR '+ event.target.status +': ' + event.target.response)
    })
    req.setRequestHeader('Content-Type', 'application/json')
    req.send(JSON.stringify({key: key}))
}
function toggleC() {
    var req = OpenXmlRequest(
        {method: 'POST', url:'/minecarts/togglec'}, 
        function(event){
            if (event.target.status != 200)
                alert('ERROR '+ event.target.status +': ' + event.target.response)
    })
    req.setRequestHeader('Content-Type', 'application/json')
    req.send(JSON.stringify({key: key}))
}

const snakeLever = document.getElementById('toggleA')
const newtLever = document.getElementById('toggleB')
const owlLever = document.getElementById('toggleC')
const A = document.getElementById('A')
const B = document.getElementById('B')
const C = document.getElementById('C')
const AB = document.getElementById('AB')
const BC = document.getElementById('BC')
const AC = document.getElementById('AC')
function redrawMinecarts(data) {
    snakeLever.innerHTML = data['snake'] ? 'Snake' : ''
    snakeLever.disabled = !data['snake']
    newtLever.innerHTML = data['newt'] ? 'Newt' : ''
    newtLever.disabled = !data['newt']
    owlLever.innerHTML = data['owl'] ? 'Owl' : ''
    owlLever.disabled = !data['owl']
    A.innerHTML = indicators['A'][data['A'] ? 0 : 1]
    B.innerHTML = data['display'] ? indicators['B'][data['B'] ? 0 : 1] : ' '
    C.innerHTML = data['display'] ? indicators['C'][data['C'] ? 0 : 1] : ' '
    AB.innerHTML = data['display'] ? indicators['AB'][data['AB'] ? 0 : 1] : ' '
    BC.innerHTML = data['display'] ? indicators['BC'][data['BC'] ? 0 : 1] : ' '
    AC.innerHTML = data['display'] ? indicators['AC'][data['AC'] ? 0 : 1] : ' '
}

// Get current minecart state on page load
var req = OpenXmlRequest(
    {method: 'GET', url:'/minecarts/minecartstate'}, 
    function(event){
        if (event.target.status == 200)
            redrawMinecarts(JSON.parse(event.target.responseText))
        else
            alert('ERROR '+ event.target.status +': ' + event.target.response)
})
req.send()


const socket = io()

socket.on(SocketCodes.bkgdUpdate, function() {
    location.reload()
})

socket.on(SocketCodes.minecartUpdate, function(val) {
    redrawMinecarts(val)
})