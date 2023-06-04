const express = require('express')
const app = express()
exports.app = app

const http = require('http')
const server = http.createServer(app)
exports.server = server

const { Server } = require('socket.io')
const io = new Server(server)

const codes = {
    bkgdUpdate: 'background update',
    initUpdate: 'initiative update'
}

function SendBackgroundUpdate(name) {
    io.emit(codes.bkgdUpdate)
}
exports.SendBackgroundUpdate = SendBackgroundUpdate

function SendInitiativeUpdate() {
    io.emit(codes.initUpdate)
}
exports.SendInitiativeUpdate = SendInitiativeUpdate