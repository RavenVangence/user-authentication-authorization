import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const submitLoginForm = createAsyncThunk('postLoginForm', 
    async(_,thunkAPI, ) => {
        const {rejectWithValue, fulfillWithValue} = thunkAPI;
        const {loginFormData} = thunkAPI.getState().loginSlice;

        //check if object is empty
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
            if (hasEmptyValues(loginFormData)) {
                throw new Error(`${hasEmptyValues(loginFormData)} can not be empty.`);
            }

            const res = await axios({
                method: 'post',
                url: 'http://localhost:8000/user/login',
                data: {
                ...loginFormData
                },
                withCredentials: true,
            })
            return fulfillWithValue(res.data);
        } catch (error) {
            console.log(error.message);
            if (error.message === 'Request failed with status code 400') {
                return  rejectWithValue(error.response.data.error);
            }
            if (error.message === 'usernameID can not be empty.' || 'password can not be empty.') {
                return  rejectWithValue(error.message);
            }
            
        }
        
    }
)
const initialState = {
    loginFormData: {
        usernameID: '',
        password: ''
    },
    isLoading: false,
    formError: [false, ''],
    userLoginData: {},
    isUserLoggedIn: {status: false, message: ''},
    isLoginSubmitComplete: false
}

const loginDataSlice = createSlice({
    name: 'loginSlice',
    initialState,
    reducers: {
        setLoginFormData: (state, action) => {
            const {name, value} = action.payload;

            state.loginFormData[name] = value;
        },
        setLoginErrorOff: (state) => {
            state.formError[0] = false;
            state.formError[1] = ''
        },
        setIsUserLoggedInOn: (state) => {
            state.isUserLoggedIn.status = true;
        },
        setIsUserLoggedInOff: (state) => {
            state.isUserLoggedIn.status = false;
        },
        setIsLoginSubmitComplete: (state) => {
            state.isLoginSubmitComplete = true;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(submitLoginForm.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(submitLoginForm.fulfilled, (state, action) => {
            const {userID, refreshToken} = action.payload;

            state.isLoading = false;
            state.userLoginData = {userID,  refreshLoginToken: refreshToken};
            state.loginFormData = {
                usernameID: '',
                password: ''}
            state.isUserLoggedIn.status = true;
        })
        builder.addCase(submitLoginForm.rejected, (state, action) => {
            state.isLoading = false
            state.isUserLoggedIn.status = true;
            state.formError[0] = true;
            state.formError[1] = action.payload;
        })
    }
});


// Extract the action creators object and the reducer
const { actions, reducer } = loginDataSlice;
// Extract and export each action creator by name
export const { setLoginFormData, setLoginErrorOff, setIsUserLoggedInOff, setIsLoginSubmitComplete, setIsUserLoggedInOn } = actions;
// Export the reducer, either as a default or named export
export default reducer;