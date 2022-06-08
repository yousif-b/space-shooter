import Projectile from "./projectile.js";

export default class Enemy1{
    constructor(gameWidth, gameHeight, rIndex, cIndex){
        this.id = "enemy";
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.sprite = document.getElementById("enemy");
        this.rIndex = rIndex;
        this.cIndex = cIndex;
        this.size = 32;
        this.hp = 1;
        this.speed = 0;
        this.isKilled = false;
        this.position = {
            x: this.rIndex*(this.gameWidth/10),
            y: this.cIndex*(this.gameHeight/10-125)
        }
        this.projectile = new Projectile(this.gameWidth, this.gameHeight, this.position.x, this.position.y, true);
    }

    getSize(){
        return this.size;
    }

    bulletReset(){
        this.projectile.bulletReset(this.position.x, this.position.y);
    }

    getBulletPosition(){
        return this.projectile.getPosition();
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
        if(!this.projectile.shooting){
            this.bulletReset();
        }
    }

    checkIfKilled(){
        return this.isKilled;
    }

    draw(ctx){
        ctx.fillStyle = 'white';
        ctx.drawImage(this.sprite, this.position.x, this.position.y);
        this.projectile.draw(ctx);
    }

    randomNum(){
        return (Math.random()*100)
    }

    update(dt){
        this.projectile.update(dt, this.position.x, this.position.y);
        if(this.position.y < this.cIndex*(this.gameHeight/6)+25){
        this.position.y += 35/dt;
        }
        if(this.randomNum() > 99.50){
            this.projectile.shoot();
        }
    }
}