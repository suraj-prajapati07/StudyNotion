import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {MdOutlineKeyboardArrowDown} from "react-icons/md";
import {FaChevronLeft, FaChevronRight} from "react-icons/fa";
import IconButton from "../../common/IconButton";

const VideoDetailsSidebar = ({setReviewModal}) => {
    const {courseId,sectionId, subSectionId} = useParams();
    const navigate = useNavigate();
    const {
        courseData,
        completedLecture,
        totalNoOfLecture,
        courseSectionData,
    } = useSelector((state) => state.viewCourse);
    
    const[activeSection, setActiveSection] = useState(null);
    const[activeVideo, setActiveVideo] = useState(null);

    const[showSidebar, setShowSidebar] = useState(false);
    useEffect(() => {
        //
        //find active Section and active lecture
        const find_ActiveSectionAndLecture = () => {
            if(!courseSectionData) return;
            const currentSectionIndex=courseSectionData.findIndex((section) => section._id === sectionId);
            if(currentSectionIndex === -1) return;
            const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
                (subsec) => subsec._id === subSectionId
            );
            if(currentSubSectionIndex === -1) return;
            
            const activeSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex]._id;

            setActiveSection(courseSectionData[currentSectionIndex]._id);
            setActiveVideo(activeSubSectionId);
        }
        //Call
        find_ActiveSectionAndLecture();
    }, [sectionId,subSectionId, courseSectionData])
    return(
        <>
            {/* Toggle sidebar */}
            <div className={`${showSidebar ? "" : "hidden"} w-6 h-72 md:hidden absolute center`}>
                <FaChevronRight
                    onClick={() => setShowSidebar(!showSidebar)}
                    className="md:hidden z-10 cursor-pointer text-2xl text-richblack-900 m-2 bg-richblack-100 rounded-full p-1 top-3 absolute left-0"
                />
            </div>
            <div>
                <div className={`${showSidebar && "hidden"} h-[calc(100vh-3.5rem)] w-[320px] 
                max-w-[350px] flex flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 transition-all origin-right duration-500`}>
                    {/*----- Back, add review, heading and Lecture completed section--------- */}
                    <div className={`${showSidebar && "hidden"} mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25 offSidebar2`}>
                        {/* Back, add review */}
                        <div className='flex w-full items-center justify-between '>
                            <div className="h-[35px] w-[35px] flex items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90">
                                {/* In mobile frame */}
                                <FaChevronLeft
                                    onClick={() => setShowSidebar(true)}
                                    className="cursor-pointer md:hidden"
                                />
                                <FaChevronLeft
                                    onClick={() => navigate("/dashboard/enrolled-courses")}
                                    className='cursor-pointer hidden md:block'
                                />
                            </div>
                            <IconButton 
                                text="Add Review"
                                onClickHandler={() => setReviewModal(true)}
                            />
                        </div>
                        {/* heading and Lecture completed */}
                        <div className="flex flex-col">
                            <p className="text-lg md:text-xl font-bold capitalize text-richblack-5">
                                {courseData?.courseName}
                            </p>
                            <p className="text-sm font-semibold text-richblack-500">
                                {completedLecture?.length} of {totalNoOfLecture} Lectures Completed
                            </p>
                        </div>
                    </div>

                    {/*---------- Course Section ------------------*/}
                    <div className='h-[calc(100vh-5rem)] overflow-y-auto px-2'>
                        {courseSectionData?.map((section, index) => (
                            <details key={index} className="group appearance-none text-richblack-5">
                                <summary className='mt-2 cursor-pointer  text-richblack-5 appearance-none'>
                                    <div className="flex items-center justify-between bg-richblack-600 px-5 py-4">
                                        <p className='w-[70%] font-semibold'>
                                            {section?.sectionName}
                                        </p>
                                        <MdOutlineKeyboardArrowDown
                                            
                                            className="transition-transform duration-300 group-open:rotate-180"
                                        />
                                    </div>
                                </summary>

                                {/* subsection... */}
                                {section?.subSection?.map((subSec, index) => (
                                    <div
                                        key={index}
                                        onClick={() => {
                                            if(window.innerWidth < 1024){
                                                //hide sidebar
                                                setShowSidebar(true);
                                            }
                                            navigate(`/view-course/${courseId}/section/${section?._id}/sub-section/${subSec?._id}`)
                                        }}
                                        className={`${subSec?._id === activeVideo ?
                                        "bg-yellow-200" : "bg-richblack-50"} cursor-pointer flex items-center gap-3  px-5 py-2 font-semibold text-richblack-800 relative border-b-[1px] border-richblack-600`}
                                    >
                                        {/* check box */}
                                        <input
                                            readOnly
                                            type="checkbox"
                                            checked={completedLecture?.includes(subSec._id)}
                                            className=""
                                        />
                                        {/* title */}
                                        <p className=' ml-6 text-sm capitalize'>{subSec?.title}</p>
                                    </div>
                                ))}
                            </details>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
export default VideoDetailsSidebar;