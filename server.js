const express = require("express");
const db = require("./config/connectDB");
const employeesRoutes = require("./routes/employeeRoutes");

const app = express();
const PORT = 8000;

app.use(express.json());

app.use('/api/employee', employeesRoutes);

app.listen(PORT, () => {
    console.log(`Server started at: ${PORT}`)
});