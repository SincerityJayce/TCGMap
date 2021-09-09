examplePileInfo = {
    cards: [],
    screenPositions:[[0,0]],
    visibleTo: 'both',
    scale: 1,
    maxVisibleCards:1,
    maxCards:10,
    rows: 1
}
exampleCardInfo = {
    pile :undefined
}

function makeShapeAPile(shape, pileBP = examplePileInfo){
    shape.info = pileBP
    shape.info.DivType = "Pile"
    return shape
}

function makeShapeACard(shape, cardBP = exampleCardInfo){
    shape.info = cardBP
    shape.info.DivType = "Card"
    return shape
}

new NavElement({Title:"Card Piles"})

let cardboard = navTabs["Card Piles"]


function buildCustomImageToolImage(src){
    let img = document.createElement('img');
    img.src = src;
    img.id = src;
    img.classList.add('FFDecks')
    img.draggable = false;
    sizeToolImageToNav(img);
  
    navTabs["Files"].List.appendChild(img);
    listOfAllTools.push(img);
    img.addEventListener('mousedown', selectActiveTool);
  }


// renderCardsOf pile
    function setScreenPositionOfCard(card, position){
        let [left,top] = position
        card.shapeDiv.style.top = top
        card.shapeDiv.style.left = left
    }
    function styleCardToPile(card, pile){
        card.shapeDiv.style.maxWidth = pile.width / pile.info.maxCards
    }
    function visibleCardsIn(pile){
        return pile.info.cards.slice( 0 , pile.info.maxCards)
    }

