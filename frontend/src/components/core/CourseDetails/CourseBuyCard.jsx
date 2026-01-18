import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import {BsFillCaretRightFill} from "react-icons/bs";
import {FaShareSquare} from "react-icons/fa";
import copy from "copy-to-clipboard"

const CourseBuyCard = ({course, courseBuyHandler, addToCartHandler}) => {
    const{user} = useSelector((state) => state.profile);

    const navigate = useNavigate();


    //course sharing handler
    const handleShare = async() => {
        const shareData ={
            title: "Check this out!",
            text: "Hey, take a look at this website!",
            url: window.location.href
        }

        if(navigator.share){
            try{
                await navigator.share(shareData);
                toast.success("Link Shared Successfully")
            }
            catch(error){
                console.log("Shared canceled or failed",error);
            }
        }
        else{
            //Fallback for browsers without web share API
            copy(window.location.href);
            toast.success("Link copied to Clipboard")
        }
    }
    return(
        <div className="flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5">
            {/* course thumbnail */}
            <img
                src={course?.thumbnail}
                alt="course thumbnail"
                className="max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover md:max-w-full"
            />
            <div className="px-4">
                <div className="space-x-3 pb-4 text-3xl font-semibold">
                    Rs. {course.price}
                </div>
                {/* btn -> Buy & Add to Cart */}
                <div className="flex flex-col gap-4">
                    {/* Buy btn */}
                    <button
                        onClick={user && course.studentsEnrolled.includes(user._id) ?
                            () => navigate("/dashboard/enrolled-courses") : courseBuyHandler
                        }
                        className="cursor-pointer rounded-md bg-yellow-50 px-[20px] py-[8px] font-semibold text-richblack-900 capitalize"
                    >
                        {user && course.studentsEnrolled.includes(user._id) ?
                            "Go To Course" : "Buy Now"
                        }
                    </button>

                    {/* Add to Cart btn */}
                    <button
                        onClick={addToCartHandler}
                        className="cursor-pointer rounded-md bg-richblack-800 px-[20px] py-[8px] font-semibold text-richblack-5 capitalize"
                    >
                        Add to Cart
                    </button>
                </div>
                <p className="text-center text-sm text-richblack-25 pb-3 pt-6">
                    30-Day Money-Back Guarantee
                </p>

                {/* Pre requisite */}
                <div>
                    <p className="my-2 text-xl font-semibold">
                        Pre - Requisite :
                    </p>
                    <div className="flex flex-col gap-3 text-sm text-caribbeangreen-100">
                        {course?.instructions?.map((instr, i) => {
                            return(
                                <p key={i} className="flex items-center gap-2">
                                    <BsFillCaretRightFill/>
                                    <span>{instr}</span>
                                </p>
                            )
                        })}
                    </div>
                </div>

                {/* share btn */}
                <button
                    onClick={handleShare}
                    className="mx-auto flex items-center gap-2 py-6 text-yellow-100 "
                >
                    <FaShareSquare size={15}/>
                    <span>
                        Share
                    </span>
                </button>
            </div>
        </div>
    )
}
export default CourseBuyCard;