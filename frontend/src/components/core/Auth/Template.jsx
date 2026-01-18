import React from "react";
import frameImg from "../../../assets/Images/frame.png"
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import {FcGoogle} from 'react-icons/fc';

function Template({title, description1, description2, formType, image}){
    return(
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className='w-11/12 max-w-maxContent relative flex flex-col-reverse md:flex-row mx-auto my-12 justify-between gap-y-12 md:gap-y-0'>
                {/* Left part */}
                <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
                    <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
                        {title}
                    </h1>

                    <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
                        <span className="text-richblack-100">{description1}</span>{" "}
                        <span className="font-edu-sa font-bold italic text-blue-100">
                            {description2}
                        </span>
                    </p>

                    {
                        formType === "login"? (<LoginForm/>) : (<SignupForm/>)
                    }

                    {/* ----------OR--------- */}
                    <div className="relative flex w-full items-center my-4 gap-x-2">
                        <div className="w-full h-[1px] bg-richblack-600"></div>
                        <p className="text-richblack-100">OR</p>
                        <div className="w-full h-[1px] bg-richblack-600"></div>
                    </div>
                    {/* contineue with google btn*/}
                    <button 
                        // onClick={""}
                        className="w-full border border-richblack-700 rounded-md py-2 bg-transparent flex items-center justify-center gap-x-2"
                    >
                        <FcGoogle size={25}/>
                        <p className="text-richblack-100">
                            Sign Up with Google
                        </p> 
                    </button>

                </div>

                {/* Right part */}
                <div className="relative mx-auto w-11/12 max-w-[450px] md:mx-0">
                    <img 
                        src={frameImg} 
                        width={558} 
                        height={504} 
                        loading='lazy'
                    />
                    <img 
                        className='absolute right-4 -top-4'
                        src={image} 
                        width={558} 
                        height={504} 
                        loading='lazy' 
                    />
                </div>

            </div>

        </div>
    )
}

export default Template;