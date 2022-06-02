import InputHandler from "./inputHandler.js";
import Ship from "./ship.js";
import Star from "./star.js";
import Enemy from "./enemy.js";

export default class Game {
    constructor(gameWidth, gameHeight){
        this.width = gameWidth;
        this.height = gameHeight;
        this.wave1 = false;
    }

    checkIfEnemiesAreDead(enemies){
        let count = 0;
        for(let i = 0; i<enemies.length; i++){
            if(enemies[i].checkIfKilled()){
                count++;
            }
        }
        if(count == enemies.length){
            return true;
        }
        else{return false;}
    }

    checkHit(bulletP, enemyP){
        let bX = bulletP.x;
        let bY = bulletP.y;
        let eX = enemyP.x;
        let eY = enemyP.y;
        if(bX > eX && bX < eX+32){
            if(bY > eY && bY < eY+32){
                return true;
            }
        }
        else{
            return false;
        }
    }

    start(){
        this.ship = new Ship(this.width, this.height);
        this.enemies = [];
        for(let i = 0; i<3; i++){
            for(let j = 0; j<8;j++){
                this.enemies.push(new Enemy(this.width, this.height, j+1, i+1));
            }
        }
        this.stars = new Array(50);
        for(let i = 0 ; i<this.stars.length; i++){
            this.stars[i] = new Star(this.width, this.height);
        }
        new InputHandler(this.ship);
    }

    update(deltaTime){
        this.ship.update(deltaTime);
        if(this.wave1 == false){
            for(let i = 0; i<this.enemies.length; i++){
                this.enemies[i].update(deltaTime);
                if(this.checkHit(this.ship.getBulletPosition(), this.enemies[i].getPosition())){
                    this.enemies[i].killed();
                    this.ship.bulletReset();
    
                    if(this.checkIfEnemiesAreDead(this.enemies)){
                        this.wave1 = true;
                    }
                }
            }
        }

        if(this.wave1 == true){
        }

        for(let i = 0 ; i<this.stars.length; i++){
            this.stars[i].update(deltaTime);
        }
    }

    draw(ctx){
        this.ship.draw(ctx);
        for(let i = 0; i<this.enemies.length; i++){
            this.enemies[i].draw(ctx);
        }
        for(let i = 0 ; i<this.stars.length; i++){
            this.stars[i].draw(ctx);
        }
    }
}