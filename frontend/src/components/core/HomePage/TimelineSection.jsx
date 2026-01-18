import React from "react";
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"

import TimeLineImage from "../../../assets/Images/TimelineImage.png";

const timeLine = [
    {
      Logo: Logo1,
      Heading: "Leadership",
      Description: "Fully committed to the success company",
    },
    {
      Logo: Logo2,
      Heading: "Responsibility",
      Description: "Students will always be our top priority",
    },
    {
      Logo: Logo3,
      Heading: "Flexibility",
      Description: "The ability to switch is an important skills",
    },
    {
      Logo: Logo4,
      Heading: "Solve the problem",
      Description: "Code your way to a solution",
    },
];

const TimelineSection = () =>{

    return(
        <div>
            <div className="flex flex-col lg:flex-row gap-20 mb-20 items-center">
                {/* Left section */}
                <div className="lg:w-[45%] flex flex-col gap-14 lg:gap-3">
                    {
                        timeLine.map((element, index) =>{
                            return (
                                <div key={index} className="flex flex-col lg:gap-3">
                                    <div key={index}  className="flex flex-row gap-6" >
                                        {/* logo */}
                                        <div className="w-[52px] h-[52px] bg-richblack-5 rounded-full flex justify-center items-center">
                                            <img src={element.Logo} alt=""/>
                                        </div>
                                        {/* Heading and description */}
                                        <div>
                                            <h2 className="font-semibold text-[18px]">
                                                {element.Heading}
                                            </h2>
                                            <p className="text-base">
                                                {element.Description}
                                            </p>
                                        </div>
                                    </div>
                                    {/* drop-line */}
                                    <div 
                                        className={`h-14 border-dotted border-r border-richblack-100 w-[26px]
                                            ${
                                                timeLine.length - 1 === index ? "hidden" : "lg:block"
                                            }
                                        `}
                                    >

                                    </div>

                                </div>
                            )
                        })
                    }
                </div>
                
                {/* Right section (Image) */}
                <div className="relative w-fit h-fit shadow-blue-200 shadow-[0px_0px_30px_0px]">
                    {/* image  */}
                    <img src={TimeLineImage} alt=""
                    className="h-[400px] shadow-white shadow-[20px_20px_0px_0px] object-cover lg:h-fit"
                    />

                    {/* Overlap image */}
                    <div className="absolute bg-caribbeangreen-700 flex lg:flex-row flex-col gap-4 lg:gap-0 lg:left-[50%] lg:bottom-0 lg:translate-x-[-50%] lg:translate-y-[50%] text-white uppercase
                    lg:py-10">
                        {/* Section 1 */}
                        <div className="flex gap-5 items-center lg:border-r border-caribbeangreen-300 px-7 lg:px-14">
                            <p className="text-3xl font-bold w-[75px]">10</p>
                            <p className="text-caribbeangreen-300 text-sm w-[75px]">
                                Years experiences
                            </p>
                        </div>

                        {/* Section 2 */}
                        <div className="flex gap-5 items-center lg:px-14 px-7">
                            <p className="text-3xl font-bold w-[75px]">250</p>
                            <p className="text-caribbeangreen-300 text-sm w-[75px]">
                                types of courses
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default TimelineSection;