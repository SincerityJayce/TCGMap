// Script Order 0040:


var YTAPItag;
var YTAPIfirstScriptTag;
function invokeYoutubeApi(){
    YTAPItag = document.createElement('script');
    YTAPItag.src = "HTTPS://www.youtube.com/player_api";
    YTAPIfirstScriptTag = document.getElementsByTagName('script')[0];
    YTAPIfirstScriptTag.parentNode.insertBefore(YTAPItag, YTAPIfirstScriptTag);
}


function onYouTubePlayerAPIReady() {
    init_Youtube()
    exampleVideoTool();
}

function init_Youtube(){
    new NavElement({Title:"Youtube"});

    function ytPasteEvent(e){
        e.preventDefault();
        e.target.value = "";
        buildYTToolImage(e.clipboardData.getData('text'));
    }

    navTabs["Youtube"].List.appendChild(makePasteBox(ytPasteEvent, "Paste Youtube link here..."))
}




