import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    step: 1,
    course: null,
    isEditCourse: false,
    isPaymentLoading: false,
}
const courseSlice = createSlice({
    name: "course",
    initialState: initialState,
    reducers:{
        //step changer
        setStep: (state, action) => {
            state.step = action.payload;
        },
        //course changer
        setCourse: (state, action) => {
            state.course = action.payload;
        },
        //isEditCourse changer
        setIsEditCourse: (state, action) => {
            state.isEditCourse = action.payload;
        },
        //isPaymentLoading changer
        setIsPaymentLoading: (state, action) => {
            state.isPaymentLoading = action.payload;
        },

        //reset course 
        resetCourseState: (state) => {
            state.step = 1
            state.course = null
            state.isEditCourse = false
        },

    }

})

export const {
    setStep, setCourse, setIsEditCourse, setIsPaymentLoading, resetCourseState
} = courseSlice.actions;

export default courseSlice.reducer;