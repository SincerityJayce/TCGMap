// Script Order 0032:

function BasicShape(model){
    var thisShape = this;

    //Init
        lastShape = this;
        this.src = model.src;
        this.id = model.id;
        this.selfScale = model.selfScale || 1;
        this.x = model.x;
        this.y = model.y;
        this.shapeFunctions = {};

        this.alive = true;
        this.neverDrawn = true;
        this.imageOn = true;
        this.textBoxOn = false;


        this.shapeDiv = makeShapeDiv();
        this.clickDiv = makeClickDiv();
        this.shapeDiv.appendChild(this.clickDiv);
        this.shape = makeShape(this.src);
        this.clickDiv.appendChild(this.shape);

        this.divStyleMath;
        this.aspect;

        this.text;
        this.fontSize = 18;

        //make this WH logic apply after creation
        this.w = model.w || this.shape.naturalWidth;
        this.h =  model.h || this.shape.naturalHeight;

        this.width = this.w*this.selfScale;
        this.height = this.h*this.selfScale;

        this.draggedfrom = {x:undefined, y:undefined};

        this.videoStart = model.videoStart || 0;
        this.videoFinish = model.videoFinish || 60;

        this.textboxBackgroundColor = model.textboxBackgroundColor || "#202020";
        this.textThumbnail = false;
    //



    InitShapeFunctions(thisShape)
    container.appendChild(thisShape.shapeDiv);


    // Events
        // for loading saves
        this.shape.addEventListener('load', function(){
            thisShape.w = thisShape.w || thisShape.shape?.naturalWidth;
            thisShape.h = thisShape.h || thisShape.shape?.naturalHeight;
            drawShape(thisShape);
        })

        this.clickDiv.addEventListener('contextmenu', function(e){
            thisShape.shapeDiv.classList.add('contextShape')
            contextShape = thisShape;
            openShapeMenu(e)});

        // dragging and arrows
        this.clickDiv.addEventListener('mousedown', 
        function(event){
            if(event.button ==0){
                if (event.shiftKey){
                    startArrow(thisShape);
                }
                else{if(thisTextBoxIsntBeingEdited(thisShape)){
                    startDraggingShape(thisShape)
                }}
            }

        })

    //



    // Connections (arrows)
        this.arrowcodes = model.arrows || [];
        this.arrows = [];
        this.clickDiv.addEventListener('mouseup',
        function(e){if(iAmDrawingAnArrowNow){
                    thisShape.recieveArrow();
                    resize(); 
        }})
        this.recieveArrow = function(e){
            let a = new Arrow(arrowObj, thisShape);
        }

    //
        



    //Youtube
        determineAndSetupYoutubeFor(thisShape);
        function initVideo(){
            if(thisShape.shapeFunctions["video"] && purposeOfClick.isToOperate()){
                thisShape.clickDiv.removeEventListener('click',initVideo)
                createVideoPlayer(thisShape);
            }
        }
        this.clickDiv.addEventListener('click',initVideo)
            

    //


    // basically unused right now
    this.connections = {};
    this.addConnection = function addConnection(connection){
        this.connections[connection] = {notes:undefined}
    }
    this.removeConnection = function removeConnection(connection){
        delete this.connections[connection]
    }

    allCreatedObjects.push(this);
    model.onbuild ? model.onbuild(thisShape) : {} ;
}

