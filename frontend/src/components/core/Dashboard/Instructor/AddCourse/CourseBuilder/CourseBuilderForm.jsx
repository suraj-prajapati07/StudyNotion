import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "../../../../../common/IconButton";
import { IoAddCircleOutline } from "react-icons/io5"
import { MdNavigateNext } from "react-icons/md"
import { createSection, updateSection } from "../../../../../../services/operations/courseApi";
import { setCourse, setIsEditCourse, setStep } from "../../../../../../slices/courseSlice";
import NestedView from "./NestedView";
import toast from "react-hot-toast";

const CourseBuilderForm = () => {

    const{course} = useSelector((state) => state.course);
    const{token} = useSelector((state) => state.auth);

    const {register, handleSubmit, setValue, getValues, formState:{errors}} = useForm();
    const dispatch = useDispatch();

    const[loading, setLoading] = useState(false);
    const[editSection, setEditSection] = useState(null);

    const submitHandler = async(formData) => {
        //Case-1: when section is creating
        //Case-2: when section is editing
        let response = null;
        setLoading(true);
        if(editSection){
            //editing.........
            //API call
            const data = {
                sectionName : formData?.sectionName,
                sectionId: editSection,
                courseId: course._id,
            }
            response = await updateSection(data, token);
        }
        else{
            //creting.......
            //API call
            const data = {
                sectionName: formData?.sectionName,  
                courseId: course._id,
            }
            response = await createSection(data, token);
        }

        //update state accordingly
        if(response){
            dispatch(setCourse(response));
            //reset form SectionName
            setValue("sectionName", "");

            setEditSection(null);
        }
        setLoading(false);
    }

    //----------------------------------------------------------------------------------------
    const cancelEditBtnHandler = () => {
        setEditSection(null);
        setValue("sectionName", "");
    }

    const handleEditSectionName = (id, name) => {
        setEditSection(id);
        setValue("sectionName", name);
    }




    //-------------------------------------------------------------------------------------------
    const goBackHandler = () => {
        //go back
        dispatch(setStep(1));
        //enable editing
        dispatch(setIsEditCourse(true));
    }
    const goToNextHandler = () => {
        // Check atleast one section and subsection are added or not
        if(course?.courseContent?.length === 0 ){
            toast.error("Please add atleast one section");
            return;
        }
        if(course?.courseContent?.some((section) => section?.subSection?.length === 0)){
            toast.error("Please add atleast one subsection in each section");
            return;
        }
        //Go to next step if(sb kuch good hai toh)
        dispatch(setStep(3));

    }

    return(
        <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
            {/*----------------- heading-------------------- */}
            <p className="text-2xl font-semibold text-richblack-5">
                Course Builder
            </p>
            {/* ---------------section form--------------------- */}
            <form onSubmit={handleSubmit(submitHandler)} >
                <div className="flex flex-col space-y-2">
                    <label className="text-sm text-richblack-5" htmlFor="sectionName">
                        Section Name <sup className="text-pink-200">*</sup>
                    </label>
                    <input
                        id="sectionName"
                        type="text"
                        placeholder="Add a section to build your course"
                        {...register("sectionName", {required: true})}
                        className="form-style w-full"
                    />
                    {errors.sectionName && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">
                            Section name is required
                        </span>
                    )}
                    {/* Btn */}
                    <div className="flex items-end gap-x-4">
                        <IconButton 
                            type="submit"
                            text={editSection? "Edit Section Name" : "Create Section"}
                            disabled={loading}
                            outline={true}
                        >
                            <IoAddCircleOutline size={20} className="text-yellow-50"/>
                        </IconButton>
                        {editSection && (
                            <button
                                type="button"
                                onClick={cancelEditBtnHandler}
                                className="text-sm text-pink-300 underline"
                            >
                                Cancel Edit
                            </button>
                        )}
                    </div>
                </div>  
            </form>

            {/* ------display Nested view of section and adding subsection-------------- */}
            {course?.courseContent?.length > 0 && (
                <NestedView  handleEditSectionName={handleEditSectionName}/>
            )}

            {/* -----------------Next and Back Btn----------------------- */}
            <div className="flex justify-end gap-x-4">
                <button
                    onClick={goBackHandler}
                    className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 px-2 py-1 tracking-wider uppercase font-semibold text-richblack-900"
                >
                    Back
                </button>
                <IconButton
                    disabled={loading}
                    text={"Next"}
                    onClickHandler={goToNextHandler}
                >
                    <MdNavigateNext/>
                </IconButton>
            </div>
        </div>
    )
}

export default CourseBuilderForm;