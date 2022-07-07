import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
import { getFirestore, collection, getDocs, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-firestore.js";
import { buildCards, addEvent } from "./index.js";

// FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyAILpxBM0nojZL1Z-vGY76h6Md7kFlRtl0",
  authDomain: "e-commerce-zapatillas.firebaseapp.com",
  projectId: "e-commerce-zapatillas",
  storageBucket: "e-commerce-zapatillas.appspot.com",
  messagingSenderId: "711995980432",
  appId: "1:711995980432:web:291d5b19856e8213903615"
};

// INITIALIZE FIREBASE
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


// FUNCTIONS
export const getProduct = async (id) => {

  const docRef = doc(db, "modelos-zapatillas", `${id}`);

  const docSnap = await getDoc(docRef);

  return docSnap.data();

};

export const getProduct2 = async (id) => {

  const docRef = doc(db, "modelos-zapatillas", `${id}`);

  const docSnap = await getDoc(docRef);

  return docSnap;

};


export async function getProductsCards(node) {

  const querySnapshot = await getDocs(collection(db, "modelos-zapatillas"));

  querySnapshot.forEach((doc) => {

    buildCards(doc, node)

  });

  addEvent();

};
