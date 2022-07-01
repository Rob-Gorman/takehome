const express = require('express')
const router = express.Router()
const controller = require('../controllers/defaultController')

router.get('/', controller.getNumbers);
router.get('/stream', controller.sse.init)
router.post('/', controller.startCalls);
router.post('/makeOne', controller.startCall); // just testing
router.post('/webhookURL', controller.webhookHandler)

module.exports = router;
