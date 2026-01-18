import React, { useState } from "react";
import{HomePageExplore} from "../../../data/homepage-explore";
import HighlightText from "./HighlightText";
import CourseCard from "./CourseCard";

const tabsName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];
const ExploreMore = () => {
    //set current tab.......
    const[currentTab, setCurrentTab] = useState(tabsName[0]);
    //set us tab se related courses....
    const[courses, setCourses] = useState(HomePageExplore[0].courses);
    //set highlighted card....
    const[currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading)

    //function -> set course data according to current Tab......
    function setMyCard(value){
        //clicked Tab......
        setCurrentTab(value);
        //set course according to currentTab....
        const result = HomePageExplore.filter((course) => course.tag === value);
        setCourses(result[0].courses);
        //set highlighted course card.....
        setCurrentCard(result[0].courses[0].heading);
        
    }

    return(
        <div className="lg:mb-44">
            <div className="text-4xl font-semibold text-center my-8">
                Unlock the
                <HighlightText text={"Power of Code"}/>
            </div>
            <p className="text-center text-richblack-300 text-lg font-medium -mt-5">
                Learn to Build Anything You Can Imagine
            </p> 
            {/* Tab section */}
            <div className="mx-auto w-max rounded-full p-1 hidden lg:flex flex-row items-center gap-5 bg-richblack-800 my-6">
                {
                    tabsName.map((ele, index) => {
                        return(
                            <div
                                key={index}
                                className={`text-[16px] px-7 py-[7px] rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5
                                    ${currentTab === ele? "bg-richblack-900 text-richblack-5 font-medium" :
                                        "text-richblack-200"
                                    }` 
                                }
                                onClick={() => setMyCard(ele)}
                            >
                                {ele}
                            </div>
                        )
                    })
                }
            </div>
            
            {/* Course card group */}
            <div className="w-full lg:absolute flex flex-wrap lg:justify-between gap-10
            justify-center lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] lg:my-0 my-7 lg:px-0 px-3">
                {
                    courses.map((ele, index) => {
                        return(
                            <CourseCard
                                key={index}
                                cardData={ele}
                                currentCard={currentCard}
                                setCurrentCard={setCurrentCard} 
                            />
                        )
                    })
                }
            </div>

        </div>
    )
}

export default ExploreMore;