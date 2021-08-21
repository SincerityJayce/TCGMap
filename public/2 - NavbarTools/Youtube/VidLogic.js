var activeSlider;
var lastPlayedVideo;
var noVidsPlaying = false;

function playYT(tS){tS.vidPlayer.playVideo(); lastPlayedVideo = tS; noVidsPlaying = false}
function pauseYT(tS){tS.vidPlayer.pauseVideo();}

var activeYTPlayers = [];

var videoInterval;
function playerIsNotPlaying(thisShape){
    function stopVideoInterval(){videoInterval = undefined;}
    function hideYTPlayer(thisShape){
        thisShape.vidDiv.classList.add('hiddenYT');
    }
    function showThumbnail(thisShape){
        if (thisShape.shapeFunctions['textbox']){
            thisShape.clickDiv.appendChild(thisShape.textBox)
            // thisShape.textBox.style.zIndex = "9999";
        }
    }



    removeObjectFromList(thisShape, activeYTPlayers);
    if(activeYTPlayers.length < 1){
        noVidsPlaying = true;
        stopVideoInterval();}
    showThumbnail(thisShape)
    // hideYTPlayer(thisShape)
}
function playerIsPlaying(thisShape){
    function startVideoInterval(){
        videoInterval = setInterval(updateVideos, 100);};
    function showYTPlayer(thisShape){
            thisShape.vidDiv.classList.remove('hiddenYT');}
    function hideThumbnail(thisShape){
        if (thisShape.textBox){
            thisShape.textBox.remove()
            // thisShape.textBox.style.zIndex = "0";
        }
        
    }

    if(activeYTPlayers.length<1){
        startVideoInterval()}
    activeYTPlayers.push(thisShape);
    // showYTPlayer(thisShape);
    hideThumbnail(thisShape)
}



function updateVideos(){
    console.log(window.fullScreen)
    function updateThisVidPlayer(thisShape){
        console.log(thisShape.vidPlayer.getCurrentTime(),thisShape.videoFinish)
        if(thisShape.vidPlayer.getCurrentTime()>thisShape.videoFinish){
            thisShape.vidPlayer.seekTo(thisShape.videoStart);}

        if(thisShape!== activeSlider){
            thisShape.slider.value = findSlideValueFromVideoPosition(thisShape);}
    }

    for(var i =0;i<activeYTPlayers.length; i++){
        updateThisVidPlayer(activeYTPlayers[i])
    }
}


function fullscreenPlayingVid(){
    if(noVidsPlaying == false){
        makeShapeFullscreen(lastPlayedVideo);
    }
}






window.addEventListener('mousedown', seekYoutubeData_Off);
window.addEventListener('mouseup', function(){
    if(activeSlider){
        seekYoutubeData_On();
        setVideoPosition(activeSlider);
        activeSlider = undefined
    }
})

var allowSeekAhead_YoutubeAPI = true;
function seekYoutubeData_Off(){
    allowSeekAhead_YoutubeAPI = false;}
function seekYoutubeData_On(){
    allowSeekAhead_YoutubeAPI = true;}
    


function findVideoPositionFromSlideValue(vidShape,slider){
    let sec = (vidShape.videoStart+(slider.value/100)*(vidShape.videoFinish-vidShape.videoStart));
    return sec
}
function findSlideValueFromVideoPosition(vidShape){
    let v =vidShape.vidPlayer.getCurrentTime();
    slide= (v-vidShape.videoStart)/(vidShape.videoFinish-vidShape.videoStart)*100;
    return slide;
}
 







function initialiseVideoFor(thisShape){

}
function makeSlider(){
    let slider = document.createElement('input')
    slider.type="range"
    slider.min="1";
    slider.max="100";
    slider.value='1';
    slider.classList.add('slider');
    slider.classList.add('vidslider');

    return slider
}