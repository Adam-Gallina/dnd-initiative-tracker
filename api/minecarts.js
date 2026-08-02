const { io, codes } = require('./socket')

// Html requests
const { Router } = require('express')
const { requireAuthentication } = require('../lib/auth')
const router = Router()

var snakeUnlocked = false
var newtUnlocked = false
var owlUnlocked = false
var displayUnlocked = false

var A = true
var B = false
var C = true
var AB = false
var BC = false
var AC = true

router.post('/reset', requireAuthentication, function(req, res) {
    A = true
    B = false
    C = true
    AB = false
    BC = false
    AC = true

    res.status(200).json(getMinecartState())
})

router.post('/togglea', requireAuthentication, function(req, res) {
    A = !A
    AB = !AB
    AC = !AC

    io.emit(codes.minecartUpdate, getMinecartState())
    res.status(200).json(getMinecartState())
})

router.post('/toggleb', requireAuthentication, function(req, res) {
    B = !B
    AB = !AB
    BC = !BC
    
    io.emit(codes.minecartUpdate, getMinecartState())
    res.status(200).json(getMinecartState())
})

router.post('/togglec', requireAuthentication, function(req, res) {
    C = !C
    BC = !BC
    AC = !AC
    
    io.emit(codes.minecartUpdate, getMinecartState())
    res.status(200).json(getMinecartState())
})

router.post('/controls', requireAuthentication, function(req, res) {
    snakeUnlocked = req.body.snake
    newtUnlocked = req.body.newt
    owlUnlocked = req.body.owl
    displayUnlocked = req.body.display

    io.emit(codes.minecartUpdate, getMinecartState())
    res.status(200).json(getMinecartState())
})

function getMinecartState() {
    return {
        'A': A,
        'B': B,
        'C': C,
        'AB': AB,
        'BC': BC,
        'AC': AC,
        'snake': snakeUnlocked,
        'newt': newtUnlocked,
        'owl': owlUnlocked,
        'display': displayUnlocked,
    }
}

router.get('/minecartstate', function(req, res) {
    res.status(200).json(getMinecartState())
})

module.exports = {
    router: router
}