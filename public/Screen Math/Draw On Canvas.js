// Script Order 0090:


const canvas = document.getElementById('canvas');
const container = document.getElementById('container');
var c = canvas.getContext('2d');
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
            console.log()
            requestAnimationFrame(drawTempArrow)
        }
    })


var theoreticalShape = undefined; //paintbrush

var drawMouse = true;








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
