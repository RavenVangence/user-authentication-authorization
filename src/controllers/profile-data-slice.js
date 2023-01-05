import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userProfileData: [],
    userPosts: [],
    
}

const profileSlice = createSlice({
    name: 'profileSlice',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.userProfileData = [];
            state.userProfileData.push(action.payload);
        },
    }
})

const {reducer, actions} = profileSlice;

export const {setUser, } = actions;
export default reducer;