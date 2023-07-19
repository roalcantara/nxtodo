import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBmtdTWLEQA_pvH8EoNwnKbyRaaj0vUsW8',
  authDomain: 'tasks-cf5fa.firebaseapp.com',
  projectId: 'tasks-cf5fa',
  storageBucket: 'tasks-cf5fa.appspot.com',
  messagingSenderId: '888361163481',
  appId: '1:888361163481:web:35f0326ef0c3e26ad43cc8',
  measurementId: 'G-K62K610C6T'
}
const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)
const googleProvider = new GoogleAuthProvider()
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider)
    const user = res.user
    const q = query(collection(db, 'users'), where('uid', '==', user.uid))
    const docs = await getDocs(q)
    if (docs.docs.length === 0) {
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name: user.displayName,
        authProvider: 'google',
        email: user.email
      })
    }
  } catch (err) {
    console.error(err)
    alert(err ?? 'Something went wrong..')
  }
}
export { db, auth, signInWithGoogle }
