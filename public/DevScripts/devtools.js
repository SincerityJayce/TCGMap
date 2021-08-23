// Script Order 9990:
function init_DevTools(){
    const devBtn = document.getElementById('devtools')
    devBtn.addEventListener('click', showDevTools);

    const devViewScreen = document.createElement('div');
    devViewScreen.id = "devViewScreen"
    devViewScreen.addEventListener('click', removeDevViewScreen)

    function showDevTools(){
        document.body.appendChild(devViewScreen);
        devViewScreen.classList.add('show');
    }
    function removeDevViewScreen(){
        devViewScreen.remove();
        devViewScreen.classList.remove('show')
    }

    var newPile;
    var newCard
    devTools = [  
        {   title: 'copy map to clipboard',
            clickEvent: saveToClipBoard
        },
        {   title:'load map from clipboard',
            clickEvent: function(){
                navigator.clipboard.readText()
                    .then(text => {
                        loadMapFromJson(text)
                    })
                    .catch(err => {
                        console.log('Failed to read clipboard contents: ', err);
                    });
        }},
        {   title: 'test card game',
            clickEvent: function (){
                testpile = {  "id":"ef1df5ee-6361-4bf1-8eaf-af99b968b4531",
                                "x":2996,"y":764,
                                "src":"http://localhost:5000/images/box.png",
                                "w":3596,"h":1492,
                                "text":""}
                newPile = makeShapeAPile(generateObject(testpile))
                newPile.info.screenPositions = calculateScreenPositions(newPile, 5)
                testcard = {    "id":"1b5c60ff-26b5-4288-9481-0aeb2f8ec6e42",
                                "x":2784,"y":1092,
                                "src":"https://storage.googleapis.com/ffdecks-card-images/10-075C_eg.jpg"}
                newCard = makeShapeACard(generateObject(testcard))

                addCardToPile(newCard, newPile, 0)
                renderCardsOf(newPile)
            }},
        {   title: 'renderpile',
            clickEvent: function(){
                renderCardsOf(newPile)
                console.log(newCard.shapeDiv)
            }
        },
    ]
        .forEach(element => {

            let btn = document.createElement('btn')
            console.log(btn)
            devViewScreen.appendChild(btn)
            btn.innerHTML = element.title
            btn.addEventListener('click', element.clickEvent)
        });
}

init_DevTools()