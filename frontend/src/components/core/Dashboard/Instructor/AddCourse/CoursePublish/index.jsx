import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {MdNavigateNext} from "react-icons/md";
import IconButton from "../../../../../common/IconButton";
import { resetCourseState, setCourse, setStep } from "../../../../../../slices/courseSlice";
import { COURSE_STATUS } from "../../../../../../utils/constants";
import { editCourseDetails } from "../../../../../../services/operations/courseApi";
import { useNavigate } from "react-router-dom";

const CoursePublish = () => {
    const {token} = useSelector((state) => state.auth);
    const {course} = useSelector((state) => state.course);

    const[loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: {errors}
    } = useForm();

    useEffect(() => {
        //Set checked if course is already in published state.
        if(course?.status === COURSE_STATUS.PUBLISHED){
            setValue("publish", true);
        }
    }, []);

    const goToMyCourses = () => {
        dispatch(resetCourseState());
        navigate("/dashboard/my-courses");
    }

    const submitHandler = async() => {
        //Case:1 (a)form has been not updated, (b)course is already in published state
        if(
            (course?.status === COURSE_STATUS.DRAFT && getValues("punlish") === false) || 
            (course?.status === COURSE_STATUS.PUBLISHED && getValues("publish") === true)){
            // no need to make api call
            goToMyCourses();
            return;
        }

        //Case-2: when new course is being publish
        const formData = new FormData();
        formData.append("courseId", course._id);
        const courseStatus = getValues("publish")? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
        formData.append("status", courseStatus);

        //API call
        setLoading(true);
        const response = await editCourseDetails(formData, token);
        if(response){
            dispatch(setCourse(response));
            //Go to my courses
            goToMyCourses();
        }
        setLoading(false);

    }

    return(
        <div className="rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
            <p className="text-2xl font-semibold text-richblack-5">
                Publish Course
            </p>
            <form onSubmit={handleSubmit(submitHandler)}>
                <div className="my-6 mb-8">
                    <label htmlFor="publish" className="flex items-center">
                        <input
                            id="publish"
                            type="checkbox"
                            {...register("publish")}
                            className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
                        />
                        <span className="ml-2 text-richblack-400">
                            Make this course as public
                        </span>
                    </label>    
                </div>
                <div className="flex justify-end gap-x-4">
                    <button
                        onClick={() => dispatch(setStep(2))}
                        className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 px-2 py-1 tracking-wider uppercase font-semibold text-richblack-900"
                    >
                        Back
                    </button>
                    <IconButton
                        disabled={loading}
                        text="Save Changes"
                        type="submit"
                    />
                        
                </div>
            </form>
        </div>
    )
}

export default CoursePublish;