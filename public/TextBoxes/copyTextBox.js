var navFloat;





function inti_textSquareDuplication(){
    const textSquare = document.getElementById('textSquare');
    textSquare.remove();

    navTabs['Text Boxes'].Parent.addEventListener('mousemove', () => {navFloat = true})
    navTabs['Text Boxes'].Parent.addEventListener('mouseleave', () => {navFloat = false})
} inti_textSquareDuplication()


alert('not broken')

function newTextSquare(){
    return textSquare.cloneNode(true)
}




function determineIfDraggingTextBoxOverNav(){

    navFloat = true
}

function createNewTextBoxOption(){

}

function setTextBoxToolParamaters(){
    
}

