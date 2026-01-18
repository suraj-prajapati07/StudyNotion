import React from 'react'
import toast from 'react-hot-toast'
import { courseEndpoints, ratingAndReviewEndpoints } from '../apis'
import { apiConnector } from '../apiConnector';

const {
    COURSE_CATEGORIES_API,
    CREATE_COURSE_API,
    EDIT_COURSE_API,
    DELETE_COURSE_API,
    CREATE_SECTION_API,
    UPDATE_SECTION_API,
    DELETE_SECTION_API,
    CREATE_SUBSECTION_API,
    UPDATE_SUBSECTION_API,
    DELETE_SUBSECTION_API,
    GET_ALL_INSTRUCTOR_COURSES_API,
    GET_COURSE_DETAILS_API,
    GET_AUTHENTICATED_FULL_COURSE_DETAILS_API,
    UPDATE_COURSE_PROGRESS_API,
} = courseEndpoints;

const {
    CREATE_RATING_REVIEW_API,
    GET_ALL_RATING_REVIEW_API,
} = ratingAndReviewEndpoints;

//----------------------------Get all course category -------------------------------------
export async function getCourseCategories() {
    let result = [];
    try{
        const response = await apiConnector("GET", COURSE_CATEGORIES_API);
        //if response  get fail
        if(!response?.data?.success){
            throw new Error(response.data.message);
        }
        result = response?.data?.data;
    }
    catch(error){
        console.log("COURSE_CATEGORIES_API ERROR--------------------------",error);
        toast.error(error.message);
    }
    return result;
}

//--------------------------Create course [add course details]---------------------------------------
export async function addCourseDetails(formData, token){
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", CREATE_COURSE_API, formData, 
            {
                "Content-Type": "multipart/form-data", 
                Authorization: `Bearer ${token}`,
            }
        );

        //if response get fail
        if(!response?.data?.success){
            throw new Error(response?.data?.message);
        }
        //success message
        toast.success("Course Details Added Successfully")
        result = response?.data?.data;
    } 
    catch (error) {
        console.log("CREATE_COURSE_API ERROR---------------------", error);
        toast.error(error.message);
    }

    toast.dismiss(toastId);
    return result;
}

//--------------------------Edit course [edit course details]---------------------------------------
export async function editCourseDetails(formData, token){
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", EDIT_COURSE_API, formData, 
            {
                "Content-Type": "multipart/form-data", 
                Authorization: `Bearer ${token}`,
            }
        );

        //if response get fail
        if(!response?.data?.success){
            throw new Error("Could Not Update Course Details");
        }
        //success message
        toast.success("Course Details Updated Successfully")
        result = response?.data?.data;
    } 
    catch (error) {
        console.log("EDIT_COURSE_API ERROR---------------------", error);
        toast.error(error.message);
    }

    toast.dismiss(toastId);
    return result;
}


//--------------------------Delete course ---------------------------------------
export async function deleteCourse(data, token){
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("DELETE", DELETE_COURSE_API, data, 
            {
                Authorization: `Bearer ${token}`,
            }
        );
        if(!response?.data?.success){
            throw new Error("Could Not Delete Course");
        }
        toast.success(response.data.message);
    } 
    catch (error) {
        console.log("DELETE_COURSE_API ERROR---------------------", error);
        toast.error(error.message);
    }

    toast.dismiss(toastId);
}


//----------------------------------------Add section----------------------------------------------
export async function createSection(data, token){
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", CREATE_SECTION_API, data,
            {
                Authorization: `Bearer ${token}`
            }
        );

        if(!response?.data?.success){
            throw new Error(response.data.message);
        }
        toast.success(response.data.message);
        result = response.data.data;
    } 
    catch (error) {
        console.log("CREATE_SECTION_API ERROR-----------------------------",error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

//----------------------------------------Update section----------------------------------------------
export async function updateSection(data, token){
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", UPDATE_SECTION_API, data,
            {
                Authorization: `Bearer ${token}`
            }
        );

        if(!response?.data?.success){
            throw new Error(response.data.message);
        }
        toast.success(response.data.message);
        result = response.data.data;
    } 
    catch (error) {
        console.log("UPDATE_SECTION_API ERROR-----------------------------",error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

//----------------------------------------Delete section----------------------------------------------
export async function deleteSection(data, token){
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", DELETE_SECTION_API, data,
            {
                Authorization: `Bearer ${token}`
            }
        );

        if(!response?.data?.success){
            throw new Error("Could Not Update Lecture")
        }
        toast.success("Lecture Updated Successfully");
        result = response.data.data;
    } 
    catch (error) {
        console.log("DELETE_SECTION_API ERROR-----------------------------",error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

//----------------------------------------Add Subsection----------------------------------------------
export async function addSubSection(data, token){
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", CREATE_SUBSECTION_API, data,
            {
                Authorization: `Bearer ${token}`
            }
        );

        if(!response?.data?.success){
            throw new Error("Could Not Add Lecture")
        }
        toast.success("Lecture Added Successfully");
        result = response.data.data;
    } 
    catch (error) {
        console.log("CREATE_SUBSECTION_API ERROR-----------------------------",error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

//----------------------------------------Update Subsection----------------------------------------------
export async function updateSubSection(data, token){
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data,
            {
                Authorization: `Bearer ${token}`
            }
        );

        if(!response?.data?.success){
            throw new Error("Could Not Update Lecture")
        }
        toast.success("Lecture Updated Successfully");
        result = response.data.data;
    } 
    catch (error) {
        console.log("UPDATE_SUBSECTION_API ERROR-----------------------------",error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

//----------------------------------------Delete Subsection----------------------------------------------
export async function deleteSubSection(data, token){
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", DELETE_SUBSECTION_API, data,
            {
                Authorization: `Bearer ${token}`
            }
        );

        if(!response?.data?.success){
            throw new Error("Could Not Delete Lecture")
        }
        toast.success("Lecture Deleted Successfully");
        result = response.data.data;
    } 
    catch (error) {
        console.log("DELETE_SUBSECTION_API ERROR-----------------------------",error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}


//------------------------------------------------------------------------------------------------------
// fetching all courses under a specific instructor
export const fetchInstructorCourses = async (token) => {
    let result = [];
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("GET", GET_ALL_INSTRUCTOR_COURSES_API, null,
            {
                Authorization: `Bearer ${token}`
            }
        );

        if(!response?.data?.success){
            throw new Error("Could Not Fetch Instructor Courses")
        }
        result = response.data.data;
    }
    catch(error){
        console.log("GET_ALL_INSTRUCTOR_COURSES_API ERROR-----------------------------",error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

//Get single course details without videoUrl (Unauthenticated)
export async function getCourseDetails(courseId){
    const toastId = toast.loading("Loading...");
    let result = null;
    try{
        const response = await apiConnector("POST", GET_COURSE_DETAILS_API, {courseId});
        if(!response?.data?.success){
            throw new Error(response.data.message);
        }
        result = response.data;
    }
    catch(error){
        console.log("GET_COURSE_DETAILS_API ERROR-----------------",error);
        result = error.response.data;
    }
    toast.dismiss(toastId);
    return result;
}

//Get authenticated course details
export const getAuthenticatedFullCourseDetails = async(courseId, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", GET_AUTHENTICATED_FULL_COURSE_DETAILS_API,
            {courseId},
            {Authorization: `Bearer ${token}`}
        );
        
        if(!response?.data?.success){
            throw new Error(response.data.message);
        }
        result = response.data.data;
    } 
    catch (error) {
        console.log("COURSE_FULL_DETAILS_API API ERROR............", error)
        result = error.response.data
    }
    toast.dismiss(toastId);
    // console.log("printing result",result);
    return result;
}


//Update course completed lecture
export const markLectureCompleted = async(data, token) => {
    const toastId = toast.loading("Loading...");
    let result = false;
    try{
        const response = await apiConnector("POST", UPDATE_COURSE_PROGRESS_API, data,
            {
                Authorization: `Bearer ${token}`
            }
        )
        console.log("UPDATE_COURSE_PROGRESS_API response : ",response);
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        toast.success("Lecture Completed")
        result = true
    }
    catch(error){
        console.log("UPDATE_COURSE_PROGRESS_API ERROR-------",error);
        toast.error(error.message);
        result = false;
    }
    toast.dismiss(toastId);
    return result;
}

//Create rating and review
export const createRatingAndReview = async(data, token) => {
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("POST", CREATE_RATING_REVIEW_API, data,
            {
                Authorization: `Bearer ${token}`
            }
        )
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        toast.success(response.data.message);
    }
    catch(error){
        console.log("CREATE_RATING_REVIEW_API ERROR-------",error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
}

//Fetch All Rating and Review
export const getAllRatingReviews = async() => {
    let result = null;
    try{
        const response = await apiConnector("GET", GET_ALL_RATING_REVIEW_API);
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        result = response?.data?.data;
    }
    catch(error){
        console.log("CREATE_RATING_REVIEW_API ERROR-------",error);
    }
    return result;
}