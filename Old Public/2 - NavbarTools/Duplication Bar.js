// this is almost ready
// add delte events
// add limit
// redirect 'navFloat' events here and widen the blueprint

var toolTitleBeingEdited;
const duplicateBar = (function(){
    let db = make('div');
    db.classList.add('duplicateBar')
    document.body.appendChild(db)
    return db
}());




function createDuplicateToolShell(){

        
    function styleDuplicateToolImg(clickableImage){
        sizeToolImageToNav(clickableImage);
        clickableImage.style.float = 'left'
    }
    function styleDuplicateToolTitle(title){
        title.innerHTML = "______"
    }

    let tool = make('div');

        let clickableImage = make('img');
        styleDuplicateToolImg(clickableImage)
        tool.appedChild(clickableImage);

        let title = make('a');
        styleDuplicateToolTitle(title);
        tool.appedChild(title);
    
    

    title.addEventListener('dbclick', function editToolTitle(){
        toolTitleBeingEdited = title
        title.setAttribute('contenteditable', true);
        selectElementContents(title);
    })

    clickableImage.addEventListener('mousedown', )

    return tool
}