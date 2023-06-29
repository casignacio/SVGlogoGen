const fs = require("fs");
const inquirer= require("inquirer");
const {Triangle, Circle, Square} = require("./lib/shapes.js");

// function used to generate .svg file
function writeToFile(fileName, answers) {
    let svgString = "";
    // Initializes an empty string variable called svgString.
    svgString = '<svg version="1.1" xlmns="http://w3.or/2000/svg" width="300" height="200">';
    // Appends an opening <svg> tag to the svgString. 
    svgString += "<g>";
    // Appends an opening <g> tag to the svgString. The <g> tag is used to group SVG elements together.
    svgString += `${answers.shape}`;
    // Appends the value of answers.shape to the svgString.

    let shape;
    if (answers.shape === "Triangle") {
        shape = new Triangle();
        svgString += `<polygon points="150, 30 240, 180 60, 180" fill="${answers.shapeColor}"/>`;
    } else if (answers.shape === "Circle") {
        shape = new Circle();
        svgString += `<circle cx="150" cy="115" r="82" fill="${answers.shapeColor}"/>`;
    } else {
        shape = new Square();
        svgString += `<rect x="75" y="40" width="150" height="150" fill="${answers.shapeColor}"/>`;
    }
    // creates shape object depending on the shape selected.

    svgString += `<text x="150" y="130" font-size="45" text-anchor="middle" fill="${answers.textColor}">${answers.text}</text>`;
    // Appends a text element with the specified position (x, y), font-size, text-anchor, text color, and text content to the svgString.
    svgString += "</g>";
    // Appends the closing </g> tag to the svgString.
    svgString += "</svg>";
    // Appends the closing </svg> tag to the svgString.

    fs.writeFile(fileName, svgString, (err) => {
        err ? console.log(err) : console.log("logo.svg has been generated!");
    });
    // Writes the svgString to the specified fileName. Prints an error message if there's an error, or a success message if the file is written successfully.
}

// prompts users for input in command line
function promptUser() {
    inquirer.prompt([
    //prompts users for inputs to generate logo
            {
                type: "input",
                message: "Enter text for logo (3 characters max)",
                name:"text",
            },
            {
                type: "input",
                message: "What color would you like your text to be? (enter keyword OR hexadecimal number)",
                name:"textColor",
            },
            {
                type: "input",
                message: "Choose a background color! (enter keyword OR hexadecimal number)",
                name:"shapeColor",
            },
            {
                type: "list",
                message: "Choose a shape!",
                choices: ["Triangle", "Circle", "Square"],
                name:"shape",
            },

        ])
        .then((answers) => {
            // creates prompt if input is longer than allowed
            if (answers.text.length > 3) {
                console.log("Text entered must be no more than 3 characters");
                promptUser();
            // if the character prompt is satisfied, logo is generated
            } else {
                writeToFile("logo.svg", answers);
            }
        });
}

promptUser();
