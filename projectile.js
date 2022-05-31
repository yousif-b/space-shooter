export default class Projectile{
    constructor(gameWidth, gameHeight, x, y){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.height = 8;
        this.width = 4;
        this.speed = 0;
        this.position = {
            x:x+30,
            y:y
        };
        this.shooting = false;
    }

    getPosition(){
        return this.position;
    }

    followLeft(){
        this.speed = -135;
    }

    followRight(){
        this.speed = 135;
    }

    bulletReset(x,y){
        this.position.y = y;
        this.position.x = x +30;
        this.shooting = false;
    }

    shoot(){
        this.shooting = true;
    }

    stop(){
        this.speed = 0;
    }

    draw(ctx){
        ctx.fillStyle = 'white';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update(dt, x, y){
        if(this.shooting){
        this.position.y += -350/dt;
            if(this.position.y<0){
                    this.bulletReset(x,y);
            }
        }
        else{
            this.position.x  += this.speed/dt;
            if (this.position.x < 30) {
                this.position.x = 30;
            }
            if (this.position.x > this.gameWidth-34){
                this.position.x = this.gameWidth-34;
            }
        }
    }
}