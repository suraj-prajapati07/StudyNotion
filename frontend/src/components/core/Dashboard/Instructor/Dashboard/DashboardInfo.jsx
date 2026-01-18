import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "../../../../common/Spinner";
import { Link } from "react-router-dom";
import { getInstructorStaticsticsData } from "../../../../../services/operations/profileApi";
import InstructorChart from "./InstructorChart";

const DashboardInfo = () => {

    const{user} = useSelector((state) => state.profile);
    const{token} = useSelector((state) => state.auth);

    const[coursesData, setCoursesData] = useState([]);

    const[loading, setLoading] = useState(false);

    //Fetch Instructor courses with Statistics data.
    useEffect(() => {
        const fetchData = async() => {
            setLoading(true);

            //Courses with Statistics data.
            const result = await getInstructorStaticsticsData(token);
            // console.log("Result : ",result);
            setCoursesData(result);
        
            setLoading(false);
        }
        //Call
        fetchData();
    },[]);

    const totalStudents = coursesData?.reduce((acc, curr) => acc + curr.totalEnrolledStudents , 0);
    const totalIncome = coursesData?.reduce((acc, curr) => acc + curr.totalGeneratedAmount , 0);    
                                                    

    return(
        <div className="overflow-x-hidden">
            {/* Headings */}
            <div className="space-y-2">
                <p className="text-richblack-5 text-2xl font-bold">
                    Hi {user?.firstName} 👋
                </p>
                <p className="text-richblack-200 font-medium">
                    Let's start something new
                </p>
            </div>

            <div>
                {loading ? (
                        <div className='h-[calc(100vh-10rem)] grid place-items-center'>
                            <Spinner/>
                        </div>
                    ) : (
                        !coursesData?.length ? (
                            <div className="text-center mt-20 bg-richblack-800 px-6  py-20 rounded-md">
                                <p className='text-2xl font-bold text-richblack-5'>
                                    You have{" "}
                                    <span className='font-extrabold text-pink-50'>not</span>{" "}
                                    published any courses yet
                                </p>
                                <Link to={"/dashboard/add-course"}>
                                    <p className='mt-3  text-lg font-semibold text-yellow-50 underline'>
                                        Create a course
                                    </p>
                                </Link>
                            </div>
                        ) : (
                            <div>
                                {/* -------Pie charts and Statistics----------- */}
                                <div className='relative flex flex-col md:flex-row gap-5 my-10 text-richblack-5 justify-between'>
                                    {/* Pie charts */}
                                    <div className="relative w-full md:w-3/5 xl:w-3/4">
                                        {totalIncome > 0 || totalStudents > 0 ? (
                                                <div className="h-full">
                                                    <InstructorChart 
                                                        coursesData={coursesData}
                                                    />
                                                </div>
                                            ) : (
                                                <div className='bg-richblack-800 w-full 
                                                rounded-md p-6'>
                                                    <p className='text-lg text-richblack-5 font-bold'>
                                                        Visualize
                                                    </p>
                                                    <p className='mt-4 text-xl text-richblack-200 
                                                    font-medium'>
                                                        Not Enough Data To Visualize
                                                    </p>
                                                </div>
                                            )
                                        }
                                    </div>
                                    {/* Statistics */}
                                    <div className="bg-richblack-800 p-6 min-h-fit min-w-[250px] rounded-md">
                                        <p className='text-lg font-bold text-richblack-5' >
                                            Statistics
                                        </p>
                                        <div className="flex flex-col gap-4 mt-4 mb-4">
                                            <div>
                                                <p className='text-lg text-richblack-200'>
                                                    Total Courses
                                                </p>
                                                <p className='text-3xl font-semibold text-richblack-50'>
                                                    {coursesData.length}
                                                </p>
                                            </div>
                                            <div>
                                                <p className='text-lg text-richblack-200'>
                                                    Total Students
                                                </p>
                                                <p className='text-3xl font-semibold text-richblack-50'>
                                                   {totalStudents}
                                                </p>
                                            </div>
                                            <div>
                                                <p className='text-lg text-richblack-200'>
                                                    Total Income
                                                </p>
                                                <p className='text-3xl font-semibold text-richblack-50'>
                                                    ₹ {totalIncome}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* -------Published coursees------------------ */}
                                <div className='w-full rounded-md bg-richblack-800 p-6'>
                                    <div className="flex justify-between items-center">
                                        <p className='text-richblack-5 text-lg font-bold'>
                                            Your Published Courses
                                        </p>
                                        <Link to={'/dashboard/my-courses'}>
                                            <p className=' text-yellow-50 text-xs font-semibold'>
                                                View All
                                            </p>
                                        </Link>
                                    </div>

                                    <div className='flex flex-col md:flex-row gap-x-5 gap-y-7 my-4'>
                                        {coursesData.slice(0, 3).map((course) => (
                                            <div>
                                                <img
                                                    src={course?.thumbnail}
                                                    alt={course?.courseName}
                                                    className='h-[200px] w-full rounded-md object-cover'
                                                />
                                                <p className='mt-3 text-sm font-medium text-richblack-50'>
                                                    {course?.courseName}
                                                </p>
                                                <p className='mt-1 text-xs font-medium text-richblack-300'>
                                                    {course?.totalEnrolledStudents}{" "}
                                                    Students | ₹ {course.price}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>     
                            </div>
                        )
                    )
                }
            </div>
        </div>
    )
}
export default DashboardInfo;