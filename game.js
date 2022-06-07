import InputHandler from "./inputHandler.js";
import Ship from "./ship.js";
import Star from "./star.js";
import WaveHandler from "./waveHandler.js";

export default class Game {
    constructor(gameWidth, gameHeight){
        this.width = gameWidth;
        this.height = gameHeight;
        this.started = false;
    }

    playButton(){
        this.started = true;
    }

    start(){
        this.playBtn = document.getElementById("playBtn");
        this.playBtn.addEventListener("click", () => {
            this.started = true;
        });
        this.restartBtn = document.getElementById("restartBtn");
        this.restartBtn.addEventListener("click", () => {
        location.reload();
    });
        this.ship = new Ship(this.width, this.height);
        this.waveHandler = new WaveHandler(this.width, this.height);
        this.stars = new Array(50);
        for(let i = 0 ; i<this.stars.length; i++){
            this.stars[i] = new Star(this.width, this.height);
        }
        new InputHandler(this.ship);
    }

    update(deltaTime){
        if(this.started){
        this.ship.update(deltaTime);
        this.waveHandler.update(deltaTime, this.ship);
        }
        this.stars.forEach(s => s.update(deltaTime));
    }

    draw(ctx){
        this.stars.forEach(s => s.draw(ctx));
        if(this.started){
            this.stars.forEach((s) => {
                if(s.speed > 5){
                    s.speed -=.5;
                }
            })
            this.ship.draw(ctx);
            this.waveHandler.draw(ctx);
            if(this.ship.finished){
                ctx.font = "24px Arial";
                ctx.fillText(`Victory`, this.width/2-20, this.height/2-24);
                this.stars.forEach((s) =>{
                    if(s.speed < 100){
                        s.speed +=5;
                    }
                });
            }
        }
    }
}