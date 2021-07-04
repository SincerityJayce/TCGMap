function make(string){
    return document.createElement(string)
}
var inputElement;
function init_uploadPanel(){

    const panel = make('div');
    panel.id = "uploadFilesPannel";
    
        const fileDropZone = make('div');
        fileDropZone.classList.add("drop-zone");
        panel.appendChild(fileDropZone)

            const dropZoneText = make('span');
            dropZoneText.innerHTML = "Drop file here or click to upload";
            dropZoneText.classList.add("drop-zone__prompt");
            fileDropZone.appendChild(dropZoneText);

    inputElement = make('input');
            inputElement.type="file";
            inputElement.name="myfile";
            inputElement.classList.add('drop-zone__input');
            inputElement.accept = 'video/*,image/*';
            inputElement.setAttribute('multiple', true);
            fileDropZone.appendChild(inputElement);

        fileDropZone.addEventListener("click", (e) => {
            inputElement.click();
        });
        

    function applyEvents_hover(){
        fileDropZone.addEventListener("dragover", (e) => {
            e.preventDefault();
            fileDropZone.classList.add("drop-zone--over");
        });

        ["dragleave", "dragend"].forEach((type) => {
            fileDropZone.addEventListener(type, (e) => {
            fileDropZone.classList.remove("drop-zone--over");
            });
        });
    }

    function applyEvents_fileDrop(){
        fileDropZone.addEventListener("drop", (function(e){
            console.log(e.dataTransfer.files);
            if (e.dataTransfer.files.length) {
            onFileDrop(e)
            }
            fileDropZone.classList.remove("drop-zone--over");
            e.preventDefault();
        }));

        function onFileDrop(e){
            console.log(e);
            inputElement.files = e.dataTransfer.files;
            console.log(inputElement.files);
            onFilesRecieved();
        }
    
        inputElement.addEventListener("change", function(e){
            console.log('change', e)
            if (inputElement.files.length) {
                onFilesRecieved()
            }
        });
    }


    function applyEvents_detectFilesBeingDraggedOverScreen(){
        document.addEventListener("dragover", (e) => {
            e.preventDefault();
            if(fileDropZone.parentNode !== document.body){
                document.body.appendChild(panel);
            }
            
          });
        
          ['dragleave', "dragend", 'drop'].forEach((type) => {
            panel.addEventListener(type, (e) => {
              panel.remove()
            });
          });
    }  


    applyEvents_hover();
    applyEvents_fileDrop();
    applyEvents_detectFilesBeingDraggedOverScreen();

    return panel
}

const uploadPanel = init_uploadPanel()









