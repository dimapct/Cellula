var baseData = (function () {
    function baseData() {
        this.gameType = "base";
        this.width = 20;
        this.height = 20;
        this.position = new Point(300, 50);
        this.speed = 4;
    }
    return baseData;
})();
var poisonData = (function () {
    function poisonData() {
        this.gameType = "poison";
        this.width = 40;
        this.height = 40;
        this.position = new Point(100, 300);
        this.speed = 3;
    }
    return poisonData;
})();
var energyData = (function () {
    function energyData() {
        this.gameType = "energy";
        this.width = 30;
        this.height = 30;
        this.position = new Point(400, 100);
        this.speed = 2;
    }
    return energyData;
})();
//# sourceMappingURL=cell-data.js.map