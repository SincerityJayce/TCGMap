// Script Order 0031:


const files_KeepStyleList = new KeepStyleDiv();
function files_NavTab_OpenPannel(){
    let div = make('div')
        div.classList.add('ToolSpace')

        let a = document.createElement('a')
        a.classList.add('toolPrompt')
        a.style.marginTop = '8px'
        div.appendChild(a)
        a.innerHTML = "Drag Image Files. Your personal images can't be saved right now but soon this will be possible."

        let scrollDiv = document.createElement('div');
        // scrollDiv.classList.add('scrollableToolSpace')
        div.appendChild(scrollDiv)

            scrollDiv.appendChild(files_KeepStyleList.div)
            files_KeepStyleList.setColumns(2);



    return div;
}
new NavElement({Title:"Files", Icon:document.getElementById('icon-Files'),
OpenPannel: files_NavTab_OpenPannel()});





function onFilesRecieved(){
    (navTabs["Files"].Title != openTab) ? navTabs["Files"].Title.click() :{};
    for(var i =0; i < inputElement.files.length; i++){ //needs a traditional for loop
        let thefile = inputElement.files[i]
        console.log(thefile)
        

        function buildCustomImageToolImage(src){
            let img = document.createElement('img');
            img.src = src;
            img.id = src;
            img.classList.add('FFDecks')
            img.classList.add('googleKeepStyle-Note')
            img.draggable = false;

            // sizeToolImageToNav(img);
            // navTabs["Files"].Toolspace.appendChild(img);
            files_KeepStyleList.addItem(img)

            listOfAllTools.push(img);
            img.addEventListener('mousedown', selectActiveTool); //event: Select Tool on tool Clicked

          }
        buildCustomImageToolImage(URL.createObjectURL(thefile))
    }
}