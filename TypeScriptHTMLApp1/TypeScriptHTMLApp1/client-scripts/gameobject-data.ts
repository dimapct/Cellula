class BaseCellData {
    size: number = 30;  // circle radius = size / 2
    emptyCell: EmptyCell = new EmptyCell(new Object());
    hp: number;
    gameType: number;
    coreDamageRadius: number;
    muscleResistance: number;
    energyResistance: number;
    toxicResistance: number;
}

class CoreData extends BaseCellData{
    gameType = CellTypes["CORE"];
    damage = 20;
    hp = 100000;
    muscleResistance = 20;
    energyResistance = 20;
    toxicResistance = 20;
}
class MuscleData extends BaseCellData{
    gameType = CellTypes["MUSCLE"];
    damage = 50;
    hp = 400;
    muscleResistance = 40;
    energyResistance = 20;
    toxicResistance = 30;
}
class EnergyData extends BaseCellData{
    gameType = CellTypes["ENERGY"];
    damage = 100;
    hp = 50;
    muscleResistance = 20;
    energyResistance = 2000;
    toxicResistance = 20;
}
class ToxicData extends BaseCellData{
    gameType = CellTypes["TOXIC"];
    damage = 5;
    hp = 50;
    muscleResistance = 30;
    energyResistance = 80;
    toxicResistance = 2000;
}
class FatData extends BaseCellData{
    gameType = CellTypes["FAT"];
    hp = 1000;
    muscleResistance = 100;
    energyResistance = 50;
    toxicResistance = 80;
}
class ReceptorData extends BaseCellData{
    gameType = CellTypes["RECEPTOR"];
    hp = 10;
    muscleResistance = 2;
    energyResistance = 35;
    toxicResistance = 20;
}
class BoneData extends BaseCellData{
    gameType = CellTypes["BONE"];
    hp = 5000;
    muscleResistance = 250;
    energyResistance = 200;
    toxicResistance = 300;
}
class FakeData extends BaseCellData {
    gameType = ServiceObjects["FAKECELL"];
}


class PlayerData {
    gameType = "player";
    speed = 90;
    rotationSpeed = 50;
    position = new Point(500, 400);
    canvasPosition: Point;
}

class NPCData {
    gameType = "npc";
    speed = 20;
    rotationSpeed = 50;
    position = new Point(300, 200);
}

class FoodData {
    gameType = "food";
    size: number = 100;
    position = new Point(200, 150);
}

var CellDataTypes = [new CoreData(),
    new MuscleData(),
    new EnergyData(),
    new ToxicData(),
    new FatData(),
    new ReceptorData(),
    new BoneData()];