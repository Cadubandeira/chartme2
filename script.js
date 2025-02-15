// Your web app's Firebase configuration
    // Copy and paste this configuration from the firebase console
    // This code can be found in step 9

const firebaseConfig = {
  apiKey: "AIzaSyDFAh_QfHaQqXIna07yHuHzN6EW4mGCtUE",
  authDomain: "chartme-2c4aa.firebaseapp.com",
  projectId: "chartme-2c4aa",
  storageBucket: "chartme-2c4aa.firebasestorage.app",
  messagingSenderId: "1000796548418",
  appId: "1:1000796548418:web:c891c61205cdf404f1ecdb",
  measurementId: "G-T2686T1ETY"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const loginForm = document.getElementById('login-form');
const messageDiv = document.getElementById('message');
const userInfoDiv = document.getElementById('user-info');
const userEmailSpan = document.getElementById('user-email');
const logoutButton = document.getElementById('logout-button');
const redirectURL = 'dashboard.html'; // Changed the redirect to dashboard
 const loadingOverlay = document.getElementById('loading-overlay');
    const snackbar = document.getElementById('snackbar');
      const body = document.body;


function showMessage(message, isError=false){
  messageDiv.innerText = message;
  messageDiv.style.color = isError ? 'red' : 'green';
  messageDiv.style.display = 'block';
}


function hideMessage(){
  messageDiv.style.display = 'none';
}
 function showLoading() {
    loadingOverlay.classList.add('show');
}

function hideLoading() {
    loadingOverlay.classList.remove('show');
}
 function showSnackbar(message, isError = false) {
       if(!snackbar){
           return;
        }
      snackbar.innerHTML = `${message} <button onclick="hideSnackbar()">Fechar</button>`;
        snackbar.classList.add('show');
        snackbar.classList.toggle('error', isError);
         setTimeout(() => {
        snackbar.classList.remove('show');
        snackbar.classList.remove('error');
         }, 3000);
    }


   function hideSnackbar() {
       if(snackbar){
             snackbar.classList.remove('show');
            snackbar.classList.remove('error');
       }

    }


// Login
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
    hideMessage();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  try {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
        // Redirect after successful login
          hideLoading();
         window.location.href = redirectURL;


  } catch(error){
      if (error.code === 'auth/invalid-credential') {
           showSnackbar('Usuário ou senha incorretos.', true);
         } else {
           showMessage(error.message, true);
            showLoading();
         }
     hideLoading();
  }
});

logoutButton.addEventListener('click', async () => {
  try {
    await auth.signOut();
       showMessage("User logged out", false)
  } catch (error) {
     showMessage(error.message, true);
  }
});

auth.onAuthStateChanged((user) => {
    if(user){
         // Redirect after successful login
             showLoading();
              window.location.href = redirectURL;
             hideLoading();
    }
      body.classList.add('gradient-1'); // set initial gradient
});
    body.classList.add('gradient-1'); // set initial gradient
        document.getElementById('login-email').addEventListener('input', hideSnackbar);
        document.getElementById('login-password').addEventListener('input', hideSnackbar);