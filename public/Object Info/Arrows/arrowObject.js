// Script Order 0054:


function Arrow (start, target, image){

    if(start !== target){
        this.start = start;
        this.target = target;
    
        let thisArrow = this;
    
        start.addConnection({type:"Outgoing", to:target});
        target.addConnection({type:"Incoming", to:start});
        this.parts = makeArrow()
        this.draw = function(){
            if (this.target.alive){
    
                let start = shapeCenterOnCanvas(this.start);
                let [sx, sy] =convertFileXYintoScreenXY (this.start.x, this.start.y)
                let [fx, fy] =convertFileXYintoScreenXY (this.target.x, this.target.y)
                let [fw, fh] = convertFileWHintoScreenWH(this.target.width, this.target.height);

                let right = -1;if(fx<sx){right = 1};
                let up = -1;if(fy<sy){up = 1};
                let [r,u] = [1, 0];if((fx-sx)*right>(fy-sy)*up*this.target.aspect){[r,u]=[0,1]};
                let finish = {x: fx+r*right*fw*0.4, y:fy+u*up*fh*0.4};
                // redo this with turnary statements probably lol
                // it determines where the arrow should point


    
                thisArrow.parts.set(true, start, finish)
            }else{
                this.start.removeConnection({type:"Outgoing", to:target});
                this.target.removeConnection({type:"Incoming", to:start});
                this.parts.pin.remove();
                delete thisArrow;
            }
        }
    
    
    
    
    
    
    
        // ifThisArrowAlreadyExists_DeleteTheOldArrowAndThis
        // Else add this to the list of active arrows
        let thisIsANewArrow = true

        for(var i =0;i<start.arrows.length; i++){
            if(start.arrows[i].target == this.target){
                start.arrows[i].parts.pin.remove();
                start.arrows.splice(i, 1);
                thisIsANewArrow = false
                }
            }
            if(thisIsANewArrow){
                start.arrows.push(this);
        }




    }
}
  

function shapeCenterOnCanvas(shape){
    let [sx, sy] =convertFileXYintoScreenXY (shape.x, shape.y)
    return {x:sx, y:sy};
}

