// ! Resizes Screen
window.addEventListener('resize', resize)
function resize(){  
     
    canvasAreaW = (window.innerWidth) * scale;
    canvasAreaH = (window.innerHeight - 1) * scale;
    container.style = 'width:'+canvasAreaW/scale+';height:'+canvasAreaH/scale + ';';
    display.width = canvasAreaW;
    display.height = canvasAreaH;
    canvas.width = canvasAreaW;
    canvas.height = canvasAreaH;     
    display.style = "width:" + canvasAreaW/scale + "px;height:" + canvasAreaH/scale + "px;";
    canvas.style = "width:" + canvasAreaW/scale + "px;height:" + canvasAreaH/scale + "px;";
    drawCanvas();
}

function drawCanvas(){
    function drawArrows(thisShape){
        thisShape.arrows.forEach((arr) =>{arr.draw()})
    }
    
    c.clearRect(0, 0, canvas.width, canvas.height);
    drawnScreenShapes.forEach((shape)=>{
        drawShape(shape)
        drawArrows(shape)
    })
}


//Sidebar
function buildToolImage(src){
    let img = document.createElement('img');
    img.src = src;
    img.id = src;
    img.draggable = false
    sizeToolImageToNav(img);

    // storedImages.appendChild(img);
    listOfAllTools.push(img);
    img.addEventListener('mousedown', selectActiveTool); //event: Select Tool on tool Clicked
}

function loadAllSidebarTools(){
    for (var i = 0; i < toolImgs.length; i++){
        buildToolImage(toolImgs[i])
    }
}

function sizeToolImageToNav(img){
    img.classList.add('unselectedTool');
    aspect = calculateAspectOf(img.src);
    if ((58/aspect) > 79){
        let h = 79/aspect;
        let w = 79;
        img.style = "height: " + h + "px; width: " + w + "px;";
    } else {
        let w = 58*aspect;
        let h = 58;
        img.style = "height: " + h + "px; width: " + w + "px;";
    }
}


function calculateAspectOf(image){
    return image.naturalWidth/image.NaturalHeight;
}











// Onload page

resize();
display.remove();
loadAllSidebarTools();
invokeYoutubeApi();
textBoxToolsLoad();

// remove these
// document.getElementById('navbar').remove();
// loadMapFromJson('[{"id":"ea752d8f-b1da-4067-853a-259df488fa6740","x":2496,"y":236,"src":"https://sincerityjayce.github.io/Map/images/box.png","w":392,"h":232,"selfScale":1,"arrows":["ea752d8f-b1da-4067-853a-259df488fa6741","ea752d8f-b1da-4067-853a-259df488fa6744","ea752d8f-b1da-4067-853a-259df488fa6742","ea752d8f-b1da-4067-853a-259df488fa6749"],"text":"Standing Neutral ","videoStart":0,"videoFinish":60,"textboxBackgroundColor":"#20202088"},{"id":"ea752d8f-b1da-4067-853a-259df488fa6741","x":1424,"y":920,"src":"https://sincerityjayce.github.io/Map/images/box.png","w":380,"h":320,"selfScale":1,"arrows":["ea752d8f-b1da-4067-853a-259df488fa6746","ea752d8f-b1da-4067-853a-259df488fa6747","ea752d8f-b1da-4067-853a-259df488fa6752","ea752d8f-b1da-4067-853a-259df488fa6753","ea752d8f-b1da-4067-853a-259df488fa6754","ea752d8f-b1da-4067-853a-259df488fa6755"],"text":"Underhook","videoStart":0,"videoFinish":60,"textboxBackgroundColor":"#20202088"}]')