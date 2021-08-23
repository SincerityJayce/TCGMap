// Script Order 0035:



window.addEventListener('wheel', scaleObjectWithWheel);

const arbitraryZoomRatio = 0.9;
const zoomDrift = 2/(1-arbitraryZoomRatio);

function scaleObjectWithWheel(e){

    function scaleUp(thisShape){
        thisShape.selfScale*= arbitraryZoomRatio;
        thisShape.width = thisShape.w*thisShape.selfScale;
        thisShape.height = thisShape.h*thisShape.selfScale;
    }
    function scaleDown(thisShape){
        thisShape.selfScale/= arbitraryZoomRatio;
        thisShape.width = thisShape.w*thisShape.selfScale;
        thisShape.height = thisShape.h*thisShape.selfScale;
    }

    let s = shapeBeingDragged || theoreticalShape;

    s ? ((e.deltaY > 0) ? scaleUp(s) : scaleDown(s)) : {};

    // render action
    shapeBeingDragged?drawShape(s):{};
    theoreticalShape?requestAnimationFrame(updateMouseDisplay):{};
}




















var mousePercent
var mouseXRatio = 1;
var mouseYRatio = 1;

function zoomCanvas(e){

    if (mouseDownOnCanvas && activeTool == undefined){

        mouseXratio = e.clientX*2/window.innerWidth;
        mouseYratio = e.clientY*2/window.innerHeight;
        if(e.deltaY > 0){
            zoomOut();
        }
        if(e.deltaY < 0){
            zoomIn();
        }
    }
}
canvas.addEventListener('wheel', zoomCanvas);

function zoomIn(){
    viewScale *= arbitraryZoomRatio;
    totalScale = scale * viewScale;
    canvasDrift.x += (canvasAreaW/zoomDrift*viewScale);
    canvasDrift.y += (canvasAreaH/zoomDrift*viewScale);
    draggedFrom.canvasX = mouseOnCanvas.canvasX;
    draggedFrom.canvasY = mouseOnCanvas.canvasY;
    draggedFrom.driftX = canvasDrift.x;
    draggedFrom.driftY = canvasDrift.y;
    resize();
}
function zoomOut(){
    canvasDrift.x -= canvasAreaW/zoomDrift*viewScale;
    canvasDrift.y -= canvasAreaH/zoomDrift*viewScale;
    viewScale /= arbitraryZoomRatio;
    totalScale = scale * viewScale;
    draggedFrom.canvasX = mouseOnCanvas.canvasX;
    draggedFrom.canvasY = mouseOnCanvas.canvasY;
    draggedFrom.driftX = canvasDrift.x;
    draggedFrom.driftY = canvasDrift.y;

    resize();
}
















//click and drag events
var mouseDownOnCanvas = false;
var draggedFrom = {canvasX: undefined, canvasY: undefined, driftX: undefined, driftY:undefined};
canvas.addEventListener('mouseleave',() =>{mouseDownOnCanvas = false;})
canvas.addEventListener('mouseup',  () =>{mouseDownOnCanvas = false;})
canvas.addEventListener('mousedown',
    function(event){
        function setDraggedFromPoint(event){
            draggedFrom.canvasX = mouseOnCanvas.canvasX;
            draggedFrom.canvasY = mouseOnCanvas.canvasY;
            draggedFrom.driftX = canvasDrift.x;
            draggedFrom.driftY = canvasDrift.y;
        }
        setMouseXY(event)
        setDraggedFromPoint(event);
        mouseDownOnCanvas = true;
    })



window.addEventListener('mousemove', ask_isCanvasDrifting);
function ask_isCanvasDrifting(event){

    function updateCanvasDrift() {
        canvasDrift.x = draggedFrom.driftX + (draggedFrom.canvasX - mouseOnCanvas.canvasX)*viewScale;
        canvasDrift.y = draggedFrom.driftY + (draggedFrom.canvasY - mouseOnCanvas.canvasY)*viewScale;
        resize();
    }

    if (activeTool == undefined && mouseDownOnCanvas){
        requestAnimationFrame(updateCanvasDrift);
    }
}

