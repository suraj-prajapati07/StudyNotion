import React, { useEffect } from "react";
import RenderSteps from "./RenderSteps";
import { useDispatch } from "react-redux";
import { resetCourseState } from "../../../../../slices/courseSlice";

const AddCourse = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetCourseState());
    })
    return(
        <>
            <div className="flex w-full items-start gap-x-6">
               <div className="flex flex-1 flex-col">
                    <h1 className="mb-14 text-3xl font-medium text-richblack-5 uppercase tracking-wider   lg:text-left text-center">
                        Add Course
                    </h1>
                    <div className="flex-1">
                        <RenderSteps/>
                    </div>
               </div>

               {/* Tips for uploading course */}
               {/* sticky -> normal flow mei rakhta hai but after parent scroll, it behave as fixed element */}
               <div className="sticky -z-10 top-10  hidden lg:block flex-1 bg-richblack-800 p-6 rounded-md border-[1px] border-richblack-700 max-w-[400px]"> 
                    <p className="mb-8 text-lg text-richblack-5">⚡ Course Upload Tips</p>
                    <ul className="ml-5 text-xs text-richblack-5 tracking-wider text-justify space-y-4
                    list-item list-disc">
                        <li>Set the Course Price option or make it free.</li>
                        <li>Standard size for the course thumbnail is 1024x576.</li>
                        <li>Video section controls the course overview video.</li>
                        <li>Course Builder is where you create & organize a course.</li>
                        <li>
                            Add Topics in the Course Builder section to create lessons,
                            quizzes, and assignments.
                        </li>
                        <li>
                            Information from the Additional Data section shows up on the
                            course single page.
                        </li>
                        <li>Make Announcements to notify any important</li>
                        <li>Notes to all enrolled students at once.</li>
                    </ul>
               </div>
            </div>
        </>
    )
}

export default AddCourse;