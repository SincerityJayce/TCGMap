// Script Order 0040:


var infoTips = {}, infoCounter=2, infoCompleteCounter=1;

function init_TextBoxes(){

    function InfoPannel(){
        let div = document.createElement("div");
        div.classList.add('ToolSpace-Info', 'ToolSpace');




        function infoA(txt){
            let a = document.createElement('a')
            a.classList.add('toolPrompt')
            a.style.marginTop = '8px'
            div.appendChild(a)
            a.innerHTML = "-- " + txt

            infoTips[infoCounter] = a;
            infoCounter++
        }

        infoA("Check out the different Tool Tabs, then come Back to the Info Tab.")
        infoA("Items Can be dragged from the Tool Tabs onto the canvas: try it with a Text Box.")
        infoA("Items On the Canvas can be dragged around.")
        infoA("While Dragging them, you can scroll to scale them up or down.")
        infoA("The whole Canvas can be dragged and resized like this.")
        infoA("If you hold SHIFT you can draw Arrows between 2 objects. Drawing the same line Twice erases it.")
        infoA("Drag an object to the bin in the bottom right> corner to Delete it.")
        infoA("You can RightClick on objects to get a menu to alter them. Try it on a Youtube Video.")
        infoA("If you drag some tools stright from this Side pannel into the Bin, it will delete that tool. This way you can keep your toolbox clean. Try deleting that video in the Youtube Tab.")
        infoA("Clicking maps in the top corner will let you open past maps.")
        infoA("Remember to click save. <3 have fun.")
        infoA("Many More Features Coming Soon!")
        

        return div
    }

    new NavElement({Title:'Info', Icon:document.getElementById('icon-Info'), OpenPannel:InfoPannel()})
    navTabs["Info"].Parent.click();

}
init_TextBoxes()

function tutorialStepCompleted(num){
    console.log(infoTips, infoCompleteCounter)

    if(infoCompleteCounter ==num){
        console.log(infoTips, infoCompleteCounter)
        infoTips[num]?.classList?.add('dimmed')
        infoCompleteCounter++
    }

    // find these in the code and delete them by searching the function name
}