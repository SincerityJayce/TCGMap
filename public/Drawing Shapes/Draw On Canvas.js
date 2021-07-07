const canvas = document.getElementById('canvas');
const container = document.getElementById('container');
const display = document.getElementById('float over');
// const storedImages = document.getElementById('storedImages');
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
        ask_IsMouseOverCanvas(event)
        if (activeTool != undefined){ //if there is an active mouse tool
            requestAnimationFrame(updateMouseDisplay);
        }
        ask_isCanvasDrifting();
        if (iAmDrawingAnArrowNow){
            requestAnimationFrame(arrowMath)
        }
    })


var theoreticalShape = undefined; //paintbrush

var drawMouse = true;

var mouseOnCanvas = {x:undefined, y:undefined,
    canvasX:undefined, canvasY:undefined,
    fileX:undefined, fileY:undefined}



display.addEventListener('mouseup',
    function(event){
        setMouseXY(event);
        if (activeTool != undefined){
            drawTheoreticalShapeOnClick(event);
            unselectAllTools();
        }
    })

function setMouseXY(event){
    mouseOnCanvas.x = event.x - canvas.getBoundingClientRect().left;
    mouseOnCanvas.y = event.y - canvas.getBoundingClientRect().top;
    [mouseOnCanvas.canvasX, mouseOnCanvas.canvasY] = [mouseOnCanvas.x *scale, mouseOnCanvas.y * scale];
    [mouseOnCanvas.fileX, mouseOnCanvas.fileY] = convertCanvasXYintoFileXY(mouseOnCanvas.canvasX, mouseOnCanvas.canvasY);
}
// ! Draws the selected tool at the current mouse position




function createTheoreticalShape(){
    console.log('theorising')
    let [x, y] = convertCanvasXYintoFileXY(mouseOnCanvas.canvasX, mouseOnCanvas.canvasY);

    let theory = {
        src: activeTool.src,
        x,
        y
    }

    theoreticalShape = new BasicShape(theory);
    theoreticalShape.identify();
    console.log(theoreticalShape);
}

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
    [theoreticalShape.x, theoreticalShape.y] = convertCanvasXYintoFileXY(mouseOnCanvas.canvasX, mouseOnCanvas.canvasY);
    theoreticalShape.drawTemp();
}
// Paint and unselect the tool
function drawTheoreticalShapeOnClick(event){
    [theoreticalShape.x, theoreticalShape.y] = convertCanvasXYintoFileXY(mouseOnCanvas.canvasX, mouseOnCanvas.canvasY);
    theoreticalShape.onFirstDraw();
    drawShape(theoreticalShape)
    drawnScreenShapes.push(theoreticalShape);
    unselectAllTools();
}
