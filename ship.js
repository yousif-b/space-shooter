export default class Ship {
    constructor(gameWidth, gameHeight){
        this.width = 32;
        this.height = 64;
        this.maxSpeed = 5;
        this.speed = 0;
        this.position = {
            x: gameWidth/2,
            y: gameHeight-128
        };
    }

    moveLeft(){
        if(this.speed != -15){
        this.speed -= maxSpeed;
        }
    }

    moveRight(){
        if(this.speed != 15){
            this.speed += maxSpeed;
        }
    }

    draw(ctx){
        ctx.fillStyle = 'white';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update(dt){
        this.position.x += this.speed/dt;
        
        if (this.position.x < 0) {
            this.position.x = 0;
        }

        if (this.position.x + this.width > this.gameWidth) {
            this.position.x = this.gameWidth - this.width;
        }
    }
}