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
        body('password').notEmpty().isStrongPassword({
            minLength: 6,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1
        }).withMessage("Password must be min 6 and contain at least one uppercase letter, one lowercase letter, and one number"),
        body('mobile').notEmpty().isLength({ min: 10, max: 10 }),
        body('address').notEmpty(),
        body('status').notEmpty()
    ]
}
module.exports = { employeeValidateRule }