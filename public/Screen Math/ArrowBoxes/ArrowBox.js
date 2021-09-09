// Script Order 0030:



const arrowDomain = document.getElementById("arrowDomain");
// const arrowDomain = document.getElementById("container");

function arrowRotation(arrow, deg) {
  rotateNode(arrow.pin, deg);

  function rotateNode(node, deg) {
    node.style.transform = "rotate(" + deg + "deg)";
    return node;
  }
  return arrow;
}

function makeArrow() {
  let pinDiv = document.createElement("div");
  pinDiv.classList.add("arrow_pinDiv");

  let imgDiv = document.createElement("div");
  imgDiv.classList.add("arrow_imgDiv");
  pinDiv.appendChild(imgDiv);

  // let head = document.createElement('img');
  // line.classList('arrow_head')
  // line.src = 'arrowHead.jpg'
  // imgDiv.appendChild(head);

  function setArrowBetween2Points(arrow, start, finish) {
    function screenPointsToVector(start, finish) {
      let opposite = start.x - finish.x;
      let adjacent = start.y - finish.y;

      let degrees = 90 - Math.atan2(opposite, adjacent) * (180 / Math.PI);
      let height = Math.sqrt(opposite * opposite + adjacent * adjacent);
      let middle = { x: opposite / 2 + finish.x, y: adjacent / 2 + finish.y };

      return [degrees, height, middle];
    }
    let [degrees, length, middle] = screenPointsToVector(start, finish);
    const positionArrow = () => {
        arrow.pin.style.left = middle.x + "px";
        arrow.pin.style.top = middle.y + "px";
      },
      rotateArrow = () => {
        arrowRotation(arrow, degrees);
      },
      sizeArrow = () => {
        arrow.shape.style.width = length + "px";
      };

    positionArrow();
    rotateArrow();
    sizeArrow();
  }
  function set(on = true, start, finish) {
    const display = () => {
      if (!pinDiv.parentElement){
        arrowDomain.appendChild(pinDiv);
      }
      setArrowBetween2Points({ pin: pinDiv, shape: imgDiv }, start, finish);
      imgDiv.style.height = defaultArrowWidth+ 'px' ;

    };
    on ? display() : pinDiv.remove();

  }
  function setWidth(w){
    imgDiv.style.width = w
  }

  return { pin: pinDiv, shape: imgDiv, set, setWidth};
}

// // test example
// var testarrow = makeArrow();
// arrowDomain.appendChild(testarrow.pin);
// window.addEventListener("mousemove", function (e) {
//   testarrow.set(true, { x: 500, y: 300 }, e);
// });
