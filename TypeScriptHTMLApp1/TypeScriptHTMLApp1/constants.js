var CellTypes;
(function (CellTypes) {
    CellTypes[CellTypes["CORE"] = 0] = "CORE";
    CellTypes[CellTypes["MUSCLE"] = 1] = "MUSCLE";
    CellTypes[CellTypes["ENERGY"] = 2] = "ENERGY";
    CellTypes[CellTypes["TOXIC"] = 3] = "TOXIC";
    CellTypes[CellTypes["FAT"] = 4] = "FAT";
    CellTypes[CellTypes["RECEPTOR"] = 5] = "RECEPTOR";
    CellTypes[CellTypes["BONE"] = 6] = "BONE";
})(CellTypes || (CellTypes = {}));
;
var BeingTypes;
(function (BeingTypes) {
    BeingTypes[BeingTypes["PLAYER"] = 0] = "PLAYER";
    BeingTypes[BeingTypes["NPC"] = 1] = "NPC";
})(BeingTypes || (BeingTypes = {}));
;
var GameObjectTypes;
(function (GameObjectTypes) {
    GameObjectTypes[GameObjectTypes["FOOD"] = 0] = "FOOD";
})(GameObjectTypes || (GameObjectTypes = {}));
;
var cellSize = 50;
//# sourceMappingURL=constants.js.map