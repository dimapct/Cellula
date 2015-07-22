var coreData = (function () {
    function coreData() {
        this.gameType = "CoreCell";
    }
    return coreData;
})();
var energyData = (function () {
    function energyData() {
        this.gameType = "EnergyCell";
    }
    return energyData;
})();
var muscleData = (function () {
    function muscleData() {
        this.gameType = "MuscleCell";
    }
    return muscleData;
})();
var toxicData = (function () {
    function toxicData() {
        this.gameType = "ToxicCell";
    }
    return toxicData;
})();
var fatData = (function () {
    function fatData() {
        this.gameType = "FatCell";
    }
    return fatData;
})();
var receptorData = (function () {
    function receptorData() {
        this.gameType = "ReceptorCell";
    }
    return receptorData;
})();
var boneData = (function () {
    function boneData() {
        this.gameType = "BoneCell";
    }
    return boneData;
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
var foodData = (function () {
    function foodData() {
        this.gameType = "food";
        this.position = new Point(200, 150);
    }
    return foodData;
})();
//# sourceMappingURL=gameobject-data.js.map