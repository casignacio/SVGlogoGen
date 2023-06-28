const {Triangle, Circle, Square} = require("./shapes.js");

describe("Triangle test", () => {
    test("test for a triangle with a white background", () => {
        const shape = new Triangle();
        shape.setColor("white");
        expect(shape.render()).toEqual(
            '<polygon points="150, 30 240, 180 60, 180" fill="white" />'
        );
    });
});

describe("Circle test", () => {
    test("test for a circle with a red background", () => {
        const shape = new Circle();
        shape.setColor("red");
        expect(shape.render()).toEqual(
            '<circle cx="150" y="115" r="82" fill="red" />'
        );
    });
});

describe("Square test", () => {
    test("test for a square with a black background", () => {
        const shape = new Square();
        shape.setColor("black");
        expect(shape.render()).toEqual(
            '<rect x="75" y="40" width="150" height="150" fill="black" />'
        );
    });
});