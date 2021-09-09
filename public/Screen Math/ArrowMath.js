// Script Order 0090:


var iAmDrawingAnArrowNow = false,arrowObj,arrowStart;
const testArrow = makeArrow();



function startArrow(shapeObj){
    

    iAmDrawingAnArrowNow = true;
    arrowObj = shapeObj;
    turnTheCanvasCursorInvisible();
}



function drawTempArrow(){
    let [x, y] =convertFileXYintoScreenXY(arrowObj?.x, arrowObj?.y)
    let start = {x:x, y:y}
    let finish = {x:mouseOnCanvas.x, y:mouseOnCanvas.y};
    testArrow.set(iAmDrawingAnArrowNow, start, finish)
}    



window.addEventListener('mouseup',
    function(){
        if(iAmDrawingAnArrowNow){
            iAmDrawingAnArrowNow = false;
            arrowObj = undefined;
            turnTheCanvasCursorVisible();
            testArrow.set(false)
        }
    })