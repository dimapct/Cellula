var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Vector = (function () {
    function Vector(x, y) {
        this.x = x;
        this.y = y;
    }
    Vector.fromPoints = function (p1, p2) {
        return new Vector(p2.x - p1.x, p2.y - p1.y);
    };
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
    Point.prototype.equals = function (otherPoint) {
        return this.x === otherPoint.x && this.y === otherPoint.y;
    };
    return Point;
})();
var Rect = (function (_super) {
    __extends(Rect, _super);
    function Rect(x, y, w, h) {
        _super.call(this, x, y, w, h);
    }
    Object.defineProperty(Rect.prototype, "center", {
        get: function () { return new Point(this.x + this.width / 2, this.y + this.height / 2); },
        set: function (value) {
            this.center.x = value.x;
            this.center.y = value.y;
            this.x = value.x - this.width / 2;
            this.y = value.y - this.height / 2;
        },
        enumerable: true,
        configurable: true
    });
    return Rect;
})(createjs.Rectangle);
//# sourceMappingURL=utils.js.map