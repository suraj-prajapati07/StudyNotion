import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {RxCross2} from "react-icons/rx";
import { useSelector } from "react-redux";
import ReactStars from "react-stars";
import IconButton from "../../common/IconButton";
import {createRatingAndReview} from "../../../services/operations/courseApi"

const CourseReviewModal = ({setReviewModal}) => {
    const{user} = useSelector((state) => state.profile);
    const{token} = useSelector((state) => state.auth);
    const {courseData} = useSelector((state) => state.viewCourse)

    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors}
    } = useForm();

    const[loading, setLoading] = useState(false);

    //On first render
    useEffect(() => {
        setValue("courseRating", 0);
        setValue("courseExperience", "");
    }, [])

    const ratingChanged = (newRating) => {
        setValue("courseRating", newRating);
    }

    const submitHandler = async(data) => {
        setLoading(true);
        try{
            await createRatingAndReview(
                {
                    rating: data.courseRating,
                    review: data.courseExperience,
                    courseId: courseData?._id
                },
                token
            );
        }
        catch(error){
            console.log("Could not create Rating and Review",error);
        }
        setLoading(false);
        //close modal
        setReviewModal(false);
    }


    return(
        <div className="fixed inset-0 h-screen w-screen grid place-items-center bg-white bg-opacity-10 backdrop-blur-sm !mt-0 overflow-auto z-[1000]">
            <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
                {/* Modal header */}
                <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
                    <p className="text-xl font-semibold text-richblack-5">
                        Add Review
                    </p>
                    <button
                        onClick={() => (!loading && setReviewModal(false))}
                    >
                        <RxCross2 className="text-2xl text-richblack-5" />
                    </button>
                </div>
                {/* Modal body */}
                <div className="p-6">
                    <div className="flex items-center justify-center gap-x-4">
                        <img
                            src={user?.image}
                            alt={`${user?.firstName} profile`}
                            className="aspect-square w-[50px] rounded-full object-cover"
                        />
                        <div>
                            <p className="font-semibold text-richblack-5">
                                {user?.firstName} {user?.lastName}
                            </p>
                            <p className="text-sm text-richblack-5">Posting Publicly</p>
                        </div>
                    </div>
                </div>
                {/* Form */}
                <form
                    onSubmit={handleSubmit(submitHandler)}
                    className="mt-6 flex flex-col items-center pb-3"
                >
                    {/* stars */}
                    <ReactStars
                        count={5}
                        size={40}
                        onChange={ratingChanged}
                        activeColor="#ffd700"
                        color="#ffffff" 
                    />
                    {/* review */}
                    <div className="flex w-11/12 flex-col space-y-2">
                        <label htmlFor="courseExperience" className="text-sm text-richblack-5">
                            Add Your Experience <sup className="text-pink-200">*</sup>
                        </label>
                        <textarea
                            id="courseExperience"
                            placeholder="Add Your Experience"
                            {...register("courseExperience",{required:true})}
                            className="form-style resize-x-none min-h-[130px] w-full"
                        />
                        {errors.courseExperience && (
                            <span className="ml-2 text-xs tracking-wide text-pink-200">
                                Please Add Your Experience
                            </span>
                        )}
                    </div>
                    {/* btn */}
                    <div className="mt-6 w-11/12 flex justify-end gap-x-2 items-baseline">
                        {/* cancel */}
                        <button
                            type="button"
                            onClick={() => (!loading && setReviewModal(false))}
                            className="bg-richblack-300 py-[4px] px-[20px] font-semibold cursor-pointer text-richblack-900 uppercase flex items-center gap-x-2 rounded-md"
                        >
                            Cancel
                        </button>
                        <IconButton 
                            text="Save"
                            type="submit"
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}
export default CourseReviewModal;