import { configureStore } from '@reduxjs/toolkit'
import isAuthSlice from './slices/isAuth'
export const store = configureStore({
  reducer: {
    isAuthSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch