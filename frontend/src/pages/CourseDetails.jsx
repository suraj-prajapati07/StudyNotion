import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCourseDetails } from "../services/operations/courseApi";
import { GetAverageRating } from "../utils/GetAverageRating";
import Spinner from "../components/common/Spinner";
import Error from "./Error";
import RatingStars from "../components/common/RatingStars";
import {BiInfoCircle} from "react-icons/bi";
import { HiOutlineGlobeAlt } from "react-icons/hi"
import formatDate from "../utils/formatDate";
import CourseAccordionBar from "../components/core/CourseDetails/CourseAccordionBar";
import CourseBuyCard from "../components/core/CourseDetails/CourseBuyCard";
import Footer from "../components/common/Footer";
import ConfirmationModal from "../components/common/ConfirmationModal";
import { BuyTheCourse } from "../services/operations/studentFeaturesApi";
import { useDispatch, useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "../utils/constants";
import toast from "react-hot-toast";
import { addToCart } from "../slices/cartSlice";

const CourseDetails = () => {

    const{isPaymentLoading} = useSelector((state) => state.course);
    const{token} = useSelector((state) => state.auth);
    const{user} = useSelector((state) => state.profile);
    const{courseId} = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const[modalData, setModalData] = useState(null);

    const[loading, setLoading] = useState(false);
    const[courseInfo, setCourseInfo] = useState(null);
    //fetch course details 
    useEffect(() => {
        const fetchCourseDetails = async() => {
            setLoading(true);
            try{
                const res = await getCourseDetails(courseId);
                setCourseInfo(res);
                // console.log("Course Info:",courseInfo?.data?.courseDetails)
            }
            catch(error){
                console.log("Could not find course details");
            }
            setLoading(false);
        }
        //call
        fetchCourseDetails();
    },[courseId]);

    //AVG Rating
    const[avgRating, setAvgRating] = useState(0);
    useEffect(() => {
        const ans = GetAverageRating(courseInfo?.data?.courseDetails?.ratingAndReview);
        setAvgRating(ans);
    },[courseInfo]);

    //Total Lecture
    const[totalLectureCount, setTotalLectureCount] = useState(0);
    useEffect(() => {
        let lecture = 0;
        courseInfo?.data?.courseDetails?.courseContent?.forEach((section) => {
            lecture += section.subSection.length || 0;
        })
        setTotalLectureCount(lecture);
    }, [courseInfo])

    //Collapse section
    //List of courseSection: track which section are open.
    const[isCollapse, setIsCollapse] = useState(Array(0));
    //Function -> toggle the active section when clicked
    const handleCollapse = (id) => {
        //if section is open then close it(remvoval) , if close then open it(Addition)
        setIsCollapse(
            !isCollapse.includes(id)? isCollapse.concat([id]) : isCollapse.filter((e) => e !== id)
        );
    }

    //Course buying handler function
    const courseBuyHandler = () => {
        if(token){
            BuyTheCourse(token, [courseId], user, dispatch, navigate);
            return;
        }
        //other wise open a modal for login
        setModalData({
            text1: "You are not logged in!",
            text2: "Please login to buy the course",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setModalData(null)
        })
    }

    //Add to cart handler function
    const addToCartHandler = () => {
        //If user an instructor...
        if(user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR){
            toast.error("You are an Instructor. You can't buy a course.");
            return;
        }
        //user login hai tabhi add kro..
        if(token){
            dispatch(addToCart(courseInfo?.data?.courseDetails));
            return;
        }
        //other wise open a modal for login
        setModalData({
            text1: "You are not logged in!",
            text2: "Please login to add To Cart",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setModalData(null)
        })

    }

    // Loader..........
    if(loading || !courseInfo){
        return (
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                <Spinner/>
            </div>
        )
    }
    //When src not found...........
    if (!loading && !courseInfo?.success) {
        return (
           <Error/>
        )
    }
    //When payment is being
    if(isPaymentLoading){
        return(
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                <Spinner/>
            </div>
        )
    }

    const {
        courseName,
        courseDescription,
        thumbnail,
        price,
        whatYouWillLearn,
        courseContent,
        ratingAndReview,
        instructor,
        studentsEnrolled,
        createdAt,
    } = courseInfo?.data?.courseDetails;
    // Main UI
    return(
        <>
            {/*------- Hero Section------ */}
            <div className="relative w-full bg-richblack-800">
                <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative ">
                    <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
                        {/* ---Mob Screen--- */}
                        <div className="relative block max-h-[30rem] lg:hidden">
                            <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
                            <img
                                src={thumbnail}
                                alt="course thumbnail"
                                className="aspect-auto w-full"
                            />
                        </div>

                        {/*Text part */}
                        <div className="my-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5">
                            <p className="text-4xl font-bold text-richblack-5 sm:text-[42px] tracking-wider ">
                                {courseName}
                            </p>
                            <p className="text-richblack-200">
                                {courseDescription}
                            </p>
                            <div className="text-md flex flex-wrap items-center gap-2 ">
                                <span className="text-yellow-25">
                                    {avgRating}
                                </span>
                                <RatingStars avgRating={avgRating} starSize={24}/>
                                <span>{`(${ratingAndReview.length || 0} reviews)`}</span>
                                <span>{`${studentsEnrolled.length || 0} students enrolled`}</span>
                            </div>
                            <p>
                                Created By {" "}
                                <span className="italic underline">
                                    {`${instructor.firstName} ${instructor.lastName}`}
                                </span>
                            </p>
                            <div className="flex flex-wrap gap-5 text-lg">
                                <p className="flex items-center gap-2">
                                    <BiInfoCircle/>
                                    Created at {formatDate(createdAt)}
                                </p>
                                <p className="flex items-center gap-2">
                                    <HiOutlineGlobeAlt/>
                                    English
                                </p>
                            </div>
                        </div>

                        {/* Mob frame -> Buy and Add to Cart btn */}
                        <div className="flex w-full flex-col gap-4 border-y border-y-richblack-500 py-4 lg:hidden">
                            <p className="space-x-3 pb-4 text-3xl font-semibold text-richblack-5">
                                Rs. {price}
                            </p>
                            <button
                                onClick={user && studentsEnrolled?.includes(user._id) ? 
                                    () => navigate("/dashboard/enrolled-courses") : courseBuyHandler
                                }
                                className="cursor-pointer rounded-md bg-yellow-50 px-[20px] py-[8px] font-semibold text-richblack-900 capitalize tracking-wider" 
                            >
                                {user && studentsEnrolled?.includes(user._id)?
                                    "Go To Course" : "Buy Now"
                                }  
                            </button>
                            <button 
                                onClick={addToCartHandler}
                                className="cursor-pointer rounded-md bg-richblack-900 px-[20px] py-[8px] font-semibold text-richblack-5 capitalize tracking-wider"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>

                    {/* Course Buy Card */}
                    <div className="lg:absolute hidden lg:block mx-auto min-h-[600px] w-1/3 max-w-[410px]
                    translate-y-24 md:translate-y-0 right-[1rem] top-[60px]">
                        <CourseBuyCard
                            course={courseInfo?.data?.courseDetails}
                            courseBuyHandler={courseBuyHandler}
                            addToCartHandler={addToCartHandler}
                        />
                    </div>
                </div>
            </div>

            {/*--------------- What you will learn and course content -------------- */}
            <div className="mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]">
                <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
                    {/* What you will learn */}
                    <div className="my-8 border border-richblack-600 p-8">
                        <p className="text-3xl font-semibold capitalize tracking-wider">
                            What you'll Learn?
                        </p>
                        <div className="mt-5">
                            <p>{courseDescription}</p>
                        </div>
                    </div>

                    {/* Course content section */}
                    <div className="max-w-[830px]">
                        <div className="flex flex-col gap-3">
                            <p className="text-[28px] font-semibold capitalize tracking-wider">
                                Course Content
                            </p>
                            <div className="flex justify-between gap-2 flex-wrap">
                                <div className="flex gap-2 tracking-wide">
                                    <span>
                                        {courseContent?.length} {`section(s)`}
                                    </span>
                                    <span>
                                        {totalLectureCount} {`lecture(s)`}
                                    </span>
                                    <span>
                                        {courseInfo?.data?.totalDuration} {"total length"}
                                    </span>
                                </div>
                                {/* btn */}
                                <button
                                    className="text-yellow-25"
                                    onClick={() => setIsCollapse([])}
                                >
                                    Collapse all sections
                                </button>
                            </div>
                        </div>
                        
                        {/* Section Details AccordionBar */}
                        <div className="py-4">
                            {courseContent?.map((section, index) => (
                                <CourseAccordionBar
                                    key={index}
                                    section={section}
                                    isCollapse={isCollapse} 
                                    handleCollapse={handleCollapse}
                                />
                            ))}
                        </div>

                        {/* Author details */}
                        <div className="mb-12 py-4">
                            <p className="text-[28px] font-semibold">Author</p>
                            <div className="flex items-center gap-4 py-4">
                                <img
                                    src={instructor.image ? instructor.image :
                                        `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
                                    }
                                    alt="Author"
                                    className="h-14 w-14 rounded-full object-cover"
                                />
                                <p className="text-lg">{`${instructor.firstName} ${instructor.lastName}`}</p>
                            </div>
                            <p className="text-richblack-50">
                                {instructor?.additionalDetails?.about}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ------------Footer section----------- */}
            <Footer/>

            {/* -------------Confirmation Modal----------------- */}
            {
                modalData && <ConfirmationModal modalData={modalData}/>
            }

        </>
    )
}
export default CourseDetails;
