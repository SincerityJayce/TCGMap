// Script Order 0031:

new NavElement({Title:"Images"})





function onFilesRecieved(){
    (navTabs["Images"].Title != openTab) ? navTabs["Images"].Title.click() :{};
    for(var i =0; i < inputElement.files.length; i++){ //needs a traditional for loop
        let thefile = inputElement.files[i]
        console.log(thefile)
        

        function buildCustomImageToolImage(src){
            let img = document.createElement('img');
            img.src = src;
            img.id = src;
            img.classList.add('FFDecks')
            img.draggable = false;
            sizeToolImageToNav(img);
          
            navTabs["Images"].List.appendChild(img);
            listOfAllTools.push(img);
            img.addEventListener('mousedown', selectActiveTool); //event: Select Tool on tool Clicked

          }
        buildCustomImageToolImage(URL.createObjectURL(thefile))
    }
}