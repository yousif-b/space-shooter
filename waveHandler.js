import Enemy from "./enemy.js";
import MediumEnemy from "./mediumEnemy.js";
import LargeEnemy from "./largeEnemy.js";
import Util from "./util.js";

export default class WaveHandler {
    constructor(gameWidth, gameHeight){
        this.width = gameWidth;
        this.height = gameHeight;
        this.util = new Util();
        this.wave1 = false;
        this.wave2 = false;
        this.wave3 = false;
        this.wave1enemies = [this.addRowOfEnemies(1), this.addRowOfEnemies(2), this.addRowOfEnemies(3)];
        this.wave2enemies = [this.addRowOfEnemies(3), this.addRowOfEnemies(2), this.addRowOfMedEnemies(1)];
        this.wave3enemies = [this.addRowOfEnemies(3), this.addRowOfEnemies(2), this.addRowOfMedEnemies(2), [new LargeEnemy(this.width, this.height)]]
    }

    addRowOfEnemies(j){
        let arr = [];
        for(let i = 0; i<8; i++){
            arr.push(new Enemy(this.width, this.height, i+1, j));
        }
        return arr;
    }

    addRowOfMedEnemies(j){
        let arr = [];
        for(let i = 0; i<3; i++){
            arr.push(new MediumEnemy(this.width, this.height, i, j));
        }
        return arr;
    }

    draw(ctx){
        this.wave1enemies.forEach((e) => {e.forEach(m => m.draw(ctx))});
        this.wave2enemies.forEach((e) => {e.forEach(m => m.draw(ctx))});
        this.wave3enemies.forEach((e) => {e.forEach(m => m.draw(ctx))});
    }

    update(dt, ship){
        if(this.wave1 == false){
            this.wave1enemies.forEach((e) => {e.forEach((m) => {
                m.update(dt);
                if(this.util.checkHit(ship, m)){
                    m.killed();
                    ship.bulletReset();
                    if(this.util.checkIfEnemiesAreDead(this.wave1enemies)){
                        this.wave1 = true;
                    }
                }
                if(this.util.checkDeath(ship, m)){
                    ship.killed();
                    m.bulletReset();
                }
            })});
        }

        if(this.wave1 == true && this.wave2 == false){
            this.wave2enemies.forEach((e) => {e.forEach((m) => {
                m.update(dt);
                if(this.util.checkHit(ship, m)){
                    if(m.id == "enemy"){
                        m.killed();
                    }
                    if(m.id == "medEnemy"){
                        m.hpLoss();
                    }
                    ship.bulletReset();
                }
                if(this.util.checkDeath(ship, m)){
                    ship.killed();
                    m.bulletReset();
                }
            })});
        }

        if(this.wave2 == true && this.wave3 == false){
            this.wave3enemies.forEach((e) => {e.forEach((m => {
                m.update(dt);
                if(this.util.checkHit(ship, m)){
                    if(m.id == "enemy"){
                        m.killed();
                    }
                    if(m.id == "medEnemy" || m.id == "largeEnemy"){
                        m.hpLoss();
                    }
                    ship.bulletReset();
                }
                if(this.util.checkDeath(ship, m)){
                    ship.killed();
                    m.bulletReset();
                }
            }))})
        }
    }
}