import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from 'axios';

export const postData = createAsyncThunk('postFormData', 
  async (_,thunkAPI) => {
    const {rejectWithValue, fulfillWithValue} = thunkAPI;
    const {formData} = thunkAPI.getState().createUserSlice;


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
              throw new Error('Invalid Email Address!');
            }
      const res = await axios({
        method: 'post',
        url: 'https://user-authentication-authorization.vercel.app/user/create-user',
        data: {
          ...formData
        },
        withCredentials: true,
      }
      );
      
      return fulfillWithValue(res.data); 
    } catch (error) {
      if (error.message === 'Request failed with status code 400') {
        return rejectWithValue(error.response.data.error);
      }
      if (error.message === 'firstname can not be empty.' || 'lastname can not be empty.' || 'email can not be empty.' || 'username can not be empty.' || '@usernameid can not be empty.' || 'password can not be empty.' || 'Invalid Email Address!') {
        return rejectWithValue(error.message);
      } 
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
    isSubmitComplete: false,
    userData: {},
}


const dataSlice = createSlice({
  name: 'createUserSlice',
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
    },
    setIsUserCreatedOff: (state) => {
      state.isUserCreated.status = false;
    },
    setIsUserCreatedOn: (state) => {
      state.isUserCreated.status = true;
    },
    setIsSubmitComplete: (state) => {
      state.isSubmitComplete = true;
    },
    setIsSubmitCompleteOff: (state) => {
      state.isSubmitComplete = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(postData.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(postData.fulfilled, (state, action) => {
      const {userID} = action.payload;
      state.isLoading = false;
      state.isSubmitComplete = true;
      state.userData = {userID};
      state.isUserCreated.message = action.payload.message;

      state.formData = {
        firstname: '',
        lastname: '',
        email: '',
        username: '',
        usernameID: '',
        password: '' }
      
    })
    builder.addCase(postData.rejected, (state, action) => {
      state.isLoading = false;
      const error = action.payload;
      state.formError[0] = true;
      state.formError[1] = error;
    })
  }
})

// Extract the action creators object and the reducer
const { actions, reducer } = dataSlice;
// Extract and export each action creator by name
export const { setUserLoggedIn, setFormData, setErrorOff, submitCreateUserForm, setIsUserCreatedOff, setIsUserCreatedOn, setIsSubmitComplete, setIsSubmitCompleteOff} = actions;
// Export the reducer, either as a default or named export
export default reducer;