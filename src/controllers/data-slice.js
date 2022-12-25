import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import axios from 'axios';

export const postData = createAsyncThunk('postFormData', 
  async (_,thunkAPI) => {
    try {
      const res = await axios('http://localhost:8000/user/create-user');
      return res.data;
    } catch (error) {
      return  thunkAPI.rejectWithValue(error)
    }
  } )

const initialState = {
    userLogState : false,
    formData: {
      firstname: '',
      lastname: '',
      email: '',
      username: '',
      usernameID: '',
      password: '' }
}
const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setUserLoggedIn: (state, action) => {
      
      state.userLogState = !state.userLogState;
    },
    setFormData: (state, action) => {
      const name = action.payload.name;
      const value = action.payload.value;

      state.formData[name] = value;
    },
    submitCreateUserForm: async (state) => {

    }
  },
  extraReducers: {
    [postData.pending]: (state) => {

    },
    [postData.fulfilled]: () => {

    },
    [postData.rejected]: () => {

    }
  }
})

// Extract the action creators object and the reducer
const { actions, reducer } = dataSlice;
// Extract and export each action creator by name
export const { setUserLoggedIn, setFormData, submitCreateUserForm} = actions;
// Export the reducer, either as a default or named export
export default reducer;