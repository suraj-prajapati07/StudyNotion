import React from "react";
import HighlightText from "./HighlightText";
import know_your_progress from "../../../assets/Images/Know_your_progress.png";
import compare_with_others from "../../../assets/Images/Compare_with_others.png";
import plan_your_lessons from "../../../assets/Images/Plan_your_lessons.png";
import CTAButton from "../../../components/core/HomePage/Button";

const LearningLanguageSection = () => {

    return(
        <div>
            <div className="text-center text-4xl font-semibold my-10 mb-20">
                {/* Heading */}
                <div>
                    Your swiss knife for
                    <HighlightText text="learning any language" />
                </div>
                {/* Description */}
                <div className="w-[75%] mt-3 text-center text-richblack-700 font-medium text-base leading-6 mx-auto">
                    Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
                </div>
                {/* Images */}
                <div className="mt-8 lg:mt-0 flex flex-col lg:flex-row items-center justify-center">
                    <img src={know_your_progress} alt=""
                    className="object-contain lg:-mr-32"/>
                    <img src={compare_with_others} alt=""
                    className="object-contain -mt-12 lg:-mt-0 lg:-mb-10"/>
                    <img src={plan_your_lessons} alt=""
                    className="object-contain lg:-ml-36 lg:-mt-5 -mt-16"/>
                </div>
                {/* learn more btn */}
                <div className="mx-auto w-fit mt-8">
                    <CTAButton  active={true} linkTo={"/signup"}>
                        Learn More
                    </CTAButton>
                </div>
            </div>
        </div>
    )
}

export default LearningLanguageSection;