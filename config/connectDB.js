const sqlite = require("sqlite3").verbose();
const dbName = './config/Employee_Data.db';

const db = new sqlite.Database(dbName, (err) => {
    if(err){
        console.log("Error opening DB: ", err.message);
    } else {
        console.log(`Connected to DB: ${dbName}`);

        db.serialize(() => {
            db.run(
                `CREATE TABLE IF NOT EXISTS Employees(
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    email TEXT NOT NULL UNIQUE,
                    position TEXT NOT NULL,
                    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
                )`, (err) => {
                    if (err) {
                        console.log("Error creating employees table:", err.message);
                    } else {
                        console.log("Employees table is ready");
                    }
                }
            )
            // drop table 
            // db.run("DROP TABLE IF EXISTS Employees", (err) => {
            //     if (err) {
            //         console.log("Error dropping table:", err.message);
            //     } else {
            //         console.log("Employees table dropped successfully");
            //     }
            // });
        })
    }
})

module.exports = db;