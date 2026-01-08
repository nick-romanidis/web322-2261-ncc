// Use the keyword let to create a variable 
// the keyword const to  create a constant variable 
// Both const and let does not hoist your variables to the top as like var

let number = 5;     // This creates a regular variable
const minWage = 50; // This creates a constant (i.e, the value cannot be changed after this line)

function sayWord() {
    console.log(word);
}

var word = "hello";

sayWord();

/*
    Variable Scope 

    1. Global Scope
    2. Function Scope (local variables)
    3. Block Scope(was only introduced in ES6)
*/
function square() {
    return number * number;
}

console.log(square())

function cube() {
    return number ** 3;
}

console.log(cube());


function test1() {
    // Function scope (local variable)
    let value = 25;
}

function test2() {
    // Can we access value here?
    return value + value;
}

function printMessage() {
    for (var i = 1; i <= 5; i++) {
        console.log("JavaScript is super cool!!!");
    }

    // Can i get accessed here?
    console.log(i);
}

printMessage();

function printMessage2() {
    for (let i = 1; i <= 5; i++) {
        console.log("JavaScript is super cool!!!");
    }

    // Can i get accessed here?
    console.log(i);
}

printMessage2();

function nullishCoalescing() {
    // Provide a default value only when the
    // left-hand side is null or undefined.

    const userInput = null;
    const defaultValue = "Anonymous";

    const username = userInput ?? defaultValue;

    // What is the output of username?
    console.log(username);
}

function orOperator() {
    // Provide a default value only when the
    // left-hand side is falsy.

    const userInput = "";
    const defaultValue = "Anonymous";

    const username = userInput || defaultValue;

    // What is the output of username?
    console.log(username);
}

function optionalChaining() {
    // Safely access deeply nested properties or methods
    // without having to check each level for null or undefined

    const user = {
        name: "Alice",
        address: {
            city: "Toronto"
        }
    };

    // What is the output here?
    console.log(user?.address?.city);

    // What is the output here?
    console.log(user?.contact?.email)
}