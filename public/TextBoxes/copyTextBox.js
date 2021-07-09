var navFloat;

function inti_textSquareDuplication(){
    const textSquare = document.getElementById('textSquare');
    textSquare.remove();

    navTabs['Text Boxes'].Parent.addEventListener('mousemove', () => {navFloat = true})
    navTabs['Text Boxes'].Parent.addEventListener('mouseleave', () => {navFloat = false})
    navTabs['Text Boxes'].Parent.addEventListener('mouseup', () => {
        shapeBeingDragged?.shapeFunctions['textbox'] ? copyTextBoxToNav() : {};
    })

} inti_textSquareDuplication()

function copyTextBoxToNav(){

}

function buildCustomTextBoxTool(bluePrint){
    function newTextSquare(){
        return textSquare.cloneNode(true)
    }

    let box = newTextSquare;
    // img.draggable=false;
    box.extraFunction='textbox';



    navTabs['Text Boxes'].List.appendChild(img);
    listOfAllTools.push(img);
    img.addEventListener('mousedown', selectActiveTool); //event: Select Tool on tool Clicked
}






















function determineIfDraggingTextBoxOverNav(){

    navFloat = true
}

function createNewTextBoxOption(){

}

function setTextBoxToolParamaters(){
    
}

