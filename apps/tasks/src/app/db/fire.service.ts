import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential
} from 'firebase/auth'
import {
  getFirestore,
  serverTimestamp,
  updateDoc,
  doc,
  setDoc,
  collection,
  query,
  onSnapshot,
  addDoc,
  deleteDoc
} from 'firebase/firestore'
import { SetStateAction } from 'react'
import { Task } from '../domain/task.model'

const firebaseConfig = {
  apiKey: 'AIzaSyBmtdTWLEQA_pvH8EoNwnKbyRaaj0vUsW8',
  authDomain: 'tasks-cf5fa.firebaseapp.com',
  projectId: 'tasks-cf5fa',
  storageBucket: 'tasks-cf5fa.appspot.com',
  messagingSenderId: '888361163481',
  appId: '1:888361163481:web:35f0326ef0c3e26ad43cc8',
  measurementId: 'G-K62K610C6T'
}

const collections = ['users', 'tasks'] as const
type Collection = (typeof collections)[number]
const firebaseApp = initializeApp(firebaseConfig)
export const db = getFirestore(firebaseApp)
export const auth = getAuth(firebaseApp)
const googleProvider = new GoogleAuthProvider()

export const signIn = (cred: UserCredential) => {
  const user = cred?.user
  if (!user) return

  return setDoc(doc(db, 'users', user.uid), {
    id: user.uid,
    displayName: user.displayName,
    authProvider: 'google',
    email: user.email,
    photoURL: user.photoURL,
    online: true,
    seen: serverTimestamp()
  }).catch(console.error)
}

export const signOut = async (id: string) =>
  updateDoc(doc(db, 'users', id), {
    online: false
  })
    .then(async () => {
      console.log('Document successfully updated!')
      auth.signOut().then(() => {
        console.log('User signed out.')
      })
    })
    .catch(console.error)

export const signInWithGoogle = async () => {
  const res = await signInWithPopup(auth, googleProvider)
  return signIn(res)
}

export const stream = <T>(
  collectionName: Collection,
  setItems: (value: SetStateAction<T[]>) => void
) =>
  onSnapshot(query(collection(db, collectionName)), qs =>
    setItems(
      qs.docs.map(
        document =>
          ({
            ...document.data(),
            id: document.id
          } as T)
      )
    )
  )

export const addTask = (props: Partial<Task>) =>
  addDoc(collection(db, 'tasks'), {
    title: props.title,
    status: props.status ?? 'open',
    email: auth.currentUser?.email,
    userId: auth.currentUser?.uid,
    user: auth.currentUser?.displayName,
    photoURL: auth.currentUser?.photoURL,
    timestamp: serverTimestamp()
  })

export const saveTask = (id: string, props: Partial<Task>) =>
  setDoc(
    doc(db, 'tasks', id),
    {
      ...props
    },
    { merge: true }
  )

export const removeTask = (id: string) => deleteDoc(doc(db, 'tasks', id))
