const navlist = document.getElementById('navlist');

// const ytTab = document.getElementById('YouTube-Tab');

function NavElement(blueprint){
    let thisTab = this

    const li = make('li');

        const title = make('a')
        title.id = "navTitle_" + blueprint.Title;
        title.innerHTML = blueprint.Title;
        li.appendChild(title)

            const dropDownArrow = make('i');
            (['fa', 'fa-caret-down']).forEach((css) => {
                dropDownArrow.classList.add(css);
            });
            title.appendChild(dropDownArrow)
        
        const list = make('ul')
        
        li.appendChild(list);

    function manageOpenTab(){

        function forEveryNavTab(func){
            return Object.values(navTabs).forEach(func)
        }
        
        function closeAppropriateTabs(tab){
            (tab.Title != openTab) ? tab.Title.classList.remove('openTab') : tab.Title.classList.add('openTab')
        }

        forEveryNavTab(closeAppropriateTabs)
    }
    title.addEventListener('click', function(){
        (openTab == title) ? openTab = undefined : openTab = title;
        console.log(openTab)
        manageOpenTab()
    })

    navlist.appendChild(li)


    this.Title = title;
    this.List = list;
    this.uninstallNode = li
    navTabs[blueprint.Title] = this
    this.uninstall = function(){
        li.remove();
    }
}
var openTab;
var navTabs = {}



function makePasteBox(pasteFunc){
    let input = make('input')
    input.type = "text";
    input.autocomplete = 'off';
    input.addEventListener('paste', pasteFunc)
    input.placeholder="Paste ffdecks.com/deck link..."
    
    return input
  }


