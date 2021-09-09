// Script Order 0031:


// import { userInfo } from "os"; //idk where this came from

const firestore = firebase.firestore();
const auth = firebase.auth();

const savedMaps = firestore.collection('SavedMaps');



// function buildProfilePic(){
//     let pp = make('img')
//     pp.style.borderRadius = "50%";
//     return pp
// }

// var profilePic = (() => {
//     let pp = make('img')
//     pp.style.borderRadius = "50%";
//     return pp
// })()

const profilePic=document.getElementById('profilePic');
profilePic.classList.add("hidden");

var signInButton;
function signInOrOut(){
    function signInWithGoogle(){
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider)
        .then((log) => {
            console.log('j',log)
        }).catch((err) =>{
            console.error('k',err);
        })
    }


    if (signInButton.innerText == "signing in..."){return}
    if (auth.currentUser){
        checkCurrentUser();
        auth.signOut()//.then(onSignOut)
    } else {
        signInButton.innerText = "signing in..."
        signInWithGoogle();
    }
}


function checkCurrentUser(){

    function onSignOut(){
        signInButton.innerHTML = "Sign In With Google";
        profilePic.classList.add("hidden");

    }

    function onSignIn(){
        const showProfilePic= () => {
            let {photoURL, uid} = auth.currentUser
            profilePic.src = photoURL;
            profilePic.classList.remove('hidden')
        }

        signInButton.innerText = "Sign Out"
        showProfilePic()
        getMyMaps()

    }


    if (auth.currentUser){
        onSignIn()
    } else { 
        onSignOut()
    }
}   


function SignIn(){
    const btn = document.getElementById('signIn-btn')
        btn.addEventListener('click', signInOrOut);
        btn.innerText = "Sign In With Google"
    return btn
} 
signInButton = SignIn() // this is done really weirdly, fix it later

auth.onAuthStateChanged(checkCurrentUser);






