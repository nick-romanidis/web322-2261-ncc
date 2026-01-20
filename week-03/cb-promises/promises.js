function connectToDatabase() {
    let randomTime = Math.floor(Math.random() * 2000) + 1;

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Connection Attempted');
            randomTime % 2 ? resolve("data") : reject("oops");
        }, randomTime);
    });
}

function queryData(query) {
    let randomTime = Math.floor(Math.random() * 1000) + 1;

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Query Complete: ' + query);
            randomTime % 2 ? resolve("data") : reject("oops");
        }, randomTime);
    });
}

// connectToDatabase()
//     .then(() => {
//         console.log("Connected to database");

//         return queryData("SELECT * FROM employees")
//     })
//     .then(() => {
//         console.log("Done the query");
//     });

// connectToDatabase()
//     .then((data) => {
//         console.log("Connected to database: " + data);

//         queryData("SELECT * FROM employees")
//             .then((data) => {
//                 console.log("Done the query: " + data);
//             })
//             .catch((err) => {
//                 console.log("Failed to query database: " + err);
//             });
//     })
//     .catch((err) => {
//         console.log("Failed connect to database: " + err);
//     });

async function performDatabaseOperations() {
    try {
        await connectToDatabase();
        await queryData("SELECT * FROM users");
    }
    catch (err) {
        console.log("Operation failed: " + err);
    }
}

performDatabaseOperations();