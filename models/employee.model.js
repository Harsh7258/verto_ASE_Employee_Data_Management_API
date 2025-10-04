const db = require("../config/connectDB");

// @desc retrieve all employees
// @ALL Employees

const getAllEmployee = (cb) => {
    const sql = `SELECT * FROM Employees`;
    db.all(sql, [], (err, rows) => {
        if(err){
            cb(err, null);
        } else {
            cb(null, rows);
        }
    })
}

// @desc retrieve given employees by ID
// @GET Employee

const getEmployeeById = (id, cb) => {
    const sql = `SELECT * FROM Employees WHERE id = ?`;
    db.get(sql, [id], (err, row) => {
        if(err){
            cb(err, null);
        } else {
            cb(null, row);
        }
    })
}

// @desc creating data and inserting in table
// @RUN to insert Employees

const createEmployee = (emp, cb) => {
    const { name, email, position } = emp;
    const sql = `INSERT INTO Employees(name, email, position) VALUES (?, ?, ?)`;
    
    db.run(sql, [name, email, position], function(err) { // function used for this
        if(err){
            cb(err, null);
        } else {
            // this.lastID gives inserted row ID
            cb(null, {id: this.lastID, ...emp});
        }
    })
}

// @desc updating the inserted data
// @RUN to update Employees

const updateEmployee = (id, emp, cb) => {
    const { name, email, position } = emp;
    const sql = `UPDATE Employees SET name = ?, email = ?, position = ? WHERE id = ?`;
    
    db.run(sql, [name, email, position, id], function(err) { // function used for this
        if(err){
            cb(err, null);
        } else {
            // changed data in row
            cb(null, {changes: this.changes});
        }
    })
}

// @desc deleting the inserted employee data
// @RUN to delete Employees

const deleteEmployee = (id, cb) => {
    const sql = `DELETE FROM Employees WHERE id = ?`;
    
    db.run(sql, [id], function(err) { // function used for this
        if(err){
            cb(err, null);
        } else {
            // changed data in row
            cb(null, {changes: this.changes});
        }
    })
}

module.exports = {
    getAllEmployee, 
    getEmployeeById, 
    createEmployee, 
    updateEmployee, 
    deleteEmployee
};