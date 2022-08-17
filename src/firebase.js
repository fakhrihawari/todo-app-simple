import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIRE_BASE_CONFIG_apiKey,
    authDomain: process.env.REACT_APP_FIRE_BASE_CONFIG_authDomain,
    projectId: process.env.REACT_APP_FIRE_BASE_CONFIG_projectId ,
    storageBucket: process.env.REACT_APP_FIRE_BASE_CONFIG_storageBucket,
    messagingSenderId: process.env.REACT_APP_FIRE_BASE_CONFIG_messagingSenderId,
    appId: process.env.REACT_APP_FIRE_BASE_CONFIG_appId
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  const storage = firebase.storage();

  export { auth, provider, storage};
  export default db;