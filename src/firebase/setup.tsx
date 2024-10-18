
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyB7xniLLsKV2bdCsaRq3MkVSrcpsTrxPJs",
  authDomain: "olx-clonee-d7b74.firebaseapp.com",
  projectId: "olx-clonee-d7b74",
  storageBucket: "olx-clonee-d7b74.appspot.com",
  messagingSenderId: "91700710131",
  appId: "1:91700710131:web:c879fac1b2a77e0b244586"
};


const app = initializeApp(firebaseConfig);

export const auth=getAuth(app)

export const googleProvider=new GoogleAuthProvider()
