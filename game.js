import InputHandler from "./inputHandler.js";
import Ship from "./ship.js";
import Star from "./star.js";
import Enemy from "./enemy.js";
import MediumEnemy from "./mediumEnemy.js";

export default class Game {
    constructor(gameWidth, gameHeight){
        this.width = gameWidth;
        this.height = gameHeight;
    }

    checkIfEnemiesAreDead(wave){
        let count = 0;
        let counting = 0;
        for(let i = 0; i<wave.length;i++){
            count +=wave[i].length;
            for(let j = 0; j<wave[i].length;j++){
                if(wave[i][j].checkIfKilled()){
                    counting++;
                }
            }
        }
        if(count == counting){
            return true;
        }
        else{return false;}
    }

    checkHit(ship, enemy){
        let enemyWidth = enemy.size;
        let bulletP = ship.getBulletPosition();
        let enemyP = enemy.position;
        if(bulletP.x > enemyP.x && bulletP.x < enemyP.x + enemyWidth){
            if(bulletP.y > enemyP.y && bulletP.y < enemyP.y + enemyWidth){
                return true;
            }
            else{
                return false;
            }
        }
    }

    addRowOfEnemies(j){
        let arr = [];
        for(let i = 0; i<8; i++){
            arr.push(new Enemy(this.width, this.height, i+1, j))
        }
        return arr;
    }

    addRowOfMedEnemies(j){
        let arr = [];
        for(let i = 0; i<3; i++){
            arr.push(new MediumEnemy(this.width, this.height, i, j))
        }
        return arr;
    }

    start(){
        this.wave1 = true;
        this.wave2 = false;
        this.wave3 = false;
        this.ship = new Ship(this.width, this.height);
        this.wave1enemies = [this.addRowOfEnemies(1), this.addRowOfEnemies(2), this.addRowOfEnemies(3)];
        this.wave2enemies = [this.addRowOfEnemies(3), this.addRowOfEnemies(2), this.addRowOfMedEnemies(1)];
        this.stars = new Array(50);
        for(let i = 0 ; i<this.stars.length; i++){
            this.stars[i] = new Star(this.width, this.height);
        }
        new InputHandler(this.ship);
    }

    update(deltaTime){
        this.ship.update(deltaTime);
        if(this.wave1 == false){
            this.wave1enemies.forEach((e) => {e.forEach((m) => {
                m.update(deltaTime);
                if(this.checkHit(this.ship, m)){
                    m.killed();
                    this.ship.bulletReset();
                    if(this.checkIfEnemiesAreDead(this.wave1enemies)){
                        this.wave1 = true;
                    }
                }
            })});
        }

        if(this.wave1 == true && this.wave2 == false){
            this.wave2enemies.forEach((e) => {e.forEach((m) => {
                m.update(deltaTime);
                if(this.checkHit(this.ship, m)){
                    m.killed();
                    this.ship.bulletReset();
                }
            })});
        }

        if(this.wave2 == true && this.wave3 == false){
        }

        for(let i = 0 ; i<this.stars.length; i++){
            this.stars[i].update(deltaTime);
        }
    }

    draw(ctx){
        this.ship.draw(ctx);
        this.stars.forEach(s => s.draw(ctx));
        this.wave1enemies.forEach((e) => {e.forEach(m => m.draw(ctx))});
        this.wave2enemies.forEach((e) => {e.forEach(m => m.draw(ctx))});
    }
}