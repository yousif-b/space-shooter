export default class Enemy{
    constructor(gameWidth, gameHeight, rIndex, cIndex){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.x = rIndex;
        this.y = cIndex;
        this.position = {
            x: this.x*(this.gameWidth/10),
            y: this.y*(this.gameHeight/10)
        }
        this.size = 32;
    }

    getPosition(){
        return this.position;
    }

    killed(){
        this.position.x = 1000;
        this.position.y = 1000;
    }

    draw(ctx){
        ctx.fillStyle = 'white';
        ctx.fillRect(this.position.x, this.position.y, this.size, this.size);
    }

    update(dt){
        //this.position.y += 1/dt;
    }
}