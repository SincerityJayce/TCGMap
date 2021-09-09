// Script Order 0060:



var loadingShapes = [];

// function onPaste_LoadMapString(e){
//     e.preventDefault();
//     document.getElementById('loadmap').value = "";
//     loadMapFromJson(e.clipboardData.getData('text'));
// }

function loadMapFromJson(saveString){ //from text
    loadObjects(JSON.parse(saveString))
}

function loadObjects(saveFile){ //from code
    loadingShapes = []
    saveFile.forEach(generateObject);
    loadingShapes.forEach(initialiseObjectsArrows);
}

function generateObject(ShapeBlueprint){
    function loadTextBox(box, txt){
        box.textBox? box.textBox.innerHTML = txt.replace(/(?:\r\n|\r|\n)/g, '<br>'):{};
    }
    console.log('generating shape', ShapeBlueprint)
    importedShape = (new BasicShape(ShapeBlueprint));
    idTagShape(importedShape);
    drawShape(importedShape)
    loadTextBox(importedShape, ShapeBlueprint.text);
    drawnScreenShapes.push(importedShape);
    loadingShapes.push(importedShape);
    return importedShape
}

function initialiseObjectsArrows(shape){
    for(var i=0; i<shape.arrowcodes.length; i++){
        console.log('initialising arrow pointing at this id', shape.arrowcodes[i])
        if(shape.arrowcodes[i]){
            iAmDrawingAnArrowNow = true;
            arrowObj = shape;
            targetsOldID = shape.arrowcodes[i];
            targetsNewID=idKeys[targetsOldID]
            FoundShape(targetsNewID).clickDiv.dispatchEvent(new Event('mouseup'));
            iAmDrawingAnArrowNow = false;
        }
    }
}


