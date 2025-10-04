const express = require("express");
const { getAllEmployees, 
    getEmployee, 
    updateEmployee, 
    createEmployee, 
    deleteEmployee } = require("../controllers/employeeController");

const router = express.Router();

router.get('/', getAllEmployees);
router.post('/create-employee', createEmployee);
router.route('/:id').get(getEmployee).put(updateEmployee).delete(deleteEmployee);

module.exports = router;