import React, { useEffect, useState } from "react";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import formatDate from "../../../../../utils/formatDate";
import { COURSE_STATUS } from "../../../../../utils/constants";
import {HiClock} from "react-icons/hi";
import {FaCheck} from "react-icons/fa";
import {FiEdit2} from "react-icons/fi";
import {RiDeleteBin6Line} from "react-icons/ri";
import ConfirmationModal from "../../../../common/ConfirmationModal";
import { useNavigate } from "react-router-dom";
import convertSecondsToDuration from "../../../../../utils/convertSecondsToDuration";
import { deleteCourse, fetchInstructorCourses } from "../../../../../services/operations/courseApi";
import { useDispatch, useSelector } from "react-redux";
import { resetCourseState } from "../../../../../slices/courseSlice";



const CoursesTable = ({courses, setCourses}) => {

    const{token} = useSelector((state) => state.auth);
    const[modalData, setModalData] = useState(null);
    const[loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const deleteCourseHandler = async(courseId) => {
        //API call
        setLoading(true);
        const data = {
            courseId
        };
        await deleteCourse(data, token);
        
        //fetch fresh courses
        const response = await fetchInstructorCourses(token);
        if(response){
            setCourses(response);
        }
        setLoading(false);
        setModalData(null);

    }

    

    return(
        <>
            <Table className="rounded-xl border border-richblack-800">
                {/* --------------Table heading--------------- */}
               <Thead>
                    <Tr className="flex gap-x-10 text-richblack-100 rounded-t-md border-b border-b-richblack-800 px-6 py-2">
                        <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
                            Courses
                        </Th>
                        <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                            Duration
                        </Th>
                        <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                            Price
                        </Th>
                        <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                            Action
                        </Th>
                    </Tr> 
                </Thead>
                {/* --------------Table body--------------- */}
                <Tbody>
                    {courses?.map((course) => (
                        <Tr
                            key={course?._id}
                            className="flex gap-x-10 border-b border-richblack-800 px-6 py-8 gap-4"
                        >
                            {/* Column-1 */}
                            <Td colSpan={1} className="flex-1 flex gap-x-4 p-3">
                                <img
                                    src={course?.thumbnail}
                                    alt="Course Thumbnail"
                                    className="md:h-[148px] md:w-[220px] aspect-video rounded-lg object-cover"
                                />
                                <div className="flex flex-col gap-1 justify-between">
                                    <p className="text-lg font-semibold text-richblack-5 mt-3 uppercase truncate tracking-wide">
                                        {course.courseName}
                                    </p>
                                    <p className="text-xs text-richblack-300">
                                        {course.courseDescription}
                                    </p>
                                    <p className="text-[12px] text-white tracking-widest capitalize text-left ">
                                        Created: {formatDate(course.createdAt)}
                                    </p>
                                    {course.status === COURSE_STATUS.DRAFT ?(
                                            <div className="flex items-center w-fit gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100 uppercase tracking-wider">
                                                <HiClock size={14} />
                                                Drafted
                                            </div>
                                        ) : (
                                            <div className="flex items-center w-fit gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100 uppercase tracking-wider">
                                                <div className="h-3 w-3 flex items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
                                                    <FaCheck size={8} />
                                                </div>
                                                Published
                                            </div>
                                        )
                                    }
                                </div>
                            </Td>
                            {/* Column-2 */}
                            <Td className="text-sm font-medium text-richblack-100 mb-1 tracking-wider">
                                {course?.duration}
                            </Td>
                            {/* Column-3 */}
                            <Td className="text-sm font-medium text-richblack-100 mb-1 tracking-wider">
                                ₹{course.price}
                            </Td>
                            {/* Column-4 */}
                            <Td className="text-sm font-medium text-richblack-100 tracking-wider">
                                {/* Edit btn */}
                                <button
                                    title="Edit"
                                    disabled={loading}
                                    onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}
                                    className="pr-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                                >
                                    <FiEdit2 size={20} />
                                </button>
                                {/* Delete btn */}
                                <button
                                    title="Delete"
                                    disabled={loading}
                                    onClick={() => setModalData({
                                        text1: "Do you want to delete this course?",
                                        text2: "All the data related to this course will be deleted",
                                        btn1Text: "Delete",
                                        btn2Text: "Cancel",
                                        btn1Handler: () => !loading && deleteCourseHandler(course._id),
                                        btn2Handler: () => !loading && setModalData(null)
                                    })}
                                    className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                                >
                                    <RiDeleteBin6Line size={20} />
                                </button>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>

            {/* Confirmation modal */}
            {modalData && (
                    <ConfirmationModal modalData={modalData} />
                )
            }
        </>
    )
}

export default CoursesTable;