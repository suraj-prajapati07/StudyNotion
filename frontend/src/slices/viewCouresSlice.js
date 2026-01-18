import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    courseData: null,
    courseSectionData: [],
    completedLecture: [],
    totalNoOfLecture: 0,
}

const viewCourseSlice = createSlice({
    name: "viewCourse",
    initialState,
    reducers: {
        setCourseData: (state, action) => {
            state.courseData = action.payload;
        },
        setCourseSectionData: (state, action) => {
            state.courseSectionData = action.payload;
        },
        setCompletedLecture: (state, action) => {
            state.completedLecture = action.payload;
        },
        updateCompletedLecture: (state, action) => {
            state.completedLecture = [...state.completedLecture, action.payload];
        },
        setTotalNoOfLecture: (state, action) => {
            state.totalNoOfLecture = action.payload;
        }
    }
})

export const {
    setCourseData,
    setCourseSectionData,
    setCompletedLecture,
    updateCompletedLecture,
    setTotalNoOfLecture
} = viewCourseSlice.actions;

export default viewCourseSlice.reducer;