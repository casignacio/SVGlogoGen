const fs = require("fs");
const inquirer= require("inquirer");
const {Triangle, Circle, Square} = require("./lib/shapes.js");

function writeToFile(fileName, answers) {
    let svgString = "";
    svgString = '<svg version="1.1" xlmns="http://w3.or/2000/svg" width="300" height="200">';
    svgString += "<g>";
    svgString += `${answers.shape}`;

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

    svgString += `<text x="150" y="130" font-size="45" text-anchor="middle" fill="${answers.textColor}">${answers.text}</text>`;
    svgString += "</g>";
    svgString += "</svg>";

    fs.writeFile(fileName, svgString, (err) => {
        err ? console.log(err) : console.log("logo.svg has been generated!");
    });
}

function promptUser() {
    inquirer.prompt([
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
            if (answers.text.length > 3) {
                console.log("Text entered must be no more than 3 characters");
                promptUser();
            } else {
                writeToFile("logo.svg", answers);
            }
        });
}

promptUser();
