const express = require('express')
const router = express.Router();

router.use('/employee-record', require('./employee'))


module.exports = router