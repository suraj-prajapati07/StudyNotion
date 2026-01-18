import React, { useEffect, useState } from "react";
import IconButton from "../../../../common/IconButton";
import { VscAdd } from "react-icons/vsc"
import { useNavigate } from "react-router-dom";
import Spinner from "../../../../common/Spinner";
import CoursesTable from "./CoursesTable";
import { fetchInstructorCourses } from "../../../../../services/operations/courseApi";
import { useSelector } from "react-redux";

const MyCourses = () => {
    const {token} = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const[courses, setCourses] = useState([]);
    const[loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCourses = async() => {
            setLoading(true);
            const response = await fetchInstructorCourses(token);
            // console.log("Instructor Courses : ",response);
            if(response){
                setCourses(response);
            }
            setLoading(false);
        }
        //call
        fetchCourses();
    }, [])

    return(
        <div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-14 gap-y-5">
                <h1 className='text-3xl font-medium text-richblack-5 lg:text-left text-center uppercase tracking-wider'>
                    My Courses
                </h1>
                <IconButton
                    text='Add Course'
                    onClickHandler={() => navigate("/dashboard/add-course")}
                    customClasses={`hidden md:block`}
                >
                    <VscAdd/>
                </IconButton>
                {/* AddCourse Btn in mobile frame */}
                <div className="md:hidden">
                    <IconButton
                        text='Add Course'
                        onClickHandler={() => navigate("/dashboard/add-course")}
                        customClasses={`w-full grid place-items-center !py-1 my-6`}
                    >
                        <VscAdd className="font-bold text-lg"/>
                    </IconButton>
                </div>
            </div>

            {/* -------------Courses Table----------------- */}
            {   loading ? (
                    <div className="">
                        <Spinner/>
                    </div>
                ) : 
                courses.length > 0 ? (
                    <CoursesTable courses={courses} setCourses={setCourses}/>
                ) : (
                    <div>
                        <div className='h-[1px] mb-10  mx-auto bg-richblack-500' ></div>
                        <p className='text-center text-2xl font-medium text-richblack-100 select-none'>
                            No Course Found
                        </p>
                    </div>
                )
            }

        </div>
    )
}

export default MyCourses;