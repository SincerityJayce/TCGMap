// Script Order 0054:



function buildYTToolImage(link){
    let img = document.createElement('img');
    img.YTid=unpackYTLink(link)[0];
    img.src=ytThumbnailFromId(img.YTid);
    img.id=img.src;
    img.draggable=false
    img.extraFunction='video';
    

    sizeToolImageToNav(img);

    navTabs["Youtube"].Toolspace.appendChild(img);
    listOfAllTools.push(img);
    img.addEventListener('mousedown', selectActiveTool); //event: Select Tool on tool Clicked
}
function ytThumbnailFromId(id){
    return ('https://img.youtube.com/vi/'+ id +'/hqdefault.jpg')
}
function unpackYTLink(link) {
    return link.match(/[\w\-_]{11}/);
  }



function exampleVideoTool(){
    buildYTToolImage('https://www.youtube.com/watch?v=D-ya6U-pbWo');
}



