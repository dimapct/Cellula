var Vector = (function () {
    function Vector(x, y) {
        this.x = x;
        this.y = y;
    }
    Vector.prototype.calculateUnitVector = function () {
        var magnitude = Math.sqrt((this.x * this.x) + (this.y * this.y));
        return new Vector(this.x / magnitude, this.y / magnitude);
    };
    Vector.prototype.product = function (vector) {
        return this.x * vector.x + this.y * vector.y;
    };
    Vector.prototype.length = function () {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    };
    return Vector;
})();
var Point = (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point;
})();
var Rect = (function () {
    function Rect(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
    }
    Object.defineProperty(Rect.prototype, "center", {
        get: function () { return new Point(this.x + this.width / 2, this.y + this.height / 2); },
        set: function (value) {
            this.center.x = value.x;
            this.center.y = value.y;
        },
        enumerable: true,
        configurable: true
    });
    return Rect;
})();
//# sourceMappingURL=utils.js.map