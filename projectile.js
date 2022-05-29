export default class Projectile{
    constructor(gameWidth, gameHeight, x, y){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.height = 8;
        this.width = 4;
        this.speed = 0;
        this.position = {
            x:x,
            y:y
        };
        this.shooting = false;
    }

    followLeft(){
        this.speed = -135;
    }

    followRight(){
        this.speed = 135;
    }

    shoot(){
        this.shooting = true;
    }

    stop(){
        this.speed = 0;
    }

    draw(ctx){
        ctx.fillStyle = 'white';
        ctx.fillRect(this.position.x+30, this.position.y, this.width, this.height);
    }

    update(dt, x, y){
        if(this.shooting){
        this.position.y += -350/dt;
            if(this.position.y<0){
                this.position.y = y;
                this.position.x = x;
                this.shooting = false;
            }
        }
        else{
            this.position.x  += this.speed/dt;

            if (this.position.x < 0) {
                this.position.x = 0;
            }
    
            if (this.position.x > this.gameWidth-64){
                this.position.x = this.gameWidth-64;
            }
        }
    }
}