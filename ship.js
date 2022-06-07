import Projectile from "./projectile.js";

export default class Ship {
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.width = 64;
        this.finished = false;
        this.height = 64;
        this.speed = 0;
        this.isKiled = false;
        this.sprite = document.getElementById("ship");
        this.position = {
            x: gameWidth/2-16,
            y: gameHeight+128
        };
        this.projectile = new Projectile(gameWidth, gameHeight, this.position.x, this.position.y, false);
    }

    moveLeft(){
        this.speed = -135;
    }

    bulletReset(){
        this.projectile.bulletReset(this.position.x, this.position.y);
    }

    getBulletPosition(){
        return this.projectile.getPosition();
    }

    killed(){
        this.position.x = 1000;
        this.position.y = 1000;
        this.isKilled = true;
    }

    moveRight(){
        this.speed = 135;
    }

    shoot(){
        this.projectile.shoot();
    }

    flyAway(){
        this.position.y -= 5;
        this.finished = true;
    }

    stop(){
        this.speed = 0;
    }

    draw(ctx){
        ctx.fillStyle = 'white';
        ctx.drawImage(this.sprite, this.position.x, this.position.y);
        this.projectile.draw(ctx);
    }

    update(dt){
        this.position.x += this.speed/dt;
        if(this.position.y > this.gameHeight - 128) {this.position.y -=2.5;}
        if (this.position.x < 0) {
            this.position.x = 0;
        }

        if (this.position.x > this.gameWidth-this.width){
            this.position.x = this.gameWidth-this.width;
        }

        this.projectile.update(dt, this.position.x, this.position.y);
    }
}