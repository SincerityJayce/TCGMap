// import { userInfo } from "os"; //idk where this came from

const firestore = firebase.firestore();
const auth = firebase.auth();

const savedMaps = firestore.collection('SavedMaps');



// function buildProfilePic(){
//     let pp = make('img')
//     pp.style.borderRadius = "50%";
//     return pp
// }

var profilePic = (() => {
    let pp = make('img')
    pp.style.borderRadius = "50%";
    return pp
})()
var signInButton;
alert('s')
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
        signInButton.innerText = "Sign In With Google";
        profilePic.remove();
    }

    function onSignIn(){
        const showProfilePic= () => {
            let {photoURL, uid} = auth.currentUser
            profilePic.src = photoURL;
            signInButton.appendChild(profilePic);
        }

        signInButton.innerText = "Sign Out"
        showProfilePic()
    }


    if (auth.currentUser){
        onSignIn()
    } else { 
        onSignOut()
    }
}   


function SignIn(){
    const btn = make('li');
        signInButton = btn;
        btn.style.backgroundColor = "#b4c3e4";
        btn.style.border = "none";
        btn.style.borderRadius = "3px";
        btn.style.width = "100%";
        btn.style.textAlign = "center";
        btn.addEventListener('click', signInOrOut);
        btn.innerText = "Sign In With Google"
    return btn
} prependChildToElement(new SignIn(), document.getElementById('navlist'));

auth.onAuthStateChanged(checkCurrentUser);






