const express = require('express')
const router = express.Router()
const getNumbers = require('../controllers/defaultController')
const startCalls = require('../controllers/defaultController')
const startCall = require('../controllers/defaultController')


router.get('/', getNumbers);
router.post('/', startCalls);
router.post('/makeOne', startCall);
// router.post('/webhookURL')

module.exports = router;