const storage = firebase.storage();

function buildFetchURL(funcName, params){
    let url = "https://us-central1-third-runway-317015.cloudfunctions.net/"
    let emUrl = "http://localhost:5001/third-runway-317015/us-central1/"

    return (url + funcName + new URLSearchParams(params))
}

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

let j = new URLSearchParams({
    
        fileName:'j.png',
        fileSize:4000,
        uid:'asdfhakjdh5kth'
    
})
console.log('this is j', j.toString())

function onFilesRecieved(){
    async function requestStorageSpace(f){
        let fetchParams = {
            fileName:f.name,
            fileSize:f.size,
            uid:auth.currentUser.uid
        }
        let fetchThis = buildFetchURL('affirmUpload', fetchParams);
        console.log(fetchThis)

        let approval = await fetch(new Request(fetchThis, {mode:'no-cors'}));
        return approval;
    }




    console.log('input files', inputElement.files);

    for(var i =0; i < inputElement.files.length; i++){
        console.log(i)

        requestStorageSpace(inputElement.files[i])
        .then(() =>{
            uploadFile(inputElement.files[i]);
        })
        .catch((err) => console.log(err));
    }
    console.log('all uploads completed')
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


