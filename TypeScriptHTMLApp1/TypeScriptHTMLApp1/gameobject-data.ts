class coreData {
    gameType = "CoreCell";
}

class energyData {
    gameType = "EnergyCell";
}

class muscleData {
    gameType = "MuscleCell";
}

class toxicData {
    gameType = "ToxicCell";
}

class fatData {
    gameType = "FatCell";
}

class receptorData {
    gameType = "ReceptorCell";
}

class boneData {
    gameType = "BoneCell";
}

class playerData {
    gameType = "player";
    speed = 50;
    rotationSpeed = 50;
    position = new Point(100, 100);
    //canvas = document.getElementById("gameCanvas")
    //canvasPosition = new Point($(this.canvas).width() / 2, $(this.canvas).height() / 2);
    canvasPosition: Point;
}

class npcData {
    gameType = "npc";
    speed = 10;
    rotationSpeed = 50;
    position = new Point(300, 200);
}

class foodData {
    gameType = "food";
    position = new Point(200, 150);
}