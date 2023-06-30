function onKeyReturned(event) {
    if (event.target.status == 200) {
        localStorage.authKey = key
        document.getElementById('login').setAttribute('hidden', 'true')
        document.getElementById('content').removeAttribute('hidden')
    }
}

var key = localStorage.authKey
if (key)
    CheckKey(key, onKeyReturned)

const keyEntry = document.getElementById('secret-key')
document.getElementById('submit-pw').addEventListener('click', function() {
    if (keyEntry.value != '') {
        key = keyEntry.value
        console.log(key)
        CheckKey(key, onKeyReturned)
    }
})