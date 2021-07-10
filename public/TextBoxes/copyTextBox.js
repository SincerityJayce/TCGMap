var navFloat;
const textSquare = document.getElementById('textSquare');

function inti_textSquareDuplication(){
    textSquare.remove();

    navTabs['Text Boxes'].Parent.addEventListener('mousemove', () => {navFloat = true})
    navTabs['Text Boxes'].Parent.addEventListener('mouseleave', () => {navFloat = false})
    navTabs['Text Boxes'].Parent.addEventListener('mouseup', () => {
        shapeBeingDragged?.shapeFunctions['textbox'] ? copyTextBoxToNav(shapeBeingDragged) : {};
    })

} inti_textSquareDuplication()




function generateTextBoxBluePrint(shape){
    console.log(shape)
    let bluePrint = {  
        x: shape.x, y:shape.y, 
        src:shape.src, w:shape.w, h:shape.h,

        selfScale: shape.selfScale,
        text:getTextFrom(shape), 
        videoStart:shape.videoStart,
        videoFinish:shape.videoFinish, 
        textboxBackgroundColor:shape.textboxBackgroundColor
    }

    return bluePrint;
}


textBoxBluePrints = {}
function copyTextBoxToNav(shape){

    let box = textSquare.cloneNode(true)
    let rect = box.childNodes[1]
    box.bpKey = createShapeId()
    box.extraFunction='textbox';
    box.bluePrint = generateTextBoxBluePrint(shape);
    rect.style.fill = shape.textboxBackgroundColor;
    rect.classList.add('pointerEventsNone')


    navTabs['Text Boxes'].List.appendChild(box);
    listOfAllTools.push(box);
    box.addEventListener('mousedown', selectActiveTool); //event: Select Tool on tool Clicked
}






















function determineIfDraggingTextBoxOverNav(){

    navFloat = true
}

function createNewTextBoxOption(){

}

function setTextBoxToolParamaters(){
    
}

