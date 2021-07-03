import React from 'react';
import logo from './logo.svg';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import {useAuthState } from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyDDM5LElgD0B_BI8uVz6Xve8MUFzcKO4ms",
  authDomain: "third-runway-317015.firebaseapp.com",
  projectId: "third-runway-317015",
  storageBucket: "third-runway-317015.appspot.com",
  messagingSenderId: "114873357301",
  appId: "1:114873357301:web:1a1c0253d0bfb8b59106bc",
  measurementId: "G-4SW6P00WQK"
})



const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {

const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header">
        {user ? <ChatRoom /> : <SignIn />}
      </header>
    </div>
  );
}

function SignIn(){
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }


  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  )

}
function SignOut(){
  return auth.currentUser && (

    <button onClick={() => {auth.SignOut()}}>Sign Out</button>
  )
}

function ChatRoom(){
  const dummy = useRef();

  const messagesRef = firestroe.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, {idField: 'id'});

  const [formValue, setFormValue] = useState('');

  const sendMessage = async(e) => {
    e.preventDefault();

    const {uid, photoURL} = auth.currentUser;
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid, 
      photoURL
    });

    setFormValue('');

  dummy.current.scrollIntoView({behavior: 'smooth'});

  }

  return (
    <>
      <div>
        {messages && messages.map(msg => <ChatMessage key = {msg.id} message={msg} />)}

        <div ref={dummy}></div>
      </div>

      <form onSubmit={sendMessage}>
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)}/>
        <button type='submit'>Submit</button>
      </form>
    </>

  )
}

function ChatMessage(props){
  const {text, uid, photoURL} = props.message;

  const messageClass = (uid === auth.currentUser.uid) ? 'sent': 'recieved';

  return (
    <div className={'message '+ messageClass}>
      <img src ={photoURL} />
      <p>{text}</p>
    </div>
  )
}






export default App;
