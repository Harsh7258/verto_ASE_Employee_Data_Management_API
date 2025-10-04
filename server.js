const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const db = require("./config/connectDB");

const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const employeesRoutes = require("./routes/employeeRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(helmet()); // security headers
app.use(cors());
app.use(rateLimit({ windowMs: 15*60*1000, max: 100 })); // 100 requests per 15 min

app.use('/api/employee', employeesRoutes);

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server started at: ${PORT}`)
});