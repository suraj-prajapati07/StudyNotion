import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxDropdownMenu } from "react-icons/rx"
import { MdEdit } from "react-icons/md"
import { RiDeleteBin6Line } from "react-icons/ri"
import { AiFillCaretDown } from "react-icons/ai"
import { FaPlus } from "react-icons/fa"
import { AiFillCaretUp } from "react-icons/ai";
import ConfirmationModal from "../../../../../common/ConfirmationModal"
import { deleteSection, deleteSubSection } from "../../../../../../services/operations/courseApi";
import { setCourse } from "../../../../../../slices/courseSlice";
import SubSectionModal from "./SubSectionModal";


const NestedView = ({handleEditSectionName}) => {
    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.auth);
    const {course} = useSelector((state) => state.course);
    
    const[modalData, setModalData] = useState(null);

    const[addSubsection, setAddSubSection] = useState(null);
    const[editSubSection, setEditSubSection] = useState(null);
    const[viewSubSection, setViewSubSection] = useState(null);
    
    
    const handleDeleteSection = async(sectionId) => {
        const data = {
            sectionId,
            courseId: course._id,
        }
        const response = await deleteSection(data, token);
        if(response){
            dispatch(setCourse(response));
        }
        //close modal
        setModalData(null);
    }

    const handleDeleteSubSection = async(subSectionId, sectionId) => {
        const data = {
            subSectionId,
            sectionId
        }
        const response = await deleteSubSection(data, token);
        if(response){
            //update course structure with gets updated section
            const updatedCourseContent = course.courseContent.map((section) => 
                section._id === sectionId ? response : section);
            const updatedCourse = {...course, courseContent: updatedCourseContent}
            dispatch(setCourse(updatedCourse));
        }
        //close modal
        setModalData(null);
    }

    

    return(
        <>
            <div className="rounded-lg bg-richblack-700 p-6 px-8">
                {course?.courseContent?.map((section) => (
                    // Section dropdown
                    <details 
                        key={section._id} 
                        open
                    >
                        {/* Section Dropdown Content */}
                        <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2">
                            {/* Left part */}
                            <div className="flex items-center gap-x-3">
                                <RxDropdownMenu className="text-2xl text-richblack-50"/>
                                <p className="font-semibold text-richblack-50">
                                    {section.sectionName}
                                </p>
                            </div>
                            {/* Right part */}
                            <div className="flex items-center gap-x-3 text-xl text-richblack-300">
                                <button
                                    onClick={() => 
                                        handleEditSectionName(section._id, section.sectionName)
                                    }
                                >
                                    <MdEdit/>
                                </button>
                                <button
                                    onClick={() => {
                                        setModalData({
                                            text1: "Delete this Section?",
                                            text2: "All the lectures in this section will be deleted",
                                            btn1Text: "Delete",
                                            btn2Text: "Cancel",
                                            btn1Handler: () => handleDeleteSection(section._id),
                                            btn2Handler: () => setModalData(null)
                                        })
                                    }}
                                >
                                    <RiDeleteBin6Line/>
                                </button>
                                <span className="font-bold">|</span>
                                <AiFillCaretDown/>
                            </div>
                        </summary>
                        
                        {/* Render All Sub Sections Within a Section */}
                        <div className="px-6 pb-4 text-richblack-5">
                            {section?.subSection?.map((subsection) => (
                                <div
                                    key={subsection._id}
                                    onClick={() => setViewSubSection(subsection)}
                                    className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2"
                                >
                                    {/* Left part */}
                                    <div className="flex items-center gap-x-3 py-2">
                                        <RxDropdownMenu className="text-xl text-richblack-50" />
                                        <p className="font-semibold text-richblack-50">
                                            {subsection.title}
                                        </p>
                                    </div>
                                    {/* Right part */}
                                    <div 
                                        //stopPropagation() -> prevent parent onClick handler from firing child clicked.
                                        //Without it, clicking the button would trigger both "child" clicked! and "parent" clicked!
                                        onClick={(e) => e.stopPropagation()}
                                        className="flex items-center gap-x-3 text-lg text-richblack-300"
                                    >
                                        <button 
                                            onClick={() => setEditSubSection({...subsection,
                                                sectionId: section._id
                                            })}
                                        >
                                            <MdEdit/>
                                        </button>
                                        <button
                                            onClick={() => {
                                                setModalData({
                                                    text1: "Delete this Sub-section?",
                                                    text2: "This lecture will be deleted",
                                                    btn1Text: "Delete",
                                                    btn2Text: "Cancel",
                                                    btn1Handler: () => handleDeleteSubSection(
                                                        subsection._id, section._id
                                                    ),
                                                    btn2Handler: () => setModalData(null)
                                                })
                                            }}
                                        >
                                            <RiDeleteBin6Line/>
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {/* Add Lecture btn */}
                            <button
                                onClick={() => setAddSubSection(section._id)}
                                className="mt-3 flex items-center gap-x-1 text-yellow-50"
                            >
                                <FaPlus className="text-lg"/>
                                Add Lecture
                            </button>
                        </div>
                    </details>
                    )
                )}
            </div>

            {/* Subsection modal */}
            {addSubsection && (
                <SubSectionModal 
                    modalData={addSubsection}
                    setModalData = {setAddSubSection}
                    add={true}
                />
            )}
            {editSubSection && (
                <SubSectionModal 
                    modalData={editSubSection}
                    setModalData = {setEditSubSection}
                    edit={true}
                />
            )}
            {viewSubSection && (
                <SubSectionModal 
                    modalData={viewSubSection}
                    setModalData = {setViewSubSection}
                    view={true}
                />
            )}

            {/* Confirmation modal */}
            {modalData && (
                <ConfirmationModal modalData={modalData}/>
            )}
        </>
    )
}

export default NestedView;