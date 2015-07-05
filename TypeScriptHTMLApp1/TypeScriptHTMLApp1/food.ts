class Food {
    gameType: string;
    energy: number;
    image: any;
    position: Point;
    constructor(data) {
        this.gameType = data.gameType;
        this.energy = data.energy;
        this.position = data.position;
        this.image = new createjs.Container();
    }

    update(t) {
    }
} 