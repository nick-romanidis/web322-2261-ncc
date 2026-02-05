var employees = [
    {
        name: "John",
        age: 23,
        occupation: "Developer",
        company: "Scotiabank",
        visible: true,
        imageUrl: "man1.jpg"
    },
    {
        name: 'Frank',
        age: 40,
        occupation: 'Manager',
        company: 'RBC',
        visible: false,
        imageUrl: "man3.jpg"
    },
    {
        name: 'Jane',
        age: 23,
        occupation: 'Manager',
        company: 'RBC',
        visible: true,
        imageUrl: "woman1.jpg"
    }
];

module.exports.getAllEmployees = function () {
    return employees;
}

module.exports.getVisibleEmployees = function (emp) {
    let filtered = [];

    for (let i = 0; i < emp.length; i++) {
        if (emp[i].visible) {
            filtered.push(emp[i]);
        }
    }

    return filtered;
}