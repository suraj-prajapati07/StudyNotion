import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx"
import { useForm } from "react-hook-form";
import Upload from "../Upload";
import IconButton from "../../../../../common/IconButton";
import toast from "react-hot-toast";
import { addSubSection, updateSubSection } from "../../../../../../services/operations/courseApi";
import { setCourse } from "../../../../../../slices/courseSlice";
import { HiOutlineSave } from "react-icons/hi";

const SubSectionModal = ({modalData, setModalData, add=false, view=false, edit=false}) => {
    const {course} = useSelector((state) => state.course);
    const {token} = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState:{errors}
    } = useForm();

    const[loading, setLoading] = useState(false);

    //On first render...
    useEffect(() => {
        //Fill the form with existing lecture details, when lecture is viewing or editing.
        if(view || edit){
            setValue("lectureVideo", modalData.videoUrl);
            setValue("lectureTitle", modalData.title);
            setValue("lectureDesc", modalData.description);
        }
    }, [])

    const isFormUpdated = () => {
        //get current form data
        const currentFormData = getValues();
        //check
        if( currentFormData.lectureVideo !== modalData.videoUrl ||
            currentFormData.lectureTitle !== modalData.title ||
            currentFormData.lectureDesc !== modalData.description
        ){
            return true;
        }
        else{
            return false;
        }
    }

    const submitHandler = async(data) => {

        //Case-1: when new lecture is adding
        //case-2: when existing lecture is editing
        if(edit){
            if(isFormUpdated()){
                const currentFormData = getValues();
                //Here -> [currentFormData = data]
                const formData = new FormData();
                
                formData.append("sectionId", modalData.sectionId)
                formData.append("subSectionId", modalData._id);
                if(currentFormData.lectureTitle !== modalData.title){
                    formData.append("title", data.lectureTitle);
                }
                if(currentFormData.lectureDesc !== modalData.description){
                    formData.append("description", data.lectureDesc);
                }
                if(currentFormData.lectureVideo !== modalData.videoUrl){
                    formData.append("videoFile", data.lectureVideo);
                }

                //API call for editing
                setLoading(true);
                const result = await updateSubSection(formData, token);
                if(result){
                    //update course content structure with gets updated section/subsection
                    const updatedCourseContent = course.courseContent.map((section) => 
                        section._id === modalData.sectionId? result : section);

                    const updatedCourse = {...course, courseContent: updatedCourseContent}
                    dispatch(setCourse(updatedCourse));
                }
                setLoading(false);
                setModalData(null);

            }
            else{
                toast.error("No changes made to the form");
            }
            return;
        }

        //New lecture adding
        const formData = new FormData();
        formData.append("sectionId", modalData);
        formData.append("title", data.lectureTitle);
        formData.append("description", data.lectureDesc);
        formData.append("videoFile", data.lectureVideo);

        //API call
        setLoading(true);
        const result = await addSubSection(formData, token);
        if(result){
            //update course content structure with -> gets updated section
            const updatedCourseContent = course.courseContent.map((section) => 
                section._id === modalData ? result : section);

            const updatedCourse = {...course, courseContent: updatedCourseContent}
            dispatch(setCourse(updatedCourse));


        }
        setLoading(false);
        setModalData(null);
    }

    return(
        <div className="fixed inset-0 z-[1000]  grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
            <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
                {/* heading */}
                <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
                    <p className="text-xl font-semibold text-richblack-5">
                        {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
                    </p>
                    <button
                        onClick={() => (!loading && setModalData(null))}
                    >
                        <RxCross2 className="text-2xl text-richblack-5" />
                    </button>
                </div>

                {/* Form */}
                <form 
                    onSubmit={handleSubmit(submitHandler)}
                    className="space-y-8 px-8 py-10"
                >   
                    {/* ------------Lecture video--------------- */}
                    <Upload
                        label="Lecture Video"
                        name="lectureVideo"
                        register={register}
                        setValue={setValue}
                        errors={errors}
                        video={true}
                        viewData={view? modalData.videoUrl : null}
                        editData={edit? modalData.videoUrl : null}
                    />
                    {/*----------- Lecture title----------------- */}
                    <div className="flex flex-col space-y-2">
                        <label className="text-sm text-richblack-5" htmlFor="lectureTitle">
                            Lecture Title {!view && <sup className="text-pink-200">*</sup>}
                        </label>
                        <input
                            id="lectureTitle"
                            disabled={view || loading}
                            type="text"
                            placeholder="Enter Lecture Title"
                            {...register("lectureTitle", {required:true})}
                            className="form-style w-full"
                        />
                        {errors.lectureTitle && (
                            <span className="ml-2 text-xs tracking-wide text-pink-200">
                                Lecture title is required
                            </span>
                        )}
                    </div>
                    {/* ----------Lecture Description---------------- */}
                    <div className="flex flex-col space-y-2">
                        <label className="text-sm text-richblack-5" htmlFor="lectureDesc">
                            Lecture Description {!view && <sup className="text-pink-200">*</sup>}
                        </label>
                        <textarea
                            id="lectureDesc"
                            disabled={view || loading}
                            placeholder="Enter Lecture Description"
                            {...register("lectureDesc", {required:true})}
                            className="form-style resize-x-none min-h-[130px] w-full"
                        />
                        {errors.lectureDesc && (
                            <span className="ml-2 text-xs tracking-wide text-pink-200">
                                Lecture description is required
                            </span>
                        )}
                    </div>

                    {/* -----------submit Btn---------- */}
                    {!view && (
                        <div className="flex justify-end">
                            {/* <IconButton
                                type="submit"
                                disabled={loading}
                                text={loading? "Loading.." : edit? "Save Changes" : "Save"}
                            /> */}
                            <IconButton
                                type="submit"
                                disabled={loading}
                                text={loading? "Loading.." : edit? "Save Changes" : "Save"}
                                children={null}
                            >
                               <HiOutlineSave className="text-lg font-bold"/>
                            </IconButton>
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}

export default SubSectionModal;