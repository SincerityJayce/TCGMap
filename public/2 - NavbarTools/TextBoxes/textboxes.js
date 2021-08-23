// Script Order 0040:



const textBoxShelf = document.getElementById('Text Box Shelf');

function init_TextBoxes(){
    new NavElement({Title:'Text Boxes'})











}
init_TextBoxes()


function buildTextBoxToolImage(path){
    let img = document.createElement('img');
    img.src=path;
    img.id=img.src;
    img.draggable=false;
    img.extraFunction='textbox';
    

    sizeToolImageToNav(img);

    navTabs['Text Boxes'].List.appendChild(img);
    listOfAllTools.push(img);
    img.addEventListener('mousedown', selectActiveTool); //event: Select Tool on tool Clicked
}


const textBoxPath = 'images/box.png'
function textBoxToolsLoad(){
    buildTextBoxToolImage(textBoxPath);
}

function makeTextboxFor(thisShape){
    function makeTextbox(){
        let tb = document.createElement('div');
        tb.type='text'
        tb.innerHTML = "DoubleClick to add text."
        tb.classList.add('textbox');
        tb.style.fontSize = thisShape.fontSize*thisShape.selfScale/viewScale
        tb.style.background = thisShape.textboxBackgroundColor
        return tb
    }

    thisShape.textBox = makeTextbox();
    thisShape.textBox.addEventListener("dblclick", function (){
        startEditingTextBox(thisShape.textBox)
    })
}

function startEditingTextBox(s){
    textBoxBeingEdited = s;
    textBoxBeingEdited.setAttribute('contenteditable', true);
    selectElementContents(textBoxBeingEdited);
}



function hideTextBox(thisShape){
    thisShape.shapeFunctions["textbox"] = false;
    thisShape.textBox.remove();
    makeShapeNotResiazble(thisShape);
}
function showTextBox(thisShape){
    thisShape.shapeFunctions["textbox"] = true;
    thisShape.clickDiv.appendChild(thisShape.textBox);
    makeShapeResiazble(thisShape);
}

function initialiseTextBoxOn(thisShape){
    if(this.textBox ==undefined){
        
        makeTextboxFor(thisShape);
        if(thisShape.shapeFunctions['video']==false){
            thisShape.imageOn = false;
        }
        
    }
    showTextBox(thisShape)
}
