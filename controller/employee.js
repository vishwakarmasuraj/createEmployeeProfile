const { employeeModel } = require('../models');
const { successHandler, errorHandler } = require('../helper/responseHandler');
const constants = require('../constant/allConstant');
const bcrypt = require('bcrypt');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */

const employeeCreate = async (req, res) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, constants.ROUND)
        const employee = await new employeeModel(req.body);
        await employee.save()
        successHandler(res, constants.EMP_CREATE_MSG);
    } catch (error) {
        return errorHandler(res, error)
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */

const employeeGet = async (req, res) => {
    try {
        const result = await employeeModel.find({}).select(constants.IGN_PASS);
        successHandler(res, constants.EMP_GET_MSG, result)
    } catch (error) {
        return errorHandler(res, error)
    }
}

const searchRecordEmployee = async (req, res) => {
    try {
        const { search = '' } = req.query
        const result = await employeeModel.find({
            $or: [
                { $or: [{ name: { $regex: `${ search }`, $options: 'i' } }] },
                { $or: [{ lastName: { $regex: `${ search }`, $options: 'i' } }] },
                { $or: [{ designation: { $regex: `${ search }`, $options: 'i' } }] },
                { $or: [{ email: { $regex: `${ search }`, $options: 'i' } }] },
                { $or: [{ status: { $regex: `${ search }`, $options: 'i' } }] }
            ]
        })
        successHandler(res, constants.EMP_SEARCH_MSG, result)
    } catch (error) {
        return errorHandler(res, error)
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */

const employeeUpdate = async (req, res) => {
    try {
        const id = req.params.id
        const empUpdate = await employeeModel.findByIdAndUpdate({ _id: id }, { $set: req.body }).select(constants.IGN_PASS)
        successHandler(res, constants.EMP_UPDATE_MSG, empUpdate)
    } catch (error) {
        return errorHandler(res, constants.error)
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */

const delEmployee = async (req, res) => {
    try {
        const id = req.params.id
        const empDel = await employeeModel.findByIdAndRemove({ _id: id })
        successHandler(res, constants.EMP_DEL_MSG, empDel)
    } catch (error) {
        return errorHandler(res, constants.error)
    }
}
module.exports = { employeeCreate, employeeGet, employeeUpdate, delEmployee, searchRecordEmployee }