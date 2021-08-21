const storage = firebase.storage();

function buildFetchURL(funcName, params){
    // let url = "https://us-central1-third-runway-317015.cloudfunctions.net/" //live
    let url = "http://localhost:5001/third-runway-317015/us-central1/" //emulator

    return (url + funcName + "?" + new URLSearchParams(params))
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



function sendFilesToServer(){
    async function requestStorageSpace(params){

        let fetchThis = buildFetchURL('affirmUpload', params);
        console.log(fetchThis)

        let approval = await fetch(new Request(fetchThis, {mode:'no-cors'}));
        return approval;
    }




    console.log('input files', inputElement.files);

    for(var i =0; i < inputElement.files.length; i++){
        let thefile = inputElement.files[i]

        let {name, size}= thefile
        let fetchParams = {name, size, uid:auth.currentUser.uid}

        requestStorageSpace(fetchParams)
        .then(() =>{
            uploadFile(thefile);
        })
        .catch((err) => console.log(err));
    }
    console.log('all uploads completed')
}

function uploadFile(file){
    let storageRef = storage.ref("UserFiles/" + auth.currentUser.uid + "/Public/" + file.name);

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


