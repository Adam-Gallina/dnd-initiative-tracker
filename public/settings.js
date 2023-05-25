document.getElementById("theme").addEventListener('change', function() {
    InitOrder.Images.ChangeBkgd(this.value, function(event) {
        if (event.target.status == 200)
            location.reload()
        else
            alert("Error while changing background")
    })
})