function init_arrowWidthSlider(){

    let slider = document.createElement('input')
    slider.type="range"
    slider.min="1";
    slider.max="300";
    slider.value=defaultArrowWidth;
    slider.classList.add('slider');

    slider.addEventListener('change',() =>{
        defaultArrowWidth = slider.value;
        drawCanvas();
    }
    );

    return slider
}

const arrowWidthSlider = init_arrowWidthSlider();
navlist.appendChild(arrowWidthSlider);