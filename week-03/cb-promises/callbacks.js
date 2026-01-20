function connectToDatabase(callBackFunction, query) {
  let randomTime = Math.floor(Math.random() * 2000) + 1;

  setTimeout(() => {
    console.log('Connection Established');
    callBackFunction(query);
  }, randomTime);
}

function queryData(query) {
  let randomTime = Math.floor(Math.random() * 1000) + 1;

  setTimeout(() => {
    console.log('Query Complete: ' + query);
  }, randomTime);
}

connectToDatabase(queryData, "SELECT * FROM employees");