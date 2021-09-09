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

    function createYoutubeOpenTab(){
        let div = make('div')
        div.classList.add('ToolSpace-Youtube', 'ToolSpace')

            let a = document.createElement('a')
            a.classList.add('toolPrompt')
            a.innerHTML = 'Paste Youtube video links here to get them as sticky notes.'
            div.appendChild(a)

            function ytPasteEvent(e){
                e.preventDefault();
                e.target.value = "";
                buildYTToolImage(e.clipboardData.getData('text'));
                a.classList.add('dimmed')
            }
            div.appendChild(makePasteBox(ytPasteEvent, "Paste here..."))

        return div
    }





    new NavElement({Title:"Youtube", Icon:document.getElementById('icon-Youtube'), OpenPannel:createYoutubeOpenTab()});
}




