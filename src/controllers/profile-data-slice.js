import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const submitPost = createAsyncThunk('submitPost', 
    async (_, thunkAPI) => {
        const {rejectWithValue, fulfillWithValue} = thunkAPI;
        const {postData} = thunkAPI.getState().profileSlice;

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

            if (hasEmptyValues(postData)) {
                throw new Error(`${hasEmptyValues(postData)} can not be empty.`);
            }

            const res = await axios({
                method: 'post',
                url: 'http://localhost:8000/user/post-api/create-post',
                data: {
                    ...postData
                },
                withCredentials: true
            });
            return fulfillWithValue(res.data);
        } catch (error) {
            if (error.message === 'Request failed with status code 400') {
                return  rejectWithValue(error.response.data.error);
            }
            if (error.message === 'message can not be empty.') {
                return  rejectWithValue(error.message);
            }
        }
        
    })


const initialState = {
    userProfileData: [],
    userPosts: [],
    postError: [false,''],
    isPosting: false,
    isLoading: false,
    isPostSubmitComplete: false,
    postData: {message: ''}
    
}

const profileSlice = createSlice({
    name: 'profileSlice',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.userProfileData = [];
            state.userProfileData.push(action.payload);
        },
        setPostData: (state, action) => {
            const {name} = action.payload;
            const {value} = action.payload;

            state.postData[name] = value;
        },
        setUserPosts: (state, action) => {
            state.userPosts = [];
            const {posts} = action.payload;
            state.userPosts.push(...posts);
        },
        setIsPostingOn: (state) => {
            state.isPosting = true;
        },
        setIsPostingOff: (state) => {
            state.isPosting = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(submitPost.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(submitPost.fulfilled, (state, action) => {
            state.userPosts = [];
            const {posts} = action.payload;
            state.isLoading = false;
            state.isPosting = false;
            state.userPosts.push(...posts);
            state.postData = {message: ''}
        } )
        builder.addCase(submitPost.rejected, (state, action) => {
            state.isLoading = false
            const error = action.payload;
            state.postError[0] = true;
            state.postError[1] = error;
        })
    }
})

const {reducer, actions} = profileSlice;

export const {setUser, setPostData, setIsPostingOff, setIsPostingOn, setUserPosts} = actions;
export default reducer;