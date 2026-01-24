const bcrypt = require('bcryptjs')

if (!process.env.SIMPLE_KEY) {
    console.error("SIMPLE_KEY not found in env, setting as 'testpw'")
}
const SimpleKey = bcrypt.hashSync(process.env.SIMPLE_KEY || "testpw", 8)

async function requireAuthentication(req, res, next) {
    const key = req.body.key
    req.authorized = key && await bcrypt.compare(key, SimpleKey)

    if (req.authorized)
        next()
    else
        res.status(403).send()
}
exports.requireAuthentication = requireAuthentication