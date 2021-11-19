const { body } = require('express-validator');
const { employeeModel } = require('../models')

const employeeValidateRule = () => {
    return [
        body('title').notEmpty(),
        body('name').notEmpty().custom(value => {
            return employeeModel.findOne({ name: value }).then(user => {
                if (user) {
                    return Promise.reject('name is already exist')
                }
            })
        }),
        body('lastName').notEmpty(),
        body('designation').notEmpty(),
        body('company').notEmpty(),
        body('email').notEmpty().isEmail()
            .custom(value => {
                return employeeModel.findOne({ email: value }).then(user => {
                    if (user) {
                        return Promise.reject('email is already exist')
                    }
                })
            }),
        body('password').notEmpty().isLength({ min: 6 }),
        body('mobile').notEmpty(),
        body('address').notEmpty(),
        body('status').notEmpty()
    ]
}
module.exports = { employeeValidateRule }