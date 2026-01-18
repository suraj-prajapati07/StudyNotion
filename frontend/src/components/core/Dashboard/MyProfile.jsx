import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconButton from "../../common/IconButton";
import { RiEditBoxLine } from 'react-icons/ri'

const MyProfile = () => {
    const{user} = useSelector((state) => state.profile);
    const navigate = useNavigate();


    return(
        <div className="bg-richblack-900 text-white mx-0 md:mx-5">
            <h1 className="font-medium text-richblack-5 text-3xl mb-7">
                My Profile
            </h1>

            {/* Section-1 [My Profile] */}
            <div className="flex flex-row items-center justify-between border border-richblack-700 bg-richblack-800 p-8 px-3 md:px-12 rounded-md">
                <div className="flex flex-row items-center gap-x-2 md:gap-x-4">
                    <div>
                        <img
                            src={user?.image}
                            alt={`profile-${user?.firstName}`}
                            className="aspect-square w-[60px] md:w-[78px] rounded-full object-cover"
                        />
                    </div>
                    <div className="space-y-1">
                        <h2 className="text-lg font-semibold text-richblack-5">
                            {user?.firstName} {user?.lastName}
                        </h2>
                        <p className="text-sm text-richblack-300">
                            {user?.email}
                        </p>
                    </div>
                </div>
                
                {/* Icon Btn */}
                <IconButton
                    text={"Edit"}
                    onClickHandler= {()=> navigate("/dashboard/setting")}
                    customClasses={`hidden md:block`}
                    children={<RiEditBoxLine />}
                />
            </div>

            {/* Section-2 [About] */}
            <div className="my-7 md:my-10 border border-richblack-700 bg-richblack-800 p-8 px-3 md:px-12 rounded-md flex flex-col gap-y-10">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-richblack-5">
                        About
                    </h2>
                    <IconButton
                        text={"Edit"}
                        onClickHandler= {()=> navigate("/dashboard/setting")}
                        customClasses={`hidden md:block`}
                        children={<RiEditBoxLine />}
                    />
                </div>
                <p 
                    className={`${user?.additionalDetails?.about? "text-richblack-5" : "text-richblack-400"}
                    text-sm font-medium`}
                >
                    {
                        user?.additionalDetails?.about || "Write Something About Yourself"
                    } 
                </p>
            </div>

            {/* Section-3 [Personal Details]*/}
            <div className="my-7 md:my-10 border border-richblack-700 bg-richblack-800 p-8 px-3 md:px-12 rounded-md flex flex-col gap-y-10">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-richblack-5">
                            Personal Details
                        </h2>
                        <IconButton
                            text={"Edit"}
                            onClickHandler= {()=> navigate("/dashboard/setting")}
                            customClasses={`hidden md:block`}
                            children={<RiEditBoxLine />}
                        />
                    </div>

                    {/* First and Last name */}
                    <div className="flex flex-col gap-y-5 md:flex-row ">
                        <div className="w-full md:w-1/2">
                            <p className='mb-2 text-sm text-richblack-500'>First Name</p>
                            <p className='text-sm text-richblack-5 font-medium'>{user?.firstName}</p>
                        </div>
                        <div className="w-full md:w-1/2">
                            <p className='mb-2 text-sm text-richblack-500'>Last Name</p>
                            <p className='text-sm text-richblack-5 font-medium'>{user?.lastName}</p>
                        </div>
                    </div>

                    {/* Email and Contact no */}
                    <div className="flex flex-col gap-y-5 md:flex-row ">
                        <div className="w-full md:w-1/2">
                            <p className='mb-2 text-sm text-richblack-500'>Email</p>
                            <p className='text-sm text-richblack-5 font-medium'>{user?.email}</p>
                        </div>
                        <div className="w-full md:w-1/2">
                            <p className='mb-2 text-sm text-richblack-500'>Phone Number</p>
                            <p 
                                className={`text-sm font-medium ${user?.additionalDetails?.contactNumber? 
                                    "text-richblack-5" : "text-richblack-300"}`}
                            >
                                {user?.additionalDetails?.contactNumber?? "Add Contact Number"}
                            </p>
                        </div>
                    </div>

                    {/* Gender and DOB */}
                    <div className="flex flex-col gap-y-5 md:flex-row ">
                        <div className="w-full md:w-1/2">
                            <p className='mb-2 text-sm text-richblack-500'>Gender</p>
                            <p 
                                className={`text-sm font-medium ${user?.additionalDetails?.gender? 
                                    "text-richblack-5" : "text-richblack-300"}`}
                            >
                                {user?.additionalDetails?.gender ?? "Add Gender"}
                            </p>
                        </div>
                        <div className="w-full md:w-1/2">
                            <p className='mb-2 text-sm text-richblack-500'>Date Of Birth</p>
                            <p 
                                className={`text-sm font-medium ${user?.additionalDetails?.dateOfBirth? 
                                    "text-richblack-5" : "text-richblack-300"}`}
                            >
                                {user?.additionalDetails?.dateOfBirth?? "Add Date Of Birth"}
                            </p>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default MyProfile;