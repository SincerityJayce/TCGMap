// Script Order 0090:


const canvas = document.getElementById('canvas');
const container = document.getElementById('container');
const display = document.getElementById('float over');
var c = canvas.getContext('2d');
var cDisplay = display.getContext('2d');
var canvasAreaW = undefined;
var canvasAreaH = undefined;
var scale = 4; //resolution


// Set these variables:
const topPalletHeight = 30; //custom pallet
const leftPalletWidth = 0; //toolbox
var viewScale = 1; //zoom
    
var totalScale = scale * viewScale;

// Mouse Move!
window.addEventListener('mousemove', 
    function(event){
        setMouseXY(event);
        // ask_IsMouseOverCanvas(event)
        if (activeTool != undefined){ //if there is an active mouse tool
            requestAnimationFrame(updateMouseDisplay);
        }
       
        if (iAmDrawingAnArrowNow){
            requestAnimationFrame(arrowMath)
        }
    })


var theoreticalShape = undefined; //paintbrush

var drawMouse = true;

var mouseOnCanvas = {x:undefined, y:undefined,
    canvasX:undefined, canvasY:undefined,
    fileX:undefined, fileY:undefined}





function setMouseXY(event){
    mouseOnCanvas.x = event.x - canvas.getBoundingClientRect().left;
    mouseOnCanvas.y = event.y - canvas.getBoundingClientRect().top;
    [mouseOnCanvas.canvasX, mouseOnCanvas.canvasY] = [mouseOnCanvas.x *scale, mouseOnCanvas.y * scale];
    [mouseOnCanvas.fileX, mouseOnCanvas.fileY] = convertCanvasXYintoFileXY(mouseOnCanvas.canvasX, mouseOnCanvas.canvasY);
}
// ! Draws the selected tool at the current mouse position






function ask_IsMouseOverCanvas(event){
        drawMouse = true; //will draw on canvas
        if (event.path[0].id != 'float over'){ //wont drawmouse if mouse if off canvas
            drawMouse = false;
        }
    }
function updateMouseDisplay(){
    clearMouseDisplay()
    if (drawMouse){
        drawTheoreticalShapeOnMouseMove()
    }
}




function drawTheoreticalShapeOnMouseMove(event){
    function drawTemporarily(thisShape) {
        let [x, y] = convertFileXYintoCanvasXY(thisShape.x, thisShape.y);
        let [w, h] = convertFileWHintoCanvasWH(thisShape.width, thisShape.height);
        cDisplay.drawImage(thisShape.shape, x-w/2, y-h/2, w, h);
    }   
    [theoreticalShape.x, theoreticalShape.y] = convertCanvasXYintoFileXY(mouseOnCanvas.canvasX, mouseOnCanvas.canvasY);
    drawShape(theoreticalShape);
}
// Paint and unselect the tool
function drawTheoreticalShapeOnClick(event){
    [theoreticalShape.x, theoreticalShape.y] = convertCanvasXYintoFileXY(mouseOnCanvas.canvasX, mouseOnCanvas.canvasY);
    drawShape(theoreticalShape)
    drawnScreenShapes.push(theoreticalShape);
    theoreticalShape = undefined;
    unselectAllTools();
}
