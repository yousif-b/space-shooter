import Projectile from "./projectile.js";

export default class MediumEnemy{
    constructor(gameWidth, gameHeight, rIndex, cIndex){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.sprite = document.getElementById("medEnemy");
        this.rIndex = rIndex;
        this.cIndex = cIndex;
        this.speed = 0;
        this.size = 98;
        this.isKilled = false;
        this.position = {
            x: this.rIndex*(this.gameWidth/3)+this.gameWidth/15,
            y: this.cIndex*(this.gameHeight/10 - 215)
        }
        this.projectile = new Projectile(this.gameWidth, this.gameHeight, this.position.x, this.position.y, true);
    }
    
    getSize(){
        return this.size;
    }

    killed(){
        this.position.x = 1000;
        this.position.y = 1000;
        this.isKilled = true;
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
        if(this.position.y < this.cIndex*(this.gameHeight/10)){
        this.position.y += 35/dt;
        }
        if(this.randomNum() > 99.75){
            this.projectile.shoot();
        }
    }
}