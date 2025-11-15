const {createSchedule} = require('../controllers/scheduleControler')
const express = require('express')

const router = express.Router()

router.post('/create',createSchedule)

module.exports = router