// Script Order 9990:
function init_DevTools(){
    const devBtn = document.getElementById('devtools')
    devBtn.addEventListener('click', showDevTools);

    const devViewScreen = document.createElement('div');
    devViewScreen.id = "devViewScreen"
    devViewScreen.addEventListener('click', removeDevViewScreen)

    function showDevTools(){
        container.appendChild(devViewScreen);
        devViewScreen.classList.add('show');
    }
    function removeDevViewScreen(){
        devViewScreen.remove();
        devViewScreen.classList.remove('show')
    }


    devViewScreen.innerText = "X"

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
    ]
        .forEach(element => {

            let btn = document.createElement('btn')
            devViewScreen.appendChild(btn)
            btn.innerHTML = element.title
            btn.addEventListener('click', element.clickEvent)
        });
}

init_DevTools()