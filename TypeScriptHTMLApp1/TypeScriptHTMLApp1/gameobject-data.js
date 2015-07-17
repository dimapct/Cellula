var muscleData = (function () {
    function muscleData() {
        this.gameType = "MuscleCell";
    }
    return muscleData;
})();
var poisonData = (function () {
    function poisonData() {
        this.gameType = "PoisonCell";
    }
    return poisonData;
})();
var energyData = (function () {
    function energyData() {
        this.gameType = "EnergyCell";
    }
    return energyData;
})();
var coreData = (function () {
    function coreData() {
        this.gameType = "CoreCell";
    }
    return coreData;
})();
var playerData = (function () {
    function playerData() {
        this.gameType = "player";
        this.speed = 50;
        this.rotationSpeed = 50;
        this.position = new Point(100, 100);
    }
    return playerData;
})();
var npcData = (function () {
    function npcData() {
        this.gameType = "npc";
        this.speed = 10;
        this.rotationSpeed = 50;
        this.position = new Point(300, 200);
    }
    return npcData;
})();
//# sourceMappingURL=gameobject-data.js.map