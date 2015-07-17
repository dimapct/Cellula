var GameObject = (function () {
    function GameObject(data) {
        this.gameType = data.gameType;
        this.gameRect = new Rect(0, 0, 1, 1);
        this.gameRect.center = data.position || new Point(0, 0);
        this.dir = data.dir || new Vector(0, 1);
        this.speed = data.speed || 0;
        this.image = new createjs.Container();
        this.rotationSpeed = data.rotationSpeed || 0;
    }
    return GameObject;
})();
//# sourceMappingURL=game-object.js.map