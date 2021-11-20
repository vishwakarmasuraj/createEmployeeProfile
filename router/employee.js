const express = require('express')
const router = express.Router();

/**
 * 
 */

const { empValidateRule, valid } = require('../middleware')
const { empController } = require('../controller')

/**
 * 
 */
router.post('/employee-create', empValidateRule.employeeValidateRule(), valid.validate, empController.employeeCreate)

router.get('/get-employee', empController.employeeGet)

router.put('/update-employee/:id', empController.employeeUpdate)

router.delete('/delete-employee/:id', empController.delEmployee)

module.exports = router