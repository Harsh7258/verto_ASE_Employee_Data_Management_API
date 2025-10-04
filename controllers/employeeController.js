// const data = require('../config/sample_data.json');
const expressAsyncHandler = require("express-async-handler");
const Employee = require("../models/employee.model");

// const data = []; // temporary storage testing

const getAllEmployees = expressAsyncHandler(async(req, res) => {
    Employee.getAllEmployee((err, emp) => {
        if(err){
            // return res.status(500).json({
            //     error: err.message
            // })
            return next(err)
        } 

        res.status(200).json({
            status: "success",
            employees: emp
        })
    })
})

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

        res.status(201).json({
            status: "success",
            employee: emp
        })
    })
})

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
    deleteEmployee 
};