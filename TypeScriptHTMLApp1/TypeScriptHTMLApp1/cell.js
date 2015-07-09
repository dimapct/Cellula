var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var BaseCell = (function () {
    function BaseCell(data) {
    }
    return BaseCell;
})();
var EnergyCell = (function (_super) {
    __extends(EnergyCell, _super);
    function EnergyCell(data) {
        _super.call(this, data);
    }
    return EnergyCell;
})(BaseCell);
var MuscleCell = (function (_super) {
    __extends(MuscleCell, _super);
    function MuscleCell(data) {
        _super.call(this, data);
    }
    return MuscleCell;
})(BaseCell);
var PoisonCell = (function (_super) {
    __extends(PoisonCell, _super);
    function PoisonCell(data) {
        _super.call(this, data);
    }
    return PoisonCell;
})(BaseCell);
//# sourceMappingURL=cell.js.map