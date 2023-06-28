class Shape {
    constructor () {
        this.color ="";
    }

    setColor(colorVar) {
        this.color = colorVar;
    }
}

class Triangle extends Shape {
    render() {
        return `<polygon points="150, 30 240, 180 60, 180" fill="${this.color}" />`;
    }
}

class Circle extends Shape {
    render() {
        return `<circle cx="150" y="115" r="82" fill="${this.color}" />`;
    }
}

class Square extends Shape {
    render() {
        return `<rect x="75" y="40" width="150" height="150" fill="${this.color}" />`;
    }
}

module.exports = {Triangle, Circle, Square};