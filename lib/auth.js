const bcrypt = require('bcryptjs')

const SimpleKey = bcrypt.hashSync(process.env.SIMPLE_KEY, 8)

async function requireAuthentication(req, res, next) {
    const key = req.body.key
    req.authorized = key && await bcrypt.compare(key, SimpleKey)

    if (req.authorized)
        next()
    else
        res.status(403).send()
}
exports.requireAuthentication = requireAuthentication