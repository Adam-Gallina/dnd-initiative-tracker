const codes = {
    bkgdUpdate: 'background update',
    initUpdate: 'initiative update',
    newMessage: 'dm message',
    msgUpdate: 'message update'
}
exports.codes = codes

const express = require('express')
const app = express()
exports.app = app

const http = require('http')
const server = http.createServer(app)
exports.server = server

const { Server } = require('socket.io')
const io = new Server(server)
exports.io = io
