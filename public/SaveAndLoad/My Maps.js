// Script Order 0070:

var listOfMyMaps;
function init_MyMaps() {
  
  
  
    function mapLoadPannel() {
    let div = make("div");
    div.classList.add("ToolSpace-MyMaps", "ToolSpace");

    let a = document.createElement("a");
    a.classList.add("toolPrompt");
    a.style.marginTop = "8px";
    a.innerHTML = "Your saved Maps";
    div.appendChild(a);

    listOfMyMaps = make("ul");
    listOfMyMaps.classList.add("listOfContent");
    div.appendChild(listOfMyMaps);

    return div;
  }

  new NavElement({ Title: "My Maps", OpenPannel: mapLoadPannel() });



  (function moveMapsTabToHeader(){
    document.getElementById("maps").addEventListener("click", function () {
        console.log("clicked it");
        navTabs["My Maps"].Title.click();
        tutorialStepCompleted(11)
      });
        navTabs["My Maps"].Parent.remove()
  })();
}

init_MyMaps();
