import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit'
import { User } from 'firebase/auth'

import {
  AdditionalInformation,
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
  UserData,
  getUserDataFromUserSnapshot,
  signOutAuth,
  getUserAuth,
} from '../../../utils/firebase/firebase.utils'

type EmailAndPassword = {
  email: string
  password: string
}

export const signIn = createAsyncThunk<
  UserData | undefined,
  User,
  { rejectValue: string }
>('user/signIn', async (user, { rejectWithValue }) => {
  try {
    const userSnapshot = await createUserDocumentFromAuth(user)

    if (userSnapshot) {
      const userData = await getUserDataFromUserSnapshot(userSnapshot)
      return userData
    }
  } catch (error) {
    const { message } = error as Error
    return rejectWithValue(message)
  }
})

export const signInWithGoogle = createAsyncThunk<
  undefined,
  undefined,
  { rejectValue: string }
>('user/signInWithGoogle', async (_, { rejectWithValue, dispatch }) => {
  try {
    const { user } = await signInWithGooglePopup()

    await createUserDocumentFromAuth(user)

    dispatch(signIn(user))
  } catch (error) {
    const { message } = error as Error
    return rejectWithValue(message)
  }
})

export const signUpWithEmailAndPassword = createAsyncThunk<
  UserData | undefined,
  EmailAndPassword & AdditionalInformation,
  { rejectValue: string }
>(
  'user/signUpWithEmailAndPassword',
  async (
    { email, password, ...additionalDetails },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const userCredential = await createAuthUserWithEmailAndPassword(
        email,
        password
      )

      if (userCredential) {
        const { user } = userCredential

        await createUserDocumentFromAuth(user, {
          ...additionalDetails,
        })

        dispatch(signIn(user))
      }
    } catch (error) {
      const { message } = error as Error
      return rejectWithValue(message)
    }
  }
)

export const signInWithEmailAndPassword = createAsyncThunk<
  undefined,
  EmailAndPassword,
  { rejectValue: string }
>(
  'user/signInWithEmailAndPassword',
  async ({ email, password }, { rejectWithValue, dispatch }) => {
    try {
      const userCredential = await signInAuthUserWithEmailAndPassword(
        email,
        password
      )
      if (userCredential) {
        const { user } = userCredential

        dispatch(signIn(user))
      }
    } catch (error) {
      const { message } = error as Error
      return rejectWithValue(message)
    }
  }
)

export const signOutUser = createAsyncThunk<
  undefined,
  undefined,
  { rejectValue: string }
>('user/signOutUser', async (_, { rejectWithValue }) => {
  try {
    await signOutAuth()
  } catch (error) {
    const { message } = error as Error
    return rejectWithValue(message)
  }
})

export const checkUserSession = createAsyncThunk<
  null | undefined,
  undefined,
  { rejectValue: string }
>('user/checkUserSession', async (_, { rejectWithValue, dispatch }) => {
  try {
    const user = await getUserAuth()

    if (!user) return user

    dispatch(signIn(user))
  } catch (error) {
    const { message } = error as Error
    return rejectWithValue(message)
  }
})

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
      .addCase(signIn.fulfilled, (state, action) => {
        state.status = 'succeeded'
        if (action.payload) {
          state.currentUser = action.payload
        }
      })
      .addMatcher(
        isAnyOf(signOutUser.fulfilled, checkUserSession.fulfilled),
        (state, action) => {
          state.status = 'succeeded'
          state.currentUser = null
        }
      )
      .addMatcher(
        isAnyOf(
          signInWithGoogle.pending,
          signInWithEmailAndPassword.pending,
          signUpWithEmailAndPassword.pending,
          signIn.pending,
          signOutUser.pending,
          checkUserSession.pending
        ),
        state => {
          state.status = 'pending'
        }
      )
      .addMatcher(
        isAnyOf(
          signInWithGoogle.rejected,
          signInWithEmailAndPassword.rejected,
          signUpWithEmailAndPassword.rejected,
          signIn.rejected,
          signOutUser.rejected,
          checkUserSession.rejected
        ),
        state => {
          state.status = 'failed'
        }
      )
      .addMatcher(
        isAnyOf(
          signInWithGoogle.fulfilled,
          signInWithEmailAndPassword.fulfilled,
          signUpWithEmailAndPassword.fulfilled
        ),
        state => {
          state.status = 'succeeded'
        }
      )
  },
})

export default userSlice.reducer
