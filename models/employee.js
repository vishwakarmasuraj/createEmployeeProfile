const { Schema, model } = require('mongoose')

const employeeSchema = new Schema({
    title: {
        type: Schema.Types.String,
        required: true
    },
    name: {
        type: Schema.Types.String,
        required: true
    },
    lastName: {
        type: Schema.Types.String,
        required: true
    },
    designation: {
        type: Schema.Types.String,
        required: true,
        enum: ['back-end developer', 'designer', 'front-end developer', 'team leader', 'quality analyst']
    },
    company: {
        type: Schema.Types.String,
        required: true
    },
    email: {
        type: Schema.Types.String,
        required: true
    },
    password: {
        type: Schema.Types.String,
        required: true
    },
    mobile: {
        type: Schema.Types.String,
        required: true
    },
    address: {
        type: Schema.Types.String,
        required: true
    },
    status: {
        type: Schema.Types.String,
        enum: ['active', 'inactive'],
        required: true
    }
})

module.exports = model('Employee', employeeSchema)