export default class Util{
    constructor(){}
    
    checkIfEnemiesAreDead(wave){
        let count = 0;
        let counting = 0;
        for(let i = 0; i<wave.length;i++){
            count +=wave[i].length;
            for(let j = 0; j<wave[i].length;j++){
                if(wave[i][j].checkIfKilled()){
                    counting++;
                }
            }
        }
        if(count == counting){
            return true;
        }
        else{return false;}
    }

    checkHit(ship, enemy){
        let enemyWidth = enemy.size;
        let bulletP = ship.getBulletPosition();
        let enemyP = enemy.position;
        if(bulletP.x > enemyP.x && bulletP.x < enemyP.x + enemyWidth){
            if(bulletP.y > enemyP.y && bulletP.y < enemyP.y + enemyWidth){
                return true;
            }
            else{
                return false;
            }
        }
    }

    checkDeath(ship, enemy){
        let shipWidth = ship.width;
        let bulletP = enemy.getBulletPosition();
        let shipP = ship.position;
        if(bulletP.x > shipP.x && bulletP.x < shipP.x + shipWidth){
            if(bulletP.y > shipP.y && bulletP.y < shipP.y + shipWidth){
                return true;
            }
            else{
                return false;
            }
        }
    }

    getBoolArr(i){
        let arr = [];
        for(let j = 0; j<i; j++){
            arr.push(false);
        }
        return arr;
    }
}