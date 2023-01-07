import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userLogStatus: false
}

const logoutSlice = createSlice({
    name: 'logoutSlice',
    initialState,
    reducers: {
        setLogIn: (state) => {
            state.userLogStatus = true;
        },
        setLogOut: (state) => {
            state.userLogStatus = false;
        }
    }
})

const {actions, reducer} = logoutSlice;

export const {setLogIn, setLogOut} = actions;
export default reducer; 