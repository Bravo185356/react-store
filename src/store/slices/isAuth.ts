import { createSlice } from '@reduxjs/toolkit'

interface isAuth {
    isAuth: boolean
}

const initialState: isAuth = {
  isAuth: false,
}

const isAuthSlice = createSlice({
  name: 'isAuth',
  initialState,
  reducers: {
    setIsAuth(state, actions) {
      state.isAuth = actions.payload
    }
  },
})

export const { setIsAuth } = isAuthSlice.actions
export default isAuthSlice.reducer