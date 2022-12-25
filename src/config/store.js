import { configureStore } from '@reduxjs/toolkit'
import dataReducer from '../controllers/data-slice.js'

export const store = configureStore({
  reducer: {
    data: dataReducer
  },
  //  middleware: getDefaultMiddleware =>
  //   getDefaultMiddleware({
  //     serializableCheck: false,
  //   }),
})