import Ship from "./ship.js";

export default class Game {
    constructor(gameWidth, gameHeight){
        this.width = gameWidth;
        this.height = gameHeight;
    }

    start(){
        this.ship = new Ship(this.width, this.height);
    }

    update(deltaTime){
        this.ship.update(deltaTime);
    }

    draw(ctx){
        this.ship.draw(ctx);
    }
}