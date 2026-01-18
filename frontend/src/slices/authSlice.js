import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    //signup
    signupData: null,
    //token from local storage or set null..
    token : localStorage.getItem("token")? JSON.parse(localStorage.getItem("token")) : null,
    //loading...
    loading: false,

}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers:{
        setSignupData(state, value){
            state.signupData = value.payload;
        },
        setToken(state, value){
            state.token = value.payload;
        },
        setLoading(state, value){
            state.loading = value.payload;
        }
    }
});

export const{setSignupData, setToken, setLoading} = authSlice.actions;
export default authSlice.reducer;