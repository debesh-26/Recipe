
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyC8SJrhaRYquy6srLc9dtc8aSm4FanCPUY",
    authDomain: "recipe-sharing-system-b13c7.firebaseapp.com",
    projectId: "recipe-sharing-system-b13c7",
    storageBucket: "recipe-sharing-system-b13c7.appspot.com",
    messagingSenderId: "378763636185",
    appId: "1:378763636185:web:f09eae7161ffb9e4397dc8",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
