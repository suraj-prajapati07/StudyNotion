import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import ChipInput from "./ChipInput";
import Upload from "../Upload";
import Requirements from "./Requirements";
import { useDispatch, useSelector } from "react-redux"
import { setCourse, setStep } from "../../../../../../slices/courseSlice";
import IconButton from "../../../../../common/IconButton";
import { MdNavigateNext } from "react-icons/md"
import toast from "react-hot-toast"
import { COURSE_STATUS } from "../../../../../../utils/constants";

import { addCourseDetails, editCourseDetails, getCourseCategories } 
from "../../../../../../services/operations/courseApi";


const CourseInformationForm = () => {

    const[loading, setLoading] = useState(false);
    const{token} = useSelector((state) => state.auth);
    const {course, isEditCourse} = useSelector((state) => state.course);
    const dispatch = useDispatch();
    // const courseCategorys = ["Web Development", "Android Development" , "AI/ML", "Cyber Security"];
    const[courseCategories, setCourseCategories] = useState(["AI/ML", "Cyber Security"]);
    const {
        register,
        setValue,
        getValues,
        handleSubmit,
        formState:{errors},
    } = useForm();

    //On first render
    useEffect(() => {
        const fetchCourseCategories = async() => {
            setLoading(true);
            const response = await getCourseCategories();
            if(response?.length > 0){
                setCourseCategories(response);
            }
            setLoading(false);
        }
        //call
        fetchCourseCategories();

        //Lets course edit ho raha ho : tb ka case
        if(isEditCourse){
            console.log("Course Details : ",course);
            //fill the form with existing course details.......
            setValue("courseTitle", course.courseName)
            setValue("courseDesc", course.courseDescription)
            setValue("coursePrice", course.price)
            setValue("courseTags", course.tag)
            setValue("courseBenefits", course.whatYouWillLearn)
            setValue("courseCategory", course.category._id)
            setValue("courseRequirements", course.instructions)
            setValue("courseImage", course.thumbnail)
        }

    },[])

    const isFormUpdated = () => {
        const currentFormData = getValues();
        // console.log("FormData : ",currentFormData);

        //check 
        if( currentFormData.courseTitle !== course?.courseName ||
            currentFormData.courseDesc !== course?.courseDescription ||
            currentFormData.coursePrice !== course?.price ||
            currentFormData.courseCategory?._id !== course?.category?._id ||
            currentFormData.courseTags.toString() !== course?.tag?.toString() ||
            currentFormData.courseImage !== course?.thumbnail ||
            currentFormData.courseBenefits !== course?.whatYouWillLearn ||
            currentFormData.courseRequirements.toString() !== course?.instructions.toString()
        ){
            return true;
        }
        else{
            return false;
        }

    }

    async function submitHandler(data){

        //Case-1 : when course is editing.
        if(isEditCourse){
            //check form is updated or not
            if(isFormUpdated()){
                const currentFormData = getValues();
                console.log("Current Form Data : ",currentFormData);
                //Here -> [currentFormData = data];
                const formData = new FormData();
                formData.append("courseId", course._id);
                //check again becoz ho skta sirf 1-field val change hua ho...

                if(currentFormData.courseTitle !== course.courseName){
                    formData.append("courseName", data.courseTitle);
                }
                if(currentFormData.courseDesc !== course.courseDescription){
                    formData.append("courseDescription", data.courseDesc);
                }
                if(currentFormData.courseBenefits !== course.whatYouWillLearn){
                    formData.append("whatYouWillLearn", data.courseBenefits);
                }
                if(currentFormData.coursePrice !== course.price){
                    formData.append("price", data.coursePrice);
                }
                if(currentFormData.courseCategory !== course.category._id){
                    formData.append("category", data.courseCategory);
                }
                if(currentFormData.courseImage !== course.thumbnail){
                    formData.append("thumbnail", data.courseImage);
                }
                //tags and instructions-> Strings of array hai..
                //direct array comparison not possible that is why convert it into string...
                if(currentFormData.courseTags.toString() !== course.tag.toString()){
                    formData.append("tag", data.courseTags);
                }
                if(currentFormData.courseRequirements.toString() !== course.instructions.toString()){
                    formData.append("instructions", data.courseRequirements);
                }
                
                // console.log("Form : ",formData);
                //API Call
                setLoading(true);
                const result = await editCourseDetails(formData, token);
                if(result){
                    dispatch(setCourse(result));
                    dispatch(setStep(2));
                }
                setLoading(false);
            }
            else {
                toast.error("No changes made to the form");
            }
            return;
        }

        //Case-2 : when new course is creating.
        const formData = new FormData();
        formData.append("courseName", data.courseTitle);
        formData.append("courseDescription", data.courseDesc);
        formData.append("whatYouWillLearn", data.courseBenefits);
        formData.append("price", data.coursePrice);
        formData.append("tag", data.courseTags);
        formData.append("category", data.courseCategory);
        formData.append("instructions", data.courseRequirements);
        formData.append("thumbnail", data.courseImage);
        formData.append("status", COURSE_STATUS.DRAFT);
        //API call
        setLoading(true);
        const result = await addCourseDetails(formData, token);
        if(result){
            // console.log("Printing result : ",result);
            dispatch(setStep(2));
            dispatch(setCourse(result));
        }
        setLoading(false);  
    }


    return(
        <>
            <form 
                onSubmit={handleSubmit(submitHandler)}
                className="bg-richblack-800 p-6 border-[1px] border-richblack-700 space-y-8 rounded-md"
            >
                {/* ---------------------Course title----------------------------- */}
                <div className="flex flex-col space-y-2">
                    <label htmlFor="courseTitle" className="text-sm text-richblack-5 uppercase tracking-wider">
                        Course Title <sup className="text-pink-200">*</sup>
                    </label>
                    <input
                        id="courseTitle"
                        type="text"
                        placeholder="Enter Course Title"
                        {...register("courseTitle", {required:true})}
                        className="form-style w-full placeholder:uppercase placeholder:tracking-wider placeholder:text-sm"

                    />
                    {errors.courseTitle && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">
                            Course title is required
                        </span>
                    )}
                </div>

                {/* -----------------Course short description ----------------*/}
                <div className="flex flex-col space-y-2">
                    <label htmlFor="courseDesc" className="text-sm text-richblack-5 uppercase tracking-wider">
                        Course  Description <sup className="text-pink-200">*</sup>
                    </label>
                    <textarea
                        id="courseDesc"
                        placeholder="Enter Description"
                        {...register("courseDesc", {required:true})}
                        className="form-style w-full min-h-[130px] placeholder:uppercase placeholder:tracking-wider placeholder:text-sm resize-x-none"
                    />
                    {errors.courseDesc && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">
                            Course Description is required
                        </span>
                    )}
                </div>

                {/* ------------------------Course price------------------------ */}
                <div className="flex flex-col space-y-2"> 
                    <label htmlFor="coursePrice" className="text-sm text-richblack-5 uppercase tracking-wider">
                        Course Price <sup className="text-pink-200">*</sup>
                    </label>
                    <div className="relative">
                        <input
                            type=""
                            id="coursePrice"
                            placeholder="Enter Course Price"
                            {...register("coursePrice", {
                                required: true,
                                valueAsNumber: true,
                                pattern:{
                                    value: /^(0|[1-9]\d*)(\.\d+)?$/,
                                }
                            })}
                            className="form-style w-full !pl-12 placeholder:uppercase placeholder:tracking-wider placeholder:text-sm"
                        />
                        {/* rupees icon */}
                        <HiOutlineCurrencyRupee
                            className="absolute -z-0 top-1/2 left-3 inline-block -translate-y-1/2 text-2xl text-richblack-400"
                        />
                    </div>
                    {errors.coursePrice && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">
                            Course Price is required
                        </span>
                    )}
                </div>

                {/* ---------------------Course category--------------------- */}
                <div className="flex flex-col space-y-2">
                    <label htmlFor="courseCategory" className="text-sm text-richblack-5 uppercase tracking-wider">
                        Course Category <sup className="text-pink-200">*</sup>
                    </label>
                    <select
                        id="courseCategory"
                        defaultValue={""}
                        {...register("courseCategory", {required: true})}
                        className="form-style w-full uppercase tracking-wider"
                    >
                        {
                            !loading && courseCategories?.map((category, i) =>{
                                return(
                                    <option key={i} value={category?._id}>
                                        {category?.name}
                                    </option>
                                )
                            })
                        }
                    </select>
                    {errors.courseCategory && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">
                            Course Category is required
                        </span>
                    )}
                </div>
                
                {/* --------------------Course tag-------------------------------- */}
                {/* Custom element for handling tags input */}
                <ChipInput
                    label="Tags"
                    name="courseTags"
                    placeholder="Enter Tags and press Enter or Comma"
                    register={register}
                    setValue={setValue}
                    errors={errors}
                />

                {/* -----------------------Course Thumbnail-----------------------------*/}
                <Upload
                    label="Course Thumbnail"
                    name="courseImage"
                    register={register}
                    setValue={setValue}
                    errors={errors}
                    editData={isEditCourse ? course?.thumbnail : null}
                />

                {/* -----------------------Course Benifits-------------------------------- */}
                <div className="flex flex-col space-y-2">
                    <label className="text-sm text-richblack-5 uppercase tracking-wider" htmlFor="courseBenefits">
                        Benefits of the course <sup className="text-pink-200">*</sup>
                    </label>
                    <textarea
                        id="courseBenefits"
                        placeholder="Enter benefits of the course"
                        {...register("courseBenefits", {required:true})}
                        className="form-style resize-x-none min-h-[130px] w-full placeholder:uppercase placeholder:tracking-wider placeholder:text-sm"
                    />
                    {errors.courseBenefits && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">
                            Course Benefits is required
                        </span>
                        )
                    }
                </div>
                
                {/* -------------------Requirements/Instructions------------------------- */}
                <Requirements
                    label="Requirements/Instructions"
                    name="courseRequirements"
                    setValue={setValue}
                    register={register}
                    errors={errors}
                />

                {/* -------------------------Button group------------------------ */}
                <div className="flex items-center justify-end gap-x-4">
                    {isEditCourse && (
                        <button
                            onClick={() => dispatch(setStep(2))}
                            className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 font-semibold text-richblack-900 px-2 py-1 tracking-wider`}
                        >
                            Continue Without Saving
                        </button>
                    )}

                    <IconButton
                        text={!isEditCourse ? "Next" : "Save Changes"}
                        type="submit"
                        disabled={loading}
                    >
                        <MdNavigateNext />
                    </IconButton>
                </div>
            </form>
        </>
    )
}

export default CourseInformationForm;

/*
courseName, 
courseDescription, 
whatYouWillLearn, 
price, 
tag,
category,
status,
instructions,
*/