class coreData {
    gameType = CellTypes["CORE"];
}

class energyData {
    gameType = CellTypes["ENERGY"];
}

class muscleData {
    gameType = CellTypes["MUSCLE"];
}

class toxicData {
    gameType = CellTypes["TOXIC"];
}

class fatData {
    gameType = CellTypes["FAT"];
}

class receptorData {
    gameType = CellTypes["RECEPTOR"];
}

class boneData {
    gameType = CellTypes["BONE"];
}

class playerData {
    gameType = "player";
    speed = 90;
    rotationSpeed = 50;
    position = new Point(100, 100);
    //canvas = document.getElementById("gameCanvas")
    //canvasPosition = new Point($(this.canvas).width() / 2, $(this.canvas).height() / 2);
    canvasPosition: Point;
}

class npcData {
    gameType = "npc";
    speed = 20;
    rotationSpeed = 50;
    position = new Point(300, 200);
}

class foodData {
    gameType = "food";
    position = new Point(200, 150);
}