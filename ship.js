export default class Ship {
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.width = 32;
        this.height = 64;
        this.speed = 0;
        this.position = {
            x: gameWidth/2,
            y: gameHeight-192
        };
    }

    moveLeft(){
        this.speed = -135;
    }

    moveRight(){
        this.speed = 135;
    }

    stop(){
        this.speed = 0;
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

        if (this.position.x > this.gameWidth-this.width){
            this.position.x = this.gameWidth-this.width;
        }
    }
}