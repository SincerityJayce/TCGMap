// Script Order 0040:



function init_TextBoxes(){

    function textBoxPannel(){
        let div = document.createElement("div");
        div.classList.add('ToolSpace-Youtube', 'ToolSpace');

        let a = document.createElement('a')
        a.classList.add('toolPrompt')
        a.style.marginTop = '8px'
        div.appendChild(a)
        a.innerHTML = 'new Text Box +'
        return div
    }

    new NavElement({Title:'Text', Icon:document.getElementById('icon-Text'), OpenPannel:textBoxPannel()})

}
init_TextBoxes()











function buildTextBoxToolImage(path){
    let img = document.createElement('img');
    img.src=path;
    img.id=img.src;
    img.draggable=false;
    img.extraFunction='textbox';
    img.bluePrint = {
        "w":581.6186556927296,
        "h":548.6968449931411,
        "selfScale":0.7290000000000002}

    sizeToolImageToNav(img);

    navTabs['Text'].Toolspace.appendChild(img);
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
        tb.innerHTML = "DoubleClick to add text.<div><br></div><div>Drag the bottom corner to resize &gt;&gt;</div>"
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
    tutorialStepCompleted(3)
    if(this.textBox ==undefined){
        
        makeTextboxFor(thisShape);
        if(thisShape.shapeFunctions['video']==false){
            thisShape.imageOn = false;
        }
        
    }
    showTextBox(thisShape)
}
