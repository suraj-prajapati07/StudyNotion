import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Spinner from "../../../../common/Spinner";
import RenderSteps from "../AddCourse/RenderSteps";
import { setCourse, setIsEditCourse } from "../../../../../slices/courseSlice";
import { getAuthenticatedFullCourseDetails } from "../../../../../services/operations/courseApi";

const EditCourse = () => {

    const {token} = useSelector((state) => state.auth);
    const{course} = useSelector((state) => state.course);

    const[loading, setLoading] = useState(false);
    const {courseId} = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchFullCourseDetails = async() => {
            setLoading(true);
            const response = await getAuthenticatedFullCourseDetails(courseId, token);
            if(response){
                dispatch(setIsEditCourse(true));
                dispatch(setCourse(response?.courseDetails));
            }
            setLoading(false);
        }
        //call
        fetchFullCourseDetails();
    },[])


    if(loading){
        return(
            <Spinner/>
        )
    }
    
    return(
        <div>
            <h1 className="mb-14 text-3xl font-medium text-richblack-5">
                Edit Course
            </h1>
            <div className="mx-auto max-w-[600px]">
                {course ? (
                        <RenderSteps/>
                    ) : (
                        <p className="mt-14 text-center text-3xl font-semibold text-richblack-100">
                            Course not found
                        </p>
                    )
                }
            </div>
        </div>
    )
}

export default EditCourse;