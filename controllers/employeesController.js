const Employee = require('../model/Employee');

const getAllEmployees = async (req, res) => {
    const result = await Employee.find();
    res.json(result);
}

const createNewEmployee = async (req, res) => {
    if (!req?.body?.firstname || !req?.body?.lastname) {
        return res.status(400).json({ 'message': 'First and last name are required' });
    }

    try {
        const result = await Employee.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname
        });
    
        res.status(201).json(result);    
    } catch (error) {
        console.error(error);
    }
}

const updateEmployee = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': `Employee ID is required`});
    }
    const employee = await Employee.findOne({ _id: req.body.id }).exec();
    if (!employee) {
        return res.status(400).json({ 'message': `Employee ID ${req.body.id} not found`});
    }

    if (req?.body?.firstname) employee.firstname = req.body.firstname;
    if (req?.body?.lastname) employee.lastname = req.body.lastname;

    const result = await employee.save();
    res.status(200).json(employee);
}

const deleteEmployee = async (req, res) => {
    const employee = await Employee.findOne({ _id: req.body.id }).exec();
    if (!employee) {
        return res.status(400).json({'message': `Employee ID ${req.body.id} not found`});
    }

    const result = await Employee.deleteOne({ _id: req.body.id });
    res.json(result);
}

const getEmployee = async (req, res) => {
    const employee = await Employee.findOne({ _id: req.params.id }).exec();
    if (!employee) {
        return res.status(404).json({ 'message': `Employee ID ${req.params.id} not found`});
    }

    res.json(employee);
}

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}