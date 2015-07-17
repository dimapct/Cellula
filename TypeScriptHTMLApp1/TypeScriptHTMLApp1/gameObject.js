var GameObject = (function () {
    function GameObject(data) {
        this.gameType = data.gameType;
        this.gameRect = new Rect(0, 0, data.width, data.height);
        this.gameRect.center = data.position || new Point(0, 0);
        this.dir = data.dir || new Vector(0, 1);
        this.speed = data.speed || 0;
        this.image = new createjs.Container();
        this.image.zIndex = 1;
    }
    GameObject.prototype.update = function (t) {
        this.move(t);
    };
    GameObject.prototype.move = function (t) { };
    return GameObject;
})();
//# sourceMappingURL=gameObject.js.map