fs = require('fs')
const FNAME = 'leaderboard.json'

var leaderboard = {}

function LoadLeaderboard() {
    try {
        leaderboard = require('../' + FNAME)
        return
    } catch {
        fs.writeFileSync(FNAME, '{}', function(err) {
            console.log('[Error] Could not create ' + FNAME + ': ' + err)
            return {}
        })
    }

    return LoadLeaderboard()
}

function SaveLeaderboard() {
    fs.writeFile(FNAME, JSON.stringify(leaderboard), function(err) {
        return err ? false : true
    })
}

function InsertScore(gamemode, player, score) {
    LoadLeaderboard()

    if (!(gamemode in leaderboard))
        leaderboard[gamemode] = []

    var i = 0
    for (i; i < leaderboard[gamemode].length; i++) {
        if (leaderboard[gamemode][i].score < score)
            break
    }

    leaderboard[gamemode].splice(i, 0, {'name':player, 'score':score})

    return SaveLeaderboard()
}

// HTML requests

const { Router } = require('express')
const { range } = require('express/lib/request')
const { requireAuthentication } = require('../lib/auth')
const router = Router()

router.post('/:gamemode/score', requireAuthentication, function(req, res, next) {
    if (!req.authorized)
        next()
    else {
        player_name = req.body.name
        gamemode = req.params.gamemode
        score = req.body.score

        InsertScore(gamemode, player_name, score)
        res.status(200).send()
    }
})

router.get('/:gamemode/top', function(req, res, next) {
    LoadLeaderboard()
    if (!(req.params.gamemode in leaderboard))
        res.status(200).send([])
    else if (leaderboard[req.params.gamemode].length < req.body.count)
        res.status(200).send(leaderboard[req.params.gamemode])
    else
        res.status(200).send(leaderboard[req.params.gamemode].slice(0, req.body.count))
})


exports.router = router
module.exports = { router: router }