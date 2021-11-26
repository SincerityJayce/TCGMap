// Script Order 0030:



function make(string){
    return document.createElement(string);
}

function eventsFor(element, ...events){
    for (const [trigger, func] of events){
        element.addEventListener(trigger, func);
    }
    recordEventsAssignedToElementSoTheyCanBeCloned(element, events)
    return element;
}

function recordEventsAssignedToElementSoTheyCanBeCloned(element, events){
    element.clonableEvents = [...element.clonableEvents||[], ...events||[]]
}

// this function is the core of my homemade framework
function element(element, {style, children, events, Class, set, ...props}={}){

    function createPerfectCloneOfElement(element){
        function cloneEventsToObject(original, clone){
            eventsFor(clone, ...original.clonableEvents||[])
            return clone
        }
        return cloneEventsToObject(element,Object.assign(element.cloneNode(true), element))
    }

    element = (typeof element === 'string') ? document.createElement(element) : createPerfectCloneOfElement(element);

    const applyParams=()=>{

            props&& Object.assign(element, props)
        
            style&& Object.assign(element.style, style)
        
            children&& children.forEach(function(c){c&&element.appendChild(c)})
        
            events&& (()=>{for (const [listener, func] of events){element.addEventListener(listener, func)}})()
        
            Class&& Class.split(' ').forEach(c=>{c&&element.classList.add(c)})

            set&& (()=>{for (const [prop, value] of Object.entries(set)){element.setAttribute(prop, value)}})()
        },
        applyFeatures=()=>{
            element.kids = function(...theChildren){
                theChildren.forEach(kid=>{
                    element.appendChild(kid); return element
                })
            }
            recordEventsAssignedToElementSoTheyCanBeCloned(element, events)
        }
    ;


    applyParams()
    applyFeatures()


    return element
}





// deep merge two objects
function mergeDeep(target, ...sources) {

function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

if (!sources.length) return target;
const source = sources.shift();

if (isObject(target) && isObject(source)) {
    for (const key in source) {
    if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
    } else {
        Object.assign(target, { [key]: source[key] });
    }
    }
}

return mergeDeep(target, ...sources);
}







function thisShapeHasAVisibleTextbox(thisShape){
   return (thisShape.textBox?.parentNode == thisShape.clickDiv)
}

function determineYouTubeID(link) {
    let f = (link.match(/img.youtube.com\/vi\/[\w\-]{11}/))
return f
}

function FoundShape(id){
    let o = undefined;
    for (var i=0; i<drawnScreenShapes.length;i+=1){
        if (id == drawnScreenShapes[i].id){
            o = drawnScreenShapes[i];
        }
    }
    return o;
}

function thisShapeOnscreen(object, x, y){
    // this math is fucked, fix it one day
    let xn = (x/scale + object.width);
    let yn = (y/scale + object.height);
    x = x/scale;
    y = y/scale;
    if (xn > 0 && x < window.innerWidth &&
        yn > 0 && y < window.innerHeight){
        return true;
    } else {return false;}
}


function thisTextBoxIsntBeingEdited(thisShape){
    return(textBoxBeingEdited!== thisShape.textBox || textBoxBeingEdited ==undefined)
}

var fullScreenDiv;
var notFullScreen = true;
function checkIfNotFullScreen(){
    if (fullScreenDiv !== (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement)) {
        fullScreenDiv = undefined;
        notFullScreen = true;
    }
    return notFullScreen
}

function prependChildToElement(child, element){
    element.insertBefore(child, element.firstChild);
}


function selectElementContents(el) {
    let range = document.createRange();
    range.selectNodeContents(el);
    let sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
}

function removeAllShapesFromScreen(){
    drawnScreenShapes.forEach(deleteDrawnShape);
}