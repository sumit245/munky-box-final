import * as firebase from 'firebase';
import '@firebase/auth';
const firebaseConfig = {
    apiKey: "AIzaSyDOF5LEigYei-eHd0paS4Rwrf8HlxeDE98",
    authDomain: "munkybox-27525.firebaseapp.com",
    databaseURL: "https://munkybox-27525-default-rtdb.firebaseio.com/",
    projectId: "munkybox-27525",
    appId: "1:511551702515:android:91002204e01d0bdafffe86",
    
};
firebase.initializeApp(firebaseConfig);
export default firebase;