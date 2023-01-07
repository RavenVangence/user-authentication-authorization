import { configureStore } from '@reduxjs/toolkit'

import createUserDataReducer from '../controllers/create-user-data-slice.js';
import loginUserDataReducer from '../controllers/login-data-slice.js';
import profileDataReducer from '../controllers/profile-data-slice'
import logOutReducer from '../controllers/logout-data-slice'

export const store = configureStore({
  reducer: {
    createUserSlice: createUserDataReducer,
    loginSlice: loginUserDataReducer,
    profileSlice: profileDataReducer,
    logoutSlice: logOutReducer
  },
  //  middleware: getDefaultMiddleware =>
  //   getDefaultMiddleware({
  //     serializableCheck: false,
  //   }),
})