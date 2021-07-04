const storage = firebase.storage();

function init_uploadProgressBar(){
    const bar = make('progress');
    bar.value = '0';
    bar.min='0';
    bar.max='100';
    bar.id='uploadProgress';
    bar.innerHTML='0%';
    return bar;
}
const uploadProgressBar = init_uploadProgressBar()

function onFilesRecieved(){
    uploadFile(inputElement.files[0]);
}

function uploadFile(file){
    let storageRef = storage.ref("stored_videos/" + file.name);

    //upload file
    let task = storageRef.put(file)
    console.log('uploading', file)

    // update progress bar
    task.on('state_changed',
    
        //the names of these funtions matter 
        function progress (snapshot){
            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes *100);
            uploadProgressBar.value = percentage;
            console.log('uploading', percentage)
        }, // << don't forget the comma
    
        function error (err){
            console.log(err);
        },

        function complete(){

        }

    )
}


