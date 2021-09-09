// Script Order 0001:



function KeepStyleDiv() {
  div = document.createElement("div");
  div.classList.add("keepStyleSpace");

  function appendColumn() {
    let column = document.createElement("div");
    column.classList.add("keepStyleColumn");
    div.appendChild(column);
  }
  function columns() {
    let cols = [];
    div.querySelectorAll("div.keepStyleColumn").forEach((col) => {
        cols.push(col)
    });

    return cols;
  }

  this.setColumns = function setColumns(num) {
    let restore = tempRemoveItems();
    var numcol = columns().length;
    while (num < numcol) {
      columns()[0].remove();
      numcol -=1;
    }
    while (num > numcol) {
      appendColumn();
      numcol ++;
    }
    columns().forEach((col) => {col.style.width = String(1/num*100)+"%"})
    this.addItems(restore);
  }
  function tempRemoveItems() {
    let floatingObjects = [];
    columns().forEach((column) => {
      var children = Array.prototype.slice.call(column.childNodes);
      children.forEach((o) => {
        floatingObjects.push(o);
        o.remove();
      });
    });
    return floatingObjects;
  }

  const compareColumnHeight = (a, b) => {

      return a.getBoundingClientRect().height - b.getBoundingClientRect().height;
    },
    placeItemKeepStyle = (item, cols) => {
      cols.sort(compareColumnHeight);
      cols[0]?.appendChild(item);
    },
    wakeRenderBot = ()=>{
      if (!this.rendering) {

        renderBot = make_renderBot(this);
        renderBot.next();
      }
    };

  function* make_renderBot(keepList) {
    let cols = columns();

    keepList.rendering = true;

    renderNextImg = (img) => {
      placeItemKeepStyle(img, cols);
      const waitForImage = () => {
        ["load", "error"].forEach((e) => {
          img.addEventListener(e, () => {
            renderBot.next();
          });
        });
      };
      if(img.complete || img.tagName != "IMG"){
        keepList.itemsToRender.length?renderNextImg(keepList.itemsToRender.shift()):keepList.rendering = false;
      }else{
        waitForImage();
      } 
    };

    while (keepList.itemsToRender.length) {
      yield renderNextImg(keepList.itemsToRender.shift());
    }

    keepList.rendering = false;
    return;
  }
  this.renderBot;
  this.itemsToRender = [];
  this.rendering = false;

  this.addItems = function(items){
    this.itemsToRender = this.itemsToRender.concat(items);

    wakeRenderBot();
  };

  this.addItem = function(item){
    this.itemsToRender.push(item);
    wakeRenderBot(this);
  };

  this.div = div;
}

// var keepSpace = new KeepStyleDiv();
// keepSpace.setColumns(3);
// keepSpace.addItems(imgList);
// document.body.appendChild(keepSpace.div);


