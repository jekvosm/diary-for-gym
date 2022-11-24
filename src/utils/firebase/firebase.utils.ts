import { initializeApp } from 'firebase/app'

import {
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  User,
} from 'firebase/auth'

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  QueryDocumentSnapshot,
  Timestamp,
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCIANrEo-cHDlkEA9XVF98s-_ghN3VqCj8',
  authDomain: 'diary-for-gym-db.firebaseapp.com',
  projectId: 'diary-for-gym-db',
  storageBucket: 'diary-for-gym-db.appspot.com',
  messagingSenderId: '757779014306',
  appId: '1:757779014306:web:dfa37f5a9ae5945478adfb',
}

const firebaseApp = initializeApp(firebaseConfig)

const googleProvider = new GoogleAuthProvider()

googleProvider.setCustomParameters({
  prompt: 'select_account',
})

export const auth = getAuth()

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)

export const db = getFirestore()

export type AdditionalInformation = {
  displayName?: string
}

export type UserData = {
  createdAt: Date | Timestamp | string
  displayName: string
  email: string
}

export const createUserDocumentFromAuth = async (
  userAuth: User,
  additionalInformation = {} as AdditionalInformation
): Promise<QueryDocumentSnapshot<UserData> | void> => {
  if (!userAuth) return

  const userDocRef = doc(db, 'users', userAuth.uid)

  const userSnapshot = await getDoc(userDocRef)

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      })
    } catch (error) {
      console.log('error creating the user', error)
    }
  }

  return userSnapshot as QueryDocumentSnapshot<UserData>
}

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return
  return await createUserWithEmailAndPassword(auth, email, password)
}
