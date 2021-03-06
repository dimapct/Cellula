﻿class GameObjectFactory {
    builders: any[];

    constructor() {
        this.builders = [];
        this.generateBuilders();
    }

    createGameObject(gameObjectType, data) {
        return this.builders[gameObjectType](data);
    }

    generateBuilders() {
        var self = this;
        this.builders[GameObjectTypes.FOOD] = function (data: any) {
            var gameObject = new Food(data);
            gameObject.image = new createjs.Shape();
            var color = "pink";
            gameObject.image.graphics.beginFill(color).drawRect(0, 0, data.size, data.size);
            return gameObject;
        };
    }
} 