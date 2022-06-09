import Projectile from "./projectile.js";

export default class Enemy3{
    constructor(gameWidth, gameHeight, rIndex, cIndex){
        this.id = "medEnemy";
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.sprite = document.getElementById("medEnemy");
        this.rIndex = rIndex;
        this.cIndex = cIndex;
        this.speed = 0;
        this.size = 98;
        this.hp = 5;
        this.isKilled = false;
        this.position = {
            x: this.rIndex*(this.gameWidth/3)+this.gameWidth/15,
            y: this.cIndex*(this.gameHeight/10 - 215)
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
        ctx.drawImage(this.sprite, this.position.x, this.position.y);
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
        if(this.position.y < this.cIndex*(this.gameHeight/20)){
        this.position.y += 35/dt;
        }
        if(this.randomNum() > 99.4){
            this.projectile.shoot();
        }
        if(this.randomNum() > 99.4){
            this.projectile1.shoot();
        }
        if(this.randomNum() > 99.4){
            this.projectile2.shoot();
        }
    }
}