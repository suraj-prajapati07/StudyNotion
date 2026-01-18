import React from "react";
// Importing React Icons
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";

const CourseCard = ({cardData, currentCard, setCurrentCard}) => {
    return(
        <div 
            className={`lg:w-[30%] w-[360px]  h-[300px] cursor-pointer
                ${currentCard === cardData?.heading?
                "bg-richblack-5 text-richblack-600 shadow-[12px_12px_0_0] shadow-yellow-100" : "bg-richblack-800 text-richblack-200"
            }`}
            onClick={() => setCurrentCard(cardData?.heading)}
        >
            <div className="p-6 h-[80%] border-b-2 border-dashed flex flex-col gap-3">
                <h3 className={`font-semibold text-[20px] 
                        ${currentCard === cardData?.heading? "text-richblack-800":"text-richblack-25"
                    }`}>
                    {cardData?.heading}
                </h3>
                <p>
                    {cardData?.description}
                </p>
            </div>

            <div className={`py-3 px-6 flex flex-row items-center justify-between
                ${currentCard === cardData?.heading? "text-blue-300" : ""}`}>
                {/* Level */}
                <div className="flex items-center gap-2 text-[16px]">
                    <HiUsers />
                    <p>{cardData?.level}</p>
                </div>

                {/* Flow Chart */}
                <div className="flex items-center gap-2 text-[16px]">
                    <ImTree />
                    <p>{cardData?.lessionNumber} Lession</p>
                </div>
            </div>
            
        </div>
    )
}

export default CourseCard;