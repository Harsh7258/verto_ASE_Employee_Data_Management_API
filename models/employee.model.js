const db = require("../config/connectDB");

// @desc retrieve all employees
// @ALL Employees

const getAllEmployee = (sort, limit, offset, cb) => {
    let order = "";
    if(sort === "asc"){
        order = "ORDER BY createdAt ASC"
    } else if(sort == "desc"){
        order = "ORDER BY createdAt DESC"
    }

    const sql = `
        SELECT * FROM Employees 
        ${order}
        LIMIT ? OFFSET ?
    `;
    const cntSql = `SELECT COUNT(*) AS count FROM Employees`;

    db.get(cntSql, [], (err, row) => {
        if(err){
            cb(err);
        }

        const totalRows = row.count;
        db.all(sql, [limit, offset], (err, emp) => {
            if(err){
                cb(err, null);
            } else {
                cb(null, emp, totalRows);
            }
        })
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

// @desc retrieve given employees by seraching 
// @GET Employee

const searchEmployee = (query, cb) => {
    const sql = `
        SELECT * FROM Employees 
        WHERE id LIKE ? OR name LIKE ? OR email LIKE ?
    `;
    const param = [`%${query}%`, `%${query}%`, `%${query}%`];

    db.all(sql, param, (err, rows) => {
        if(err){
            cb(err, null);
        } else {
            cb(null, rows);
        }
    })
}

// @desc creating data and inserting in table
// @RUN to insert Employees

const createEmployee = (emp, cb) => {
    const { name, email, position } = emp;
    const sql = `
        INSERT INTO Employees(name, email, position) 
        VALUES (?, ?, ?)
    `;
    
    db.run(sql, [name, email, position], function(err) { // function used for this
        if(err){
            cb(err, null);
        } else {
            // this.lastID gives inserted row ID
            db.get(`SELECT * FROM Employees WHERE id = ?`, [this.lastID], (err, row) => {
                // console.log(row);
                if (err) {
                    cb(err, null);
                } else {
                    cb(null, row);
                }
            });
        }
    })
}

// @desc updating the inserted data
// @RUN to update Employees

const updateEmployee = (id, emp, cb) => {
    const { name, email, position } = emp;
    const sql = `
        UPDATE Employees SET name = ?, email = ?, position = ? 
        WHERE id = ?
    `;
    
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
    deleteEmployee,
    searchEmployee
};