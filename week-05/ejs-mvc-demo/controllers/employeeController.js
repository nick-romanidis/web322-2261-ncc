const employeeUtil = require("../modules/employee-util");

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render("employee/employees", {
        employees: employeeUtil.getAllEmployees(),
        title: "Employee List"
    });
});

router.get('/visible', (req, res) => {
    res.render("employee/employees", {
        employees: employeeUtil.getVisibleEmployees(employeeUtil.getAllEmployees()),
        title: "Visible Employees Only"
    });
});

module.exports = router