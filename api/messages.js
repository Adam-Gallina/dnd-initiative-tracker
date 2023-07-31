const { io, codes } = require('./socket')

const MsgLog = { messages: [] }

const { Router } = require('express')
const { requireAuthentication } = require('../lib/auth')
const router = Router()

router.get('/', function(req, res, next) {
    res.status(200).json({
        messages: MsgLog.messages
    })
})

router.post('/', requireAuthentication, function(req, res, next) {
    if (!req.authorized)
        next()
    else {
        if (!req.body.message)
            res.status(500).json({ error: 'Improperly formatted body' })
        else {
            MsgLog.messages.push(req.body.message)
            io.emit(codes.newMessage, req.body.message)
            res.status(200).send()
        }
    }
})

router.post('/clear', requireAuthentication, function(req, res, next) {
    if (!req.authorized)
        next()
    else {
        MsgLog.messages = []
        io.emit(codes.msgUpdate)
        res.status(200).send()
    }
})

exports.router = router