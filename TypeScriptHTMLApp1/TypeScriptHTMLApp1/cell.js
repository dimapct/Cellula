var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var BaseCell = (function () {
    function BaseCell(data) {
        this.gameType = data.gameType;
        this.gameRect = new Rect(0, 0, data.width, data.height);
        this.gameRect.center = data.position;
        this.dir = data.dir;
        this.speed = data.speed;
        this.image = new createjs.Container();
        this.image.zIndex = 1;
    }
    Object.defineProperty(BaseCell.prototype, "gameType", {
        get: function () {
            return this._gameType;
        },
        set: function (newGameType) {
            this._gameType = newGameType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseCell.prototype, "gameRect", {
        get: function () {
            return this._gameRect;
        },
        set: function (newGameRect) {
            this._gameRect = newGameRect;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseCell.prototype, "dir", {
        get: function () {
            return this._dir;
        },
        set: function (newDir) {
            if (newDir) {
                this._dir = newDir;
            }
            else {
                this._dir = new Vector(0, 1);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseCell.prototype, "speed", {
        get: function () {
            return this._speed;
        },
        set: function (newSpeed) {
            if (newSpeed) {
                this._speed = newSpeed;
            }
            else {
                this._speed = 0;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseCell.prototype, "image", {
        get: function () {
            return this._image;
        },
        set: function (newImage) {
            this._image = newImage;
        },
        enumerable: true,
        configurable: true
    });
    BaseCell.prototype.update = function (t) {
        console.log(343434);
        this.move(t);
    };
    BaseCell.prototype.move = function (t) {
        this.gameRect.center = new Point(this.gameRect.center.x + this.speed * t * this.dir.x, this.gameRect.center.y + this.speed * t * this.dir.y);
    };
    return BaseCell;
})();
var EnergyCell = (function (_super) {
    __extends(EnergyCell, _super);
    function EnergyCell(data) {
        _super.call(this, data);
    }
    return EnergyCell;
})(BaseCell);
//# sourceMappingURL=cell.js.map