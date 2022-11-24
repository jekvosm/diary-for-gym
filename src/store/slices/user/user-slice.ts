import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Timestamp } from 'firebase/firestore'
import {
  AdditionalInformation,
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  UserData,
} from '../../../utils/firebase/firebase.utils'

export const signInWithGoogle = createAsyncThunk<
  undefined,
  undefined,
  { rejectValue: string }
>('user/signInWithGoogle', async (_, { rejectWithValue }) => {
  try {
    const { user } = await signInWithGooglePopup()

    await createUserDocumentFromAuth(user)
  } catch (error) {
    const { message } = error as Error
    return rejectWithValue(message)
  }
})

export const signUpWithEmailAndPassword = createAsyncThunk<
  undefined,
  {
    email: string
    password: string
  } & AdditionalInformation,
  { rejectValue: string }
>(
  'user/signUpWithEmailAndPassword',
  async (
    { email, password, ...additionalInformation },
    { rejectWithValue }
  ) => {
    try {
      const userCredential = await createAuthUserWithEmailAndPassword(
        email,
        password
      )

      if (userCredential) {
        const { user } = userCredential
        await createUserDocumentFromAuth(user, { ...additionalInformation })
      }
    } catch (error) {
      const { message } = error as Error
      return rejectWithValue(message)
    }
  }
)

type UserState = {
  currentUser: UserData | null
  status: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState: UserState = {
  currentUser: null,
  status: 'idle',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(signUpWithEmailAndPassword.pending, state => {
        state.status = 'pending'
      })
      .addCase(signUpWithEmailAndPassword.fulfilled, (state, action) => {
        state.status = 'succeeded'
      })
      .addCase(signUpWithEmailAndPassword.rejected, state => {
        state.status = 'failed'
      })
  },
})

export default userSlice.reducer
