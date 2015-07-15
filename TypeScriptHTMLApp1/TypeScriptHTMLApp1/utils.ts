class Vector {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    static fromPoints(p1, p2): Vector {
        return new Vector(p2.x - p1.x, p2.y - p1.y);
    }

    calculateUnitVector(): Vector {
        var magnitude = Math.sqrt((this.x * this.x) + (this.y * this.y));

        return new Vector(this.x / magnitude, this.y / magnitude);
    }

    product(vector: Vector): number {
        return this.x * vector.x + this.y * vector.y;
    }

    length(): number {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }
}

class Point {
    x: number;
    y: number;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Rect extends createjs.Rectangle {
    constructor(x: number, y: number, w: number, h: number) {
        super (x, y, w, h);
    }

    get center(): Point { return new Point(this.x + this.width / 2, this.y + this.height / 2); }
    set center(value: Point) {
        this.center.x = value.x;
        this.center.y = value.y;
        this.x = value.x - this.width / 2;
        this.y = value.y - this.height / 2;
    }
}
