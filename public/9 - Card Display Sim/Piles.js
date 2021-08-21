var allCardPiles = []

function renderCardsOf(pile){
    visibleCardsIn(pile).forEach((card, index) => {
        console.log(pile.info.screenPositions[index])
        pile.shapeDiv.appendChild(card.shapeDiv)
        setScreenPositionOfCard(card, pile.info.screenPositions[index])
        styleCardToPile(card, pile)
    });
}

// returns a list of [x,y]'s to place the center of items 
// // absolute within an area based on muber of items per row
function calculateScreenPositions(dimensions, num, rows = 1){
    screenPositions = []
    let cardSpace = dimensions.width / num
    let top = dimensions.height / 8 //implimenting rows starts here
    for (var i=0; i<num; i++){
        let left = (i + 0.5) * cardSpace
        screenPositions.push([left, top])
    }
    return screenPositions
}

function moveCard(card, pile, index = 0){
    let oldPile = removeCardFromItsPile(card)
    addCardToPile(card, pile, index)
}

    function addCardToPile(card, pile, index=0){
        pile.shapeDiv.appendChild(card.shapeDiv)
        pile.info.cards.splice(index,0,card)
        card.info.pile = pile
    }
    function removeCardFromItsPile(card){
        oldPile = card.info.pile
        removeObjectFromList(card, card.info.pile.info.cards)
        card.remove();
        card.info.pile = undefined
        return oldPile
    }
        function removeObjectFromList(obj, list){
            for(var i =0;i<list.length; i++){
                if(list[i] == obj){
                    list.splice(i, 1);}}
        }






