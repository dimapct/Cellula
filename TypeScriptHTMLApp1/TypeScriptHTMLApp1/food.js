var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Food = (function (_super) {
    __extends(Food, _super);
    function Food(data) {
        _super.call(this, data);
        this.energy = data.energy;
    }
    Food.prototype.update = function (t, clientEventData) {
    };
    return Food;
})(GameObject);
//# sourceMappingURL=food.js.map