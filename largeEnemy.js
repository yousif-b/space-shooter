import Projectile from "./projectile.js";

export default class LargeEnemy{
    constructor(gameWidth, gameHeight){
        this.id = "largeEnemy";
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.sprite = document.getElementById("medEnemy");
        this.speed = 0;
        this.size = gameWidth;
        this.hp = 20;
        this.isKilled = false;
        this.position = {
            x: 0,
            y: -500
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

    hpLoss(){
        if(this.hp > 0){
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
    }

    checkIfKilled(){
        return this.isKilled;
    }

    draw(ctx){
        ctx.fillStyle = 'white';
        ctx.fillRect(this.position.x, this.position.y, this.size, 100);
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
        if(this.position.y < 0){
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