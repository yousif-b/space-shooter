import Projectile from "./projectile.js";

export default class Enemy2{
    constructor(gameWidth, gameHeight, rIndex, cIndex){
        this.id = "enemy2";
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.rIndex = rIndex;
        this.cIndex = cIndex;
        this.speed = 0;
        this.size = 64;
        this.hp = 3;
        this.isKilled = false;
        this.position = {
            x: this.rIndex*(this.gameWidth/7) + this.gameWidth/7,
            y: this.cIndex*(this.gameHeight/10 - 155)
        }
        this.projectile = new Projectile(this.gameWidth, this.gameHeight, this.position.x, this.position.y, true);
        this.projectile1 = new Projectile(this.gameWidth, this.gameHeight, this.position.x+33, this.position.y, true);
        this.projectile2 = new Projectile(this.gameWidth, this.gameHeight, this.position.x+66, this.position.y, true);
    }
    
    getSize(){
        return this.size;
    }

    getBulletPosition(){
        return this.projectile.getPosition();
    }
    
    bulletReset(){
        this.projectile.bulletReset(this.position.x, this.position.y);
        this.projectile1.bulletReset(this.position.x, this.position.y);
        this.projectile2.bulletReset(this.position.x, this.position.y);
    }

    hpLoss(){
        if(this.hp > 1){
            this.hp-=1;
        }
        else{
            this.killed();
        }
    }

    killed(){
        this.position.x = 1000;
        this.position.y = 1000;
        this.isKilled = true;
        this.bulletReset();
    }

    checkIfKilled(){
        return this.isKilled;
    }

    draw(ctx){
        ctx.fillStyle = 'white';
        ctx.fillRect(this.position.x, this.position.y, this.size, this.size);
        this.projectile.draw(ctx);
        this.projectile1.draw(ctx);
        this.projectile2.draw(ctx);
    }

    randomNum(){
        return (Math.random()*100)
    }

    update(dt){
        this.projectile.update(dt, this.position.x, this.position.y);
        this.projectile1.update(dt, this.position.x+33, this.position.y);
        this.projectile2.update(dt, this.position.x+66, this.position.y);
        if(this.position.y < this.cIndex*(this.gameHeight/7)){
        this.position.y += 35/dt;
        }
        if(this.randomNum() > 99.3){
            this.projectile.shoot();
        }
        if(this.randomNum() > 99.3){
            this.projectile1.shoot();
        }
        if(this.randomNum() > 99.3){
            this.projectile2.shoot();
        }
    }
}