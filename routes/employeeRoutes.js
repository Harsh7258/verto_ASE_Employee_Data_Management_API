const express = require("express");
const { getAllEmployees, 
    getEmployee, 
    updateEmployee, 
    createEmployee, 
    deleteEmployee, 
    searchEmployee } = require("../controllers/employeeController");

const router = express.Router();

router.post('/create-employee', createEmployee);
router.get('/', getAllEmployees);
router.get('/search', searchEmployee);
router.route('/:id').get(getEmployee).put(updateEmployee).delete(deleteEmployee);

module.exports = router;