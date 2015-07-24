class Food extends GameObject {
    energy: number;
    constructor(data: any) {
        super(data);
        this.energy = data.energy;
    }

    update(t: number, clientEventData) {
    }
} 