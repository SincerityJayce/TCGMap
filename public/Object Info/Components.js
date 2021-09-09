// Script Order 0033:


function makeShape(src){
    return styleShape(new Image(), src)
}
function styleShape(shape, src){
    shape.src = src;
    shape.width=0;
    shape.height=0;
    shape.draggable = false;
    shape.classList.add('drawnshape');
    shape.classList.add('FFDecks');
    shape.style.width ="100%";
    shape.style.height ="100%";

    return shape
}

function makeShapeDiv(){
    let sd = document.createElement('div')
    sd.classList.add('drawnshape');
    sd.style.position = 'fixed';
    sd.style.overflow = 'hidden';

    // sd.style.paddingRight = '1px';

    return sd
}

function makeClickDiv(){
    let sd = document.createElement('div')
    sd.classList.add('clickdiv');
    
    return sd
}


const bin = document.getElementById('bin');
bin.addEventListener('mouseup',
    function(){
        if (shapeBeingDragged){
            deleteDrawnShape(shapeBeingDragged);
            tutorialStepCompleted(8)


        }
        if (theoreticalShape){
            deleteDrawnShape(theoreticalShape)
        }
        if (activeTool){
            // delete bin deletable object
            if(activeTool.parentNode == (navTabs["Youtube"].Toolspace || navTabs['FFDecks'].Toolspace)){
                activeTool.remove();
                delete activeTool
                tutorialStepCompleted(10)

            }
            unselectAllTools()
        }
    })


function deleteDrawnShape(thisShape){           
    drawnScreenShapes = drawnScreenShapes.filter(
        function(ele){return ele != thisShape;})

    thisShape.arrows.forEach((arrow)=>{
        console.log('this was an arrow')
        delete arrow.parts.pin.remove()
    })
    thisShape.shapeDiv?.remove()
    thisShape.shape?.remove();
    thisShape.alive = false;
    playerIsNotPlaying(thisShape);
    delete thisShape.shape;
    delete thisShape.shapeDiv;
    delete thisShape;

    drawCanvas();
}

function idTagShape(thisShape){
    let newID = createShapeId()
    idKeys[thisShape.id] = newID
    thisShape.id = newID;
    thisShape.shapeDiv.id = thisShape.id;
    thisShape.clickDiv.id = thisShape.id;
    thisShape.shape.id = thisShape.id;
}








function InitShapeFunctions(thisShape){

    if(thisShape.src?.includes('images/box.png')){
        thisShape.shapeFunctions['textbox'] = true;
        thisShape.imageOn = false;
    }//placeholder, move to something more sensible

    if (thisShape.shapeFunctions['textbox']){
        initialiseTextBoxOn(thisShape); 
    }
}