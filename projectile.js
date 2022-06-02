export default class Projectile{
    constructor(gameWidth, gameHeight, x, y, isEnemy){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.height = 8;
        this.width = 4;
        this.position = {
            x:this.changePositionIfEnemy(isEnemy,x),
            y:y
        };
        this.shooting = false;
        this.isEnemy = isEnemy;
    }

    getPosition(){
        return this.position;
    }

    changePositionIfEnemy(enemy, x){
        if(enemy){
            return x+15;
        }
        else{
            return x+30;
        }
    }

    bulletReset(x,y){
        this.position.y = y;
        this.position.x = this.changePositionIfEnemy(this.isEnemy, x);
        this.shooting = false;
    }

    shoot(){
        this.shooting = true;
    }


    draw(ctx){
        ctx.fillStyle = 'white';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update(dt, x, y){
        if(this.shooting){
            if(this.isEnemy){
                this.position.y += 50/dt;
            }
            else{
                this.position.y += -350/dt;
            }
            if(this.position.y<0 || this.position.y > this.gameHeight){
                this.bulletReset(x,y);
            }
        }
        else{
            this.position.x = this.changePositionIfEnemy(this.isEnemy, x);
            this.position.y = y+15;
            if (this.position.x < 30) {
                this.position.x = 30;
            }
            if (this.position.x > this.gameWidth-34){
                this.position.x = this.gameWidth-34;
            }
        }
    }
}