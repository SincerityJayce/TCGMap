// Script Order 0054:

var defaultArrowWidth = 1;

function init_arrowWidthSlider(){

    let slider = document.createElement('input')
    slider.type="range"
    slider.min="1";
    slider.max="60";
    slider.value=defaultArrowWidth;
    slider.classList.add('slider');

    slider.addEventListener('change',() =>{
        defaultArrowWidth = slider.value;
        console.log('arrow width intended',defaultArrowWidth);
    });

    return slider
}

const arrowWidthSlider = init_arrowWidthSlider();

// slider is disabled
// navlist.appendChild(arrowWidthSlider);