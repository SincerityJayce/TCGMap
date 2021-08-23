// Script Order 0090:


var shapeBeingDragged;
var mouseStarteDraggingFrom;


window.addEventListener('mousemove',
    function(e){
        if (shapeBeingDragged && notFullScreen){
            objectUnmoved = false;
            let [x,y] = [(mouseStarteDraggingFrom.x - mouseOnCanvas.x)*totalScale, (mouseStarteDraggingFrom.y - mouseOnCanvas.y)*totalScale]
            shapeBeingDragged.x = shapeBeingDragged.draggedfrom.x - (navFloat ? 0 : x);
            shapeBeingDragged.y = shapeBeingDragged.draggedfrom.y - (navFloat ? 0 : y);
            requestAnimationFrame(redrawShapeBeingDragged);
        }
    })

function redrawShapeBeingDragged(){
    drawCanvas()
}


window.addEventListener('mouseup',
    function(e){
        shapeBeingDragged = undefined;   
    }
)

function startDraggingShape(thisShape){
    if(checkIfNotFullScreen()){
        thisShape.draggedfrom = {x:thisShape.x, y:thisShape.y};
        mouseStarteDraggingFrom = {x:mouseOnCanvas.x, y:mouseOnCanvas.y}
        shapeBeingDragged = thisShape;
    }
}



// resize shapes
var shapeBeingResized;

function resizeAShape(){
    if(shapeBeingResized && checkIfNotFullScreen()){
        shapeBeingResized.w = shapeBeingResized.shapeDiv?.offsetWidth/shapeBeingResized.selfScale*totalScale;
        shapeBeingResized.h = shapeBeingResized.shapeDiv?.offsetHeight/shapeBeingResized.selfScale*totalScale;
        drawShape(shapeBeingResized);
    }}




window.addEventListener('mousemove',function(e){
    if(shapeBeingResized && checkIfNotFullScreen()){
        objectUnmoved = false;
        requestAnimationFrame(resizeAShape)
    }
})



function makeShapeResiazble(thisShape){
    thisShape.shapeDiv.classList.add('resizable');

    thisShape.shapeDiv.addEventListener('mousedown',function(e){
        shapeBeingResized = thisShape;
    })
}
function makeShapeNotResiazble(thisShape){
    thisShape.shapeDiv.classList.remove('resizable');

    thisShape.shapeDiv.removeEventListener('mousedown',function(e){
        shapeBeingResized = thisShape;
    })
}