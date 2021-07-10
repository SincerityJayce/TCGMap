// Opening ///////////



// Sidebar Images:
// var toolImgs = ['images/12-078L_eg.jpg', 'images/back.png', 'images/84630286-12f2-4a40-82fc-d3d8cc316fb4.jpg', 'images/square_PNG22.png'];//All Tool Images
var toolImgs = ['images/Gbez/005.jpg', 'images/Gbez/035.jpg', 'images/Gbez/035_7908949a-a158-48c2-b861-2b3bef5bbae7.jpg', 'images/Gbez/047_dcfc424b-b4a6-43ed-8a6d-853766a89489.jpg']
var listOfAllTools = [];
var activeTool = undefined;

// Libraries ///////////////
// ! Objects on screen
// ...

// ! Objects on screen
var drawnScreenShapes = [];

















                    

// Tool select



function selectActiveTool(event){
    function unstyleAllUnactiveTools(){
        for (var i = 0; i < listOfAllTools.length; i++){
            if (listOfAllTools[i] != activeTool){
                listOfAllTools[i].classList.remove('selectedTool');
            }
        }
    }

    function createTheoreticalShape(){
        console.log('theorising')
        let [x, y] = convertCanvasXYintoFileXY(mouseOnCanvas.canvasX, mouseOnCanvas.canvasY);
    
        let theory = (activeTool.bluePrint  || {
            src: activeTool.src,
            onbuild: activeTool.onbuild,
            x,
            y
        });
    
        theoreticalShape = new BasicShape(theory);
        
        console.log('')
        idTagShape(theoreticalShape);
        theoreticalShape.clickDiv.addEventListener('mouseup',
            function(event){
                setMouseXY(event);
                if (activeTool != undefined){
                    drawTheoreticalShapeOnClick(event);
                    unselectAllTools();
                }
            })
    }


    if (activeTool != event.srcElement){
        activeTool = event.srcElement;
        console.log(activeTool)
        activeTool.classList.add('selectedTool');
        addDisplayToDOM();
        turnTheCanvasCursorInvisible();
        doOneThing()
        unstyleAllUnactiveTools();
        theoreticalShape ? deleteDrawnShape(theoreticalShape) :{};
        createTheoreticalShape();
    } else {
        unselectAllTools();
    }

}





function addDisplayToDOM(){
    container.appendChild(display);
    display.classList.remove('pointerEventsNone')
}
function turnTheCanvasCursorInvisible(){
    display.classList.add('cursorNone');
    canvas.classList.add('cursorNone');
}


// ! Unselects any currently selected tool
function unselectAllTools(){
    function unstyleAllTools(){
        listOfAllTools
            .forEach((tool)=>{tool.classList.remove('selectedTool');})
    }




    activeTool = undefined;

    unstyleAllTools();
    clearMouseDisplay();
    turnTheCanvasCursorVisible();
    removeDisplayFromDOM();
    theoreticalShape ? deleteDrawnShape(theoreticalShape) :{};
    theoreticalShape = undefined;
}


function clearMouseDisplay(){
    cDisplay.clearRect(0, 0, canvasAreaW, canvasAreaH);
}
function turnTheCanvasCursorVisible(){
    display.classList.remove('cursorNone');
    canvas.classList.remove('cursorNone'); //restores cursor
}
function removeDisplayFromDOM(){
    display.remove();
}