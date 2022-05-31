import Projectile from "./projectile.js";

export default class Ship {
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.width = 64;
        this.height = 64;
        this.speed = 0;
        this.sprite = document.getElementById("ship");
        this.position = {
            x: gameWidth/2-16,
            y: gameHeight-128
        };
        this.projectile = new Projectile(gameWidth, gameHeight, this.position.x, this.position.y);
    }

    moveLeft(){
        this.speed = -135;
        this.projectile.followLeft();
    }

    bulletReset(){
        this.projectile.bulletReset(this.position.x, this.position.y);
    }

    getBulletPosition(){
        return this.projectile.getPosition();
    }

    moveRight(){
        this.speed = 135;
        this.projectile.followRight();
    }

    shoot(){
        this.projectile.shoot();
    }

    stop(){
        this.speed = 0;
        this.projectile.stop();
    }

    draw(ctx){
        ctx.fillStyle = 'white';
        ctx.drawImage(this.sprite, this.position.x, this.position.y);
        this.projectile.draw(ctx);
    }

    update(dt){
        this.position.x += this.speed/dt;
        
        if (this.position.x < 0) {
            this.position.x = 0;
        }

        if (this.position.x > this.gameWidth-this.width){
            this.position.x = this.gameWidth-this.width;
        }

        this.projectile.update(dt, this.position.x, this.position.y);
    }
}