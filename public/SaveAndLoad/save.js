// Script Order 0080:


var idKeys={};
saveBtn = document.getElementById('save-btn');
saveBtn.addEventListener('click', saveProject)
const infodump = document.getElementById('save-infodump');
infodump.remove();
var importedShape = undefined;

function saveToClipBoard(){
    let save = createJSON();
    document.body.appendChild(infodump);
    infodump.value = save;
    infodump.select();
    infodump.setSelectionRange(0, 99999);
    document.execCommand("copy");
    infodump.remove();
    alert("The Map was saved to your clipboard. Paste it somewhere safe.");
}


function saveProject(){
    
    let save = createJSON();
    document.body.appendChild(infodump);
    infodump.value = save;
    saveProjectToCloud();
    infodump.select();
    // infodump.setSelectionRange(0, 99999);
    document.execCommand("copy");
    infodump.remove();
    // alert("The Map was saved to your clipboard. Paste it somewhere safe.");
}

function createJSON(){
    jsonableArray = []
    for(var i in drawnScreenShapes){
        jsonableArray.push(makeSaveableObj(drawnScreenShapes[i]));
    }
    let savefile = JSON.stringify(jsonableArray);

    return savefile;
}
function makeSaveableObj(shape){

    let object = {  
        id:shape.id, x: shape.x, y:shape.y, 
        src:shape.src, w:shape.w, h:shape.h,

        selfScale: shape.selfScale,
        arrows:makeArrowsSaveable(shape.arrows),
        text:getTextFrom(shape), 
        videoStart:shape.videoStart,
        videoFinish:shape.videoFinish, 
        textboxBackgroundColor:shape.textboxBackgroundColor
    }

    return object;
    }

function makeArrowsSaveable(arrows){
    let newArrows = [];
    for(var i in arrows){
        newArrows.push(arrows[i].target.id);
    }    
    return newArrows;
}
function getTextFrom(shape){
    if (shape.textBox){
        console.log(shape.textBox)
        console.log(shape.textBox.textContent)
        return shape.textBox.textContent
    }
}

