const arrowHead = document.getElementById("ArrowHead")

function newArrowHead(){
    return arrowHead.cloneNode(true);

}


function applySVGArrowHead(target, deg){
    let matrix = arrowHead.createSVGMatrix();

    matrix = matrix.rotate(deg)
    arrowHead.transform.baseVal.getItem(0).setMatrix(matrix);
    console.log(matrix)
}