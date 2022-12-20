import { configureStore } from '@reduxjs/toolkit'
import dataReducer from '../controllers/data-slice.js'

const store = configureStore({
  reducer: {data: dataReducer,}
})
export default store;