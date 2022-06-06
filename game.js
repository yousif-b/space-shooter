import InputHandler from "./inputHandler.js";
import Ship from "./ship.js";
import Star from "./star.js";
import Util from "./util.js";
import WaveHandler from "./waveHandler.js";

export default class Game {
    constructor(gameWidth, gameHeight){
        this.width = gameWidth;
        this.height = gameHeight;
    }

    start(){
        this.util = new Util();
        this.ship = new Ship(this.width, this.height);
        this.waveHandler = new WaveHandler(this.width, this.height);
        this.stars = new Array(50);
        for(let i = 0 ; i<this.stars.length; i++){
            this.stars[i] = new Star(this.width, this.height);
        }
        new InputHandler(this.ship);
    }

    update(deltaTime){
        this.ship.update(deltaTime);
        this.waveHandler.update(deltaTime, this.ship);
        for(let i = 0 ; i<this.stars.length; i++){
            this.stars[i].update(deltaTime);
        }
    }

    draw(ctx){
        this.ship.draw(ctx);
        this.waveHandler.draw(ctx);
        this.stars.forEach(s => s.draw(ctx));
    }
}