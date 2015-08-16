class BulletFactory {
    builders: any[];

    constructor() {
        this.builders = [];
        this.generateBuilders();
    }

    createBullet(bulletType, mechanicEngine, parentBeing, position, damageSize, damage) {
        return this.builders[bulletType](mechanicEngine, parentBeing, position, damageSize, damage);
    }

    generateBuilders() {
        this.builders[CellTypes.CORE] = function (mechanicEngine, parentBeing, position, damageSize, damage) {
            var bullet = new Bullet(mechanicEngine, parentBeing, position, damageSize, damage);
            return bullet;
        };

        this.builders[CellTypes.MUSCLE] = function (mechanicEngine, parentBeing, position, damageSize, damage) {
            var bullet = new Bullet(mechanicEngine, parentBeing, position, damageSize, damage);
            bullet.setWeapon(new MuscleWeapon());
            return bullet;
        };

        this.builders[CellTypes.ENERGY] = function (mechanicEngine, parentBeing, position, damageSize, damage) {
            var bullet = new Bullet(mechanicEngine, parentBeing, position, damageSize, damage);
            var weapon = new EnergyWeapon();
            bullet.setWeapon(weapon);
            return bullet;
        };

        this.builders[CellTypes.TOXIC] = function (mechanicEngine, parentBeing, position, damageSize, damage) {
            var bullet = new Bullet(mechanicEngine, parentBeing, position, damageSize, damage);
            bullet.setWeapon(new ToxicWeapon());
            return bullet;
        };
    }
}