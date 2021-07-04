function make(string){
    return document.createElement(string)
}


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

            const inputElement = make('input');
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
        fileDropZone.addEventListener("drop", (e) => {
            e.preventDefault();
            if (e.dataTransfer.files.length) {
            onFileDrop(e)
            }
            fileDropZone.classList.remove("drop-zone--over");
        });

        function onFileDrop(e){
            inputElement.files = e.dataTransfer.files;
        }
    
        inputElement.addEventListener("change", (e) => {
            if (inputElement.files.length) {
            onFileRecieved(e)
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









