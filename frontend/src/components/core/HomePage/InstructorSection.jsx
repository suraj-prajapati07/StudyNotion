import React from "react";
import instructor from "../../../assets/Images/Instructor.png"
import HighlightText from "./HighlightText";
import CTAButton from "../../../components/core/HomePage/Button";
import {FaArrowRight} from "react-icons/fa"

const InstructorSection = () => {

    return(
        <div>
            <div className="flex flex-col lg:flex-row items-center gap-20">
                <div className="w-[50%]">
                    <img src={instructor} alt=""
                        className="shadow-white shadow-[-20px_-20px_0_0]"
                    />
                </div>

                <div className="lg:w-[50%] flex flex-col items-start gap-10">
                    <h2 className="text-4xl font-semibold lg:w-[50%]">
                        Become an
                        <HighlightText text={"instructor"}/>
                    </h2>
                    <p className="w-[90%] font-medium text-[16px] text-richblack-300 text-justify">
                        Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                    </p>
                    <CTAButton active={"true"} linkTo={"/signup"}>
                        <div className="flex items-center gap-3">
                            Start Teaching Today
                            <FaArrowRight />
                        </div>
                    </CTAButton>
                </div>
            </div>
        </div>
    )
}

export default InstructorSection;