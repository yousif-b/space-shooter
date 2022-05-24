export default class InputHandler {
    constructor(ship){
        document.addEventListener("keydown", (event) => {
           switch(event.code){
               case 'ArrowLeft':
                   ship.moveLeft();
                   break;
               case 'ArrowRight':
                   ship.moveRight();
                   break;
           } 
        });

        document.addEventListener("keyup", (event) => {
            switch(event.code){
                case 'ArrowLeft':
                    if(ship.speed <0){
                        ship.stop();
                    }
                    break;
                case 'ArrowRight':
                    if(ship.speed >0) {
                        ship.stop();
                        break;
                    }             
            }
        });
    }
}