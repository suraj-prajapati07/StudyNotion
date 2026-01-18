import React, { useEffect, useState } from "react";
import Spinner from "../../common/Spinner";
import { getUserEnrolledCourses } from "../../../services/operations/profileApi";
import { useSelector } from "react-redux";
import ProgressBar from "@ramonak/react-progress-bar"
import { useNavigate } from "react-router-dom";


const EnrolledCourses = () => {

    const {token} = useSelector((state) => state.auth);
    const [enrolledCourses, setEnrolledCourses] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        //get enrolled courses
        async function fetchEnrolledCourses(){
            try {
                const res = await getUserEnrolledCourses(token);
                setEnrolledCourses(res);
            }
            catch (error) {
                console.log("Could not fetch enrolled courses.");
            }
        }
        fetchEnrolledCourses();
    }, []);
    
    return(
        <>
            <div className="text-3xl text-richblack-50 uppercase tracking-wider lg:text-left text-center">
                Enrolled Courses
            </div>

            {!enrolledCourses ? (
                <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                    <Spinner/>
                </div>
                ) : !enrolledCourses.length? (
                    <p className="text-richblack-5 text-xl grid place-content-center mt-8">
                        You have not enrolled in any course yet.
                    </p>
                    ) : (
                    // display enrolled courses
                    <div className="overflow-x-auto my-8 w-[650px] md:w-full text-richblack-5">
                        {/* Headings */}
                        <div className="text-richblack-5 flex rounded-t-lg bg-richblack-500">
                            <p className="w-[45%] uppercase tracking-wider px-5 py-3">Course Name</p>
                            <p className="w-1/4 uppercase tracking-wider px-2 py-3">Duration</p>
                            <p className="flex-1 uppercase tracking-wider px-2 py-3">Progress</p>
                        </div>
                        
                        {/* Course Details */}
                        {
                            enrolledCourses.map((course, index, arr) => {
                                return(
                                    <div
                                        key={index}
                                        className={`flex items-center border border-richblack-700
                                            ${index === arr.length - 1 ? "rounded-b-lg" : "rounded-none"}`
                                        }
                                    >
                                        {/* thumbnail with description */}
                                        <div
                                            className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                                            //go to course view
                                            onClick={() =>{
                                                navigate(
                                                `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                                                )
                                            }}
                                        >
                                            <img
                                                src={course.thumbnail}
                                                alt="course_img"
                                                className="h-14 w-14 rounded-lg object-cover"
                                            />
                                            <div className="flex max-w-xs flex-col gap-2">
                                                <p className="font-semibold uppercase tracking-wider">
                                                    {course.courseName}
                                                </p>
                                                {/* short description */}
                                                <p>{course.description}</p>
                                            </div>
                                        </div>
                                        {/* Duration */}
                                        <div className="w-1/4 px-2 py-3 tracking-wider uppercase">
                                            {course?.totalDuration || 0}
                                        </div>
                                        {/* Progress */}
                                        <div className="flex w-1/5 flex-col gap-2 px-2 py-3 tracking-wider uppercase">
                                            <p>Progress - {course.progressPercentage || 0}%</p>
                                            <ProgressBar
                                                completed={course.progressPercentage || 0}
                                                height="8px"
                                                isLabelVisible={false}
                                            />
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            }

        </>
    )
}

export default EnrolledCourses;