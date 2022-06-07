import Enemy2 from "./enemy2.js";
import Util from "./util.js";
import Enemy1 from "./enemy1.js";
import Enemy3 from "./enemy3.js";

export default class WaveHandler {
    constructor(gameWidth, gameHeight){
        this.score = 0;
        this.highScore = 0;
        this.width = gameWidth;
        this.height = gameHeight;
        this.util = new Util();
        this.index = 0;
        this.wave1enemies = [this.addRowOfEnemy1(1), this.addRowOfEnemy1(2), this.addRowOfEnemy1(3)];
        this.wave2enemies = [this.addRowOfEnemy1(2), this.addRowOfEnemy1(3), this.addRowOfEnemy2(1)];
        this.wave3enemies = [this.addRowOfEnemy1(2.5), this.addRowOfEnemy2(1), this.addRowOfEnemy2(2)];
        this.wave4enemies = [this.addRowOfEnemy1(3), this.addRowOfEnemy1(2.5), this.addRowOfEnemy2(1), this.addRowOfEnemy2(2)];
        this.wave5enemies = [this.addRowOfEnemy1(3), this.addRowOfEnemy1(2.5), this.addRowOfEnemy2(2) , this.addRowOfEnemy3(1)];
        this.waves = [this.wave1enemies, this.wave2enemies, this.wave3enemies, this.wave4enemies, this.wave5enemies];
        this.waveProgress = this.util.getBoolArr(5);
    }

    addPoint(){
        this.score++;
    }

    addRowOfEnemy1(j){
        let arr = [];
        for(let i = 0; i<8; i++){
            arr.push(new Enemy1(this.width, this.height, i+1, j));
        }
        return arr;
    }

    addRowOfEnemy3(j){
        let arr = [];
        for(let i = 0; i<3; i++){
            arr.push(new Enemy3(this.width, this.height, i, j));
        }
        return arr;
    }

    addRowOfEnemy2(j){
        let arr = [];
        for(let i = 0; i<5; i++){
            arr.push(new Enemy2(this.width,this.height, i, j));
        }
        return arr;
    }

    draw(ctx){
        this.waves.forEach((wave) => {wave.forEach((row) => {row.forEach((enemy) => {
            enemy.draw(ctx)
        })})});
        ctx.font = "24px Arial";
        ctx.fillText(`Score: ${this.score}`, 10, this.height - 45);
        ctx.fillText(`High Score: ${this.highScore}`, 10, this.height - 20);
    }

    update(dt, ship){
        if(this.index<5){
            this.waves[this.index].forEach((row) => {row.forEach((enemy) => {
                enemy.update(dt);
                if(this.util.checkHit(ship, enemy)){
                    enemy.hpLoss();
                    this.addPoint();
                    ship.bulletReset();
                    if(this.util.checkIfEnemiesAreDead(this.waves[this.index])){
                        this.index+=1;
                    }
                }
                if(this.util.checkDeath(ship, enemy)){
                    ship.killed();
                    if(this.highScore < this.score){this.highScore = this.score;}
                    enemy.bulletReset();
                }
            })})
        }
        else{
            ship.flyAway();
        }
    }
}