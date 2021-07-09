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
// ytTab.remove();
display.remove();
loadAllSidebarTools();
invokeYoutubeApi();
textBoxToolsLoad();
