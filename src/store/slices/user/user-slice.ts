import {
  createSlice,
  createAsyncThunk,
  isAnyOf,
  PayloadAction,
} from '@reduxjs/toolkit'
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
    const { message, code } = error as NodeJS.ErrnoException

    if (code === 'auth/popup-closed-by-user') {
      return rejectWithValue('Sign in with Google cancled by user.')
    }
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
      const { message, code } = error as NodeJS.ErrnoException
      if (code === 'auth/email-already-in-use') {
        return rejectWithValue('Email already in use.')
      }
      return rejectWithValue(message)
    }
  }
)

export const signInWithEmailAndPassword = createAsyncThunk<
  void,
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
      const { message, code } = error as NodeJS.ErrnoException
      switch (code) {
        case 'auth/wrong-password':
          return rejectWithValue('Wrong password.')
        case 'auth/user-not-found':
          return rejectWithValue('User not found.')
      }
      return rejectWithValue(message)
    }
  }
)

export const signOutUser = createAsyncThunk<
  void,
  void,
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
  null | void,
  void,
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
  error: string
}

const initialState: UserState = {
  currentUser: null,
  status: 'idle',
  error: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
  },
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
        state => {
          state.status = 'succeeded'
          state.currentUser = null
          state.error = ''
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
          state.error = ''
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
        (state, action) => {
          state.status = 'failed'
          if (action.payload) state.error = action.payload
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
          state.error = ''
        }
      )
  },
})

export const { setErrorMessage } = userSlice.actions

export default userSlice.reducer
