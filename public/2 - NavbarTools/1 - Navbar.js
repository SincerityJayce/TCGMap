// Script Order 0031:

const navlist = document.getElementById('navlist'),
    openTabSpace = document.getElementById('toolSpace');
    
var openTab,navTabs = {};


const exampleBlueprint = {
    Title: 'Example',
    Icon: document.createElement('svg'),
    OpenPannel: document.createElement('div')
}

function NavElement(blueprint){
    let thisTab = this

    const btn = make('div');
        btn.classList.add('NavButton')

        blueprint.Icon && btn.appendChild(blueprint.Icon);

        const title = make('div');
        title.id = "navTitle_" + blueprint.Title;
        title.innerHTML = blueprint.Title;
        btn.appendChild(title)


    btn.addEventListener('click', function(){

        function showToolTab(show = true){
            show?openTabSpace.style.display = 'block':openTabSpace.style.display = 'none';
        }


        const offAllTabs =()=>{openTab = undefined;showToolTab(false)},
            setTab =()=>{openTab = title;showToolTab()}
        (openTab == title) ? offAllTabs() : setTab();
        manageOpenTab()
    })

    navlist.appendChild(btn)


    this.Title = title;
    this.Toolspace = blueprint.OpenPannel || document.createElement('div');
    this.Parent = btn
    navTabs[blueprint.Title] = this
    this.uninstall = function(){
        li.remove();
    }
    return this
}



function makePasteBox(pasteFunc, placeholder){
    let input = make('input')
    input.type = "text";
    input.classList.add('pasteBox')
    input.autocomplete = 'off';
    input.addEventListener('paste', pasteFunc)
    input.placeholder=placeholder
    
    return input
}


function forEveryNavTab(func){
    return Object.values(navTabs).forEach(func)
}

function manageOpenTab(){        
    tutorialStepCompleted(2)
    tutorialStepCompleted(1)
        
    function closeAppropriateTabs(tab){
        const closeIt = ()=>{tab.Title.classList.remove('openTab');tab.Toolspace?.remove()},
            openIt = ()=>{tab.Title.classList.add('openTab'); openTabSpace.appendChild(tab.Toolspace)}

        (tab.Title != openTab) ? closeIt() : openIt();
        
    }


    forEveryNavTab(closeAppropriateTabs)
}