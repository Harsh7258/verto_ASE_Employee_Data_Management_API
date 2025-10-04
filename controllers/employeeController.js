// const data = require('../config/sample_data.json');
const expressAsyncHandler = require("express-async-handler");
const Employee = require("../models/employee.model");

// const data = []; // temporary storage testing

// @desc    retrieve all employees
// @route   GET /api/employee
// @access  Public

const getAllEmployees = expressAsyncHandler(async(req, res) => {
    const sort = req.query.sort || 'all';
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    Employee.getAllEmployee(sort, limit, offset, (err, emp, total) => {
        if(err){
            // return res.status(500).json({
            //     error: err.message
            // })
            return next(err)
        } 

        const totalPgs = Math.ceil(total / limit);

        res.status(200).json({
            status: "success",
            page: page,
            limit: limit,
            totalRows: total,
            totalPages: totalPgs,
            employees: emp,
        })
    })
})

// @desc    retrieve employee by id
// @route   GET /api/employee/:id
// @access  Public

const getEmployee = expressAsyncHandler(async (req, res, next) => {
    const { id } = req.params;
    // console.log(id);

    Employee.getEmployeeById(id, (err, emp) => {
        if(err){
            // return res.status(500).json({
            //     error: err.message
            // })
            return next(err)
        } 

        if(!emp){
            res.status(404).json({
                status: "not found"
            })
            return next(new Error("Employee not found"))
        }

        res.status(200).json({
            status: "success",
            employee: emp
        })
    })
})

// @desc    retrieve employee by search bar input filed
// @route   GET /api/employee/search
// @access  Public

const searchEmployee = expressAsyncHandler(async (req, res, next) => {
    const { query } = req.query;
    // console.log(query)

    if(!query){
        res.status(400).json({
            status: "bad request"
        });
        return next(new Error("Query parameter is required"));
    }

    Employee.searchEmployee(query, (err, emp) => {
        if(err){
            return next(err);
        }

        res.status(200).json({
            status: "success",
            employees: emp
        })
    })
})

// @desc    create employee and insert in SQLite
// @route   POST /api/employee/create-employe
// @access  Public

const createEmployee = expressAsyncHandler(async(req, res, next) => {
    // const employee = { // testing in temporary array
    //     id: data.length + 1,
    //     name: req.body.name,
    //     email: req.body.email,
    //     position: req.body.position
    // }

    // data.push(employee);
    // return res.status(201).json({
    //     message: "created!",
    //     employee
    // });

    Employee.createEmployee(req.body, (err, emp) => {
        if(err){
            // return res.status(500).json({
            //     error: err.message
            // })
            return next(err)
        }

        // console.log(emp);
        res.status(201).json({
            status: "success",
            employee: emp
        })
    })
})

// @desc    update employee
// @route   PUT /api/employee/:id
// @access  Public

const updateEmployee = expressAsyncHandler(async (req, res, next) => {
    const { id } = req.params;
    // console.log(id);

    Employee.updateEmployee(id, req.body, (err, chng) => {
        if(err){
            // return res.status(500).json({
            //     error: err.message
            // })
            return next(err)
        } 

        if(chng.changes === 0 || !id){
            res.status(404).json({
                status: "not found"
            })
            return next(new Error("Employee not found"))
        }

        res.status(200).json({
            status: "success",
            message: "Updated employee!"
        })
    })
})

// @desc    delete employee
// @route   DELETE /api/employee/:id
// @access  Public

const deleteEmployee = expressAsyncHandler(async(req, res, next) => {
    const { id } = req.params;
    // console.log(id);

    Employee.deleteEmployee(id, (err, chng) => {
        if(err){
            // return res.status(500).json({
            //     error: err.message
            // })
            return next(err);
        } 
        if(chng.changes === 0 || !id){
            res.status(404).json({
                status: "not found"
            })
            return next(new Error("Employee not found"))
        }

        res.status(200).json({
            status: "succes",
            message: "Deleted employee"
        })
    })
})

module.exports = { 
    getAllEmployees,
    getEmployee,
    createEmployee, 
    updateEmployee, 
    deleteEmployee,
    searchEmployee 
};