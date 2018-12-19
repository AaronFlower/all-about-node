const express = require('express')
const bodyParser = require('body-parser')

const jwt = require('jsonwebtoken')

const app = express()
app.use(bodyParser.json())

app.get('/api', (req, res) => {
    res.json({
        desc: 'My API. Please authenticate'
    })
})

app.post('/api/login', (req, res) => {
    // insert code here to actually authenticate, or fake it.
    const user = {id: 3, name : 'aaron'}

    // then returns a token, secret key should be an variable
    const token = jwt.sign(
        {user: user.id}, // playload
        'aaron-flower-key', // private secrect key
        {} // options
    )

    res.json({
        message: 'Authenticated! Use this token in the "Authentication" header',
        token: token
    })
})

app.get('/api/protected', ensureToken, (req, res) => {
    jwt.verify(req.token, 'aaron-flower-key', (err, data) => {
        if (err) {
            res.status(403).send('Error Token')
        } else {
            res.json({
                desc: 'Protected information. Congrats!'
            })
        }
    })
})

function ensureToken(req, res, next) {
    const bearHeader = req.headers["authentication"]
    if (typeof bearHeader !== 'undefined') {
        const bear = bearHeader.split(" ")
        req.token = bear[1]
        next()
    } else {
        res.status(403).send("No Authentication header")
    }
}
app.listen(3000, () => {
    console.log('App listening on port 3000!')
})
