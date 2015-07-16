class muscleData {
    gameType = "MuscleCell";
}

class poisonData {
    gameType = "PoisonCell";
}

class energyData {
    gameType = "EnergyCell";
}

class coreData {
    gameType = "CoreCell";
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