var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var BaseCell = (function (_super) {
    __extends(BaseCell, _super);
    function BaseCell(data) {
        _super.call(this, data);
    }
    BaseCell.prototype.move = function (t) {
        this.gameRect.center = new Point(this.gameRect.center.x + this.speed * t * this.dir.x, this.gameRect.center.y + this.speed * t * this.dir.y);
    };
    return BaseCell;
})(GameObject);
var EnergyCell = (function (_super) {
    __extends(EnergyCell, _super);
    function EnergyCell(data) {
        _super.call(this, data);
    }
    return EnergyCell;
})(BaseCell);
//# sourceMappingURL=cell.js.map