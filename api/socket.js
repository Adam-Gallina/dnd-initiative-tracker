const express = require('express')
const app = express()
exports.app = app

const http = require('http')
const server = http.createServer(app)
exports.server = server

const { Server } = require('socket.io')
const io = new Server(server)
exports.io = io

const codes = {
    bkgdUpdate: 'background update',
    initUpdate: 'initiative update',
    newMessage: 'dm message',
    msgUpdate: 'message update'
}
exports.codes = codes

function SendBackgroundUpdate(name) {
    io.emit(codes.bkgdUpdate)
}
exports.SendBackgroundUpdate = SendBackgroundUpdate

function SendInitiativeUpdate() {
    io.emit(codes.initUpdate)
}
exports.SendInitiativeUpdate = SendInitiativeUpdate

function SendMessage(msg) {
    io.emit(codes.newMessage, msg)
}
exports.SendMessage = SendMessage
function SendMessageUpdate() {
    io.emit(codes.msgUpdate)
}
exports.SendMessageUpdate = SendMessageUpdate