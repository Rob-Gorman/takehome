const express = require('express')
const router = express.Router()
// const getNumbers = require('../controllers/defaultController')
const controller = require('../controllers/defaultController')
// const startCall = require('../controllers/defaultController')


router.get('/', controller.getNumbers);
router.post('/', controller.startCalls);
// router.post('/makeOne', startCall); // just testing
// router.post('/webhookURL')

module.exports = router;