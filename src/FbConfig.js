import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAiadDm5clJRWuZ7KoZre7Aasw9JpW2FKU",
    authDomain: "employe-management-syste-d7b18.firebaseapp.com",
    databaseURL:
        "https://employe-management-syste-d7b18-default-rtdb.firebaseio.com",
    projectId: "employe-management-syste-d7b18",
    storageBucket: "employe-management-syste-d7b18.appspot.com",
    messagingSenderId: "281978070754",
    appId: "1:281978070754:web:913019d0d94c85b7f220bb",
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export default db;
