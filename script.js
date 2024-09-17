import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { getFirestore, doc, setDoc} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

const firebaseConfig = {
        apiKey: "AIzaSyC3O_tUUtufEGSZtswcR2-IPHQO79LQXeg",
        authDomain: "im2-dolor-firebase.firebaseapp.com",
        projectId: "im2-dolor-firebase",
        storageBucket: "im2-dolor-firebase.appspot.com",
        messagingSenderId: "1009627034561",
        appId: "1:1009627034561:web:eff8bb1e1997c62672f540"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", () => {
  
//SignUP Function
const signUpform = document.getElementById('signUpForm');
if (signUpform) {
  signUpform.addEventListener('submit', async  (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', email), {
        email: email
      })
      alert('You are now registered. Enjoy your stay');
      signUpform.reset();
    } catch (error) {
      alert(error.message);
    }
  })
};


//signIn Function
const signInForm = document.getElementById('signInForm');
if(signInForm) {
  signInForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('userEmail').value;
    const password = document.getElementById('userPassword').value;

    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      window.location.href = 'main.html';
      alert('You have successfully logged in to your account');
    }) .catch((error) => {
      alert(error.message);
    })
  })
};


//Logout Function
const logoutButton = document.getElementById('logout-button');
if (logoutButton) {
  logoutButton.addEventListener('click', () => {
    signOut(auth).then (() => {
      window.location.href = 'index.html';
      alert('You are now logging out. See you again');
    }) .catch((error) => {
      alert(error.message);
    })
  })
}

onAuthStateChanged(auth, (user) => {
  const mainPage = window.location.pathname === '/main.html';

  if (mainPage && !user) {
    window.location.href = 'index.html';
  } else if (user) {
    console.log('user logged in', user.email);
  }

});


})