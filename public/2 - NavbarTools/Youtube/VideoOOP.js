// Script Order 0054:



function determineAndSetupYoutubeFor(thisShape){
    thisShape.YTid = determineYouTubeID(thisShape.src)?.[0].replace("img.youtube.com/vi/", "");
    if(thisShape.YTid){
        thisShape.shapeFunctions["video"] = true;
    }
}

function createVideoPlayer(thisShape){
        
    thisShape.vidDiv = document.createElement('div');
    thisShape.vidDiv.height= "100%";
    thisShape.vidDiv.width = "100%";
    thisShape.vidDiv.id = thisShape.id+"YTAPI";
    thisShape.clickDiv.appendChild(thisShape.vidDiv);

    let newPlayer = new YT.Player(thisShape.vidDiv.id,{
        height: thisShape.shape.height,
        width: thisShape.shape.width,
        videoId: thisShape.YTid,
        playerVars:{
            autoplay:1,
            controls:0,
            modestbranding:1,
            rel:0,
            start: thisShape.videoStart,
            end: thisShape.videoFinish+2
        },
        events: {
            "onReady": function onReady(){
                //this function needs to stay in the object for yt player 'ready' event
                thisShape.videoFinish = thisShape.vidPlayer.getDuration();
                thisShape.shape.remove();
                thisShape.imageOn = false;
                thisShape.vidPlayer.playVideo()
            },

            "onStateChange": function togglePlayStatus(){
                console.log('sdfa')
                let statePorP = {
                    0 : playerIsNotPlaying,
                    1 : playerIsPlaying,
                    2 : playerIsNotPlaying,
                    3 : playerIsNotPlaying,
                    5 : playerIsNotPlaying}
                statePorP[thisShape.vidPlayer.getPlayerState()](thisShape);
            }
        }});
    thisShape.vidPlayer = newPlayer;
    thisShape.vidDiv = thisShape.vidPlayer.getIframe();
    thisShape.vidDiv.height= "100%";
    thisShape.vidDiv.width = "100%";
    thisShape.vidDiv.classList.add('pointerEventsNone');
    


    thisShape.clickDiv.addEventListener('click', function(){
        if(purposeOfClick.isToOperate()){
            if(thisTextBoxIsntBeingEdited(thisShape)){
                playPauseToggle(thisShape)
            }
        }})


    // slider code
    thisShape.slider = makeSlider();
    thisShape.slider.addEventListener('input', ()=>{setVideoPosition(thisShape)});
    thisShape.slider.addEventListener('mousedown', function(){
        activeSlider = thisShape
    });
    thisShape.shapeDiv.appendChild(thisShape.slider);
}


function setVideoPosition(thisShape){
    //this function needs to stay in the object for yt player 'onchange' event
    thisShape.vidPlayer
        .seekTo(
            findVideoPositionFromSlideValue(thisShape, thisShape.slider), 
                allowSeekAhead_YoutubeAPI)
    playOrPause(thisShape);
}


function makeShapeFullscreen(thisShape){
    let shapeDiv = thisShape.shapeDiv;
    
    var requestFullScreen = shapeDiv.requestFullScreen || shapeDiv.mozRequestFullScreen || shapeDiv.webkitRequestFullScreen;
    if(requestFullScreen){
        
        shapeBeingResized = undefined;
        requestFullScreen.bind(shapeDiv)();

        function listenForNotFullScreen(){
            notFullScreen = false;
            fullScreenDiv = thisShape.shapeDiv
        }

        listenForNotFullScreen()}
}


// // fullscreen on keydown. need to make trigger clean then it's ready to go
// // also att toggle fullscreen functionality to this
// document.addEventListener('keydown', function(e){
//     console.log('keydown on container', e)
//     if (e.code == "KeyF"){
//         fullscreenPlayingVid();
//     }
// })







function playOrPause(thisShape){ 
    let statePorP = {
        0 : pauseYT,
        1 : playYT,
        2 : pauseYT,
        3 : playYT,
        5 : pauseYT}
    statePorP[thisShape.vidPlayer.getPlayerState()](thisShape);
}

function playPauseToggle(thisShape){ 
    let statePorP = {
        0 : playYT,
        1 : pauseYT,
        2 : playYT,
        3 : pauseYT,
        5 : playYT}
    statePorP[thisShape.vidPlayer.getPlayerState()](thisShape);
}