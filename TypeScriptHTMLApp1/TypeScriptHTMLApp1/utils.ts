class Vector {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
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

class Rect {
    private x: number;
    private y: number;
    private width: number;
    private height: number;

    constructor(x: number, y: number, w: number, h: number) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
    }

    get center(): Point { return new Point(this.x + this.width / 2, this.y + this.height / 2); }
    set center(value: Point) {
        this.center.x = value.x;
        this.center.y = value.y;
        this.x = value.x - this.width / 2;
        this.y = value.y - this.height / 2;
    }
}
