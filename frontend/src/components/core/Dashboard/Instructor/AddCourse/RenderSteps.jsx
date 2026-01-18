import React, { useState } from "react";
import {useSelector} from "react-redux"
import { FaCheck } from "react-icons/fa"
import CourseInformationForm from "./CourseInformation/CourseInformationForm";
import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm";
import CoursePublish from "./CoursePublish";

const RenderSteps = () => {
    const {step} = useSelector((state) => state.course);

    const steps = [
        {id: 1, title: 'Course Information'},
        {id: 2, title: 'Course Builder'},
        {id: 3, title: 'Publish'},
    ]

    return(
        <div>
            <div className="w-full flex justify-center mb-2">
                {
                    steps.map((item) => {
                        return(
                            //React.Fragement -> [<> element </>] (it does not add extra DOM node like <div></div>)
                            <React.Fragment
                                key={item.id}
                            >
                                {/* number */}
                                <div
                                    className={`w-[34px] rounded-full aspect-square grid place-items-center border select-none 
                                    ${step === item.id && "bg-yellow-900 text-yellow-50 border-yellow-50 "}
                                    ${step > item.id && "bg-yellow-50 text-richblack-900 font-bold" }
                                    ${step < item.id && "bg-richblack-800 text-richblack-300 border-richblack-700 "}
                                    `}
                                >
                                    {
                                        step > item.id ? <FaCheck/> : item.id
                                    }
                                </div>
                                {/* dashed line */}
                                {
                                    item.id !== steps.length && (
                                        <div
                                            className={`h-[calc(34px/2)] w-[33%] border-b-2 border-dashed
                                            ${step > item.id? "border-yellow-50" : "border-richblack-500"}`}
                                        >   
                                        </div>
                                    )
                                }

                            </React.Fragment>
                        )
                    })
                }
            </div>
            {/* title */}
            <div className="mb-10 md:mb-16">
                <div className="hidden md:flex justify-between select-none">
                    {
                        steps.map((item) => 
                            <div
                                key={item.id}
                                className={`min-w-[130px] text-center text-sm  uppercase tracking-wider
                                ${step >= item.id? "text-richblack-5" : "text-richblack-500"}`}
                            >
                                {item.title}
                            </div>
                        )
                    }
                </div>
            </div>
            
            {/* show course page formation according to step */}
            {step === 1 && <CourseInformationForm/>}
            {step === 2 && <CourseBuilderForm/>}
            {step === 3 && <CoursePublish/>}
        </div>
    )
}

export default RenderSteps;