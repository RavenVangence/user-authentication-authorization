import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { redirect } from "react-router-dom"

export const postData = createAsyncThunk('postFormData', 
  async (_,thunkAPI) => {
    const {formData} = thunkAPI.getState().data;


    const validateEmail = (email) => {
      return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    };
    const hasEmptyValues = (obj) => {

      const emptyKeys = [];
      
      for (var key in obj) {
        if (obj.hasOwnProperty(key) && !obj[key]) {
          emptyKeys.push(key);
          return emptyKeys;
        }
      }
      return false;
    }

    try {
      
      if(hasEmptyValues(formData)) {

        throw new Error(`${hasEmptyValues(formData)} can not be empty.`);
      }
      if ( validateEmail(formData.email) === null) {
              throw new Error('Invalid Email Address!')
            }
      const res = await axios({
        method: 'post',
        url: 'http://localhost:8000/user/create-user',
        data: {
          ...formData
        }
      }
      );

      return res.data;
    } catch (error) {
      return  thunkAPI.rejectWithValue(error.message);
    }
  } )
  
const initialState = {
    formData: {
      firstname: '',
      lastname: '',
      email: '',
      username: '',
      usernameID: '',
      password: '' },
    formError: [false,''],
    isLoading: false,
    isUserCreated: {status: false, message: ''},
}
const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setFormData: (state, action) => {
      const name = action.payload.name;
      const value = action.payload.value;

      state.formData[name] = value;
    },
    setErrorOff: (state) => {
        state.formError[0] = false;
        state.formError[1] = '';
    }
  },
  extraReducers: (builder) => {
    builder.addCase(postData.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(postData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isUserCreated.status = true;
      state.isUserCreated.message = action.payload.message;
      state.formData = {
        firstname: '',
        lastname: '',
        email: '',
        username: '',
        usernameID: '',
        password: '' }
      redirect('/profile');
    })
    builder.addCase(postData.rejected, (state, action) => {
      state.isLoading = false;
      const error = action.payload;
      state.formError[0] = true;
      state.formError[1] = error;
      redirect('/create-user');
    })
  }
})

// Extract the action creators object and the reducer
const { actions, reducer } = dataSlice;
// Extract and export each action creator by name
export const { setUserLoggedIn, setFormData, setErrorOff, submitCreateUserForm} = actions;
// Export the reducer, either as a default or named export
export default reducer;