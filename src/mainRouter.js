const router = require('express').Router()
const mathRoute = require('./routes/middle.router')

router.use('/examples', mathRoute)

module.exports = router