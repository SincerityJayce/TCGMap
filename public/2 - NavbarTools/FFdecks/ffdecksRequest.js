// Script Order 0054:

// init_FFDecks does not run. I disabled it.
function init_FFDecks(){
  new NavElement({Title:'FFDecks'})


  function onPasteDeckLink(e){
    e.preventDefault();
    let link = e.clipboardData.getData('text');
    deckLinkBox.value = "Loading...";
    takeDeckRequest(link);
  }
  
  deckLinkBox = makePasteBox(onPasteDeckLink, "Paste ffdecks.com/deck link...")
  navTabs['FFDecks'].Toolspace.appendChild(deckLinkBox)



  function takeDeckRequest(decklink){
    var deckrequest = 'https://ffdecks.com/api/deck?deck_id=' + decklink.slice(-16)
    var request = new Request(deckrequest);
    fetch(request).then(function(response) {
        return response.json();
    }).then(function(deck){
        importCards(deck);
        loadAllFFDecksTools();
        deckLinkBox.placeholder = "FF: " + deck['name'];
        deckLinkBox.value = "";
    })
  }
  
  
  var ffImages = []
  function importCards(deck){
    for(var i = 0; i < deck['cards'].length; i++){
        ffImages.push(deck['cards'][i]['card']['image'])
    }
  }
  
  // const navTabs['FFDecks'].Toolspace = document.getElementById('FFdecks');
  
  function loadAllFFDecksTools(){
    for (var i = 0; i < ffImages.length; i++){
        buildFFDecksToolImage(ffImages[i])
    }
  }
  function buildFFDecksToolImage(src){
    let img = document.createElement('img');
    img.src = src;
    img.id = src;
    img.classList.add('FFDecks')
    img.draggable = false;
    sizeToolImageToNav(img);
  
    navTabs['FFDecks'].Toolspace.appendChild(img);
    listOfAllTools.push(img);
    img.addEventListener('mousedown', selectActiveTool); //event: Select Tool on tool Clicked
  }
  
}

// init_FFDecks();



function uninstallFFDecks(){
  navTabs['FFDecks'].uninstall();
}





