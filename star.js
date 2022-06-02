export default class Star{
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.speed = 5;
        this.position = {
            x: Math.floor(Math.random()*gameWidth),
            y: Math.floor(Math.random()*gameHeight)
        };
        this.size = 2;
    }

    draw(ctx){
        ctx.fillStyle = 'white';
        ctx.fillRect(this.position.x, this.position.y, this.size, this.size);
    }

    update(dt){
        this.position.y += this.speed/dt;
        if(this.position.y > this.gameHeight){
            this.position.y = 0;
            this.position.x = Math.floor(Math.random()*this.gameWidth);
        }
    }
}