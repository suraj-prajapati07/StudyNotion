import React from "react";
import {AiOutlineDown} from "react-icons/ai";
import CourseSubSectionAccordion from "./CourseSubSectionAccordion";
import { useState, useEffect, useRef } from "react";

const CourseAccordionBar = ({section, isCollapse, handleCollapse}) => {
    //reference the inner div -> mesure its scroll height
    const contentE1 = useRef(null);

    //check section active or not for collapsing.
    const[active, setActive] = useState(false);
    useEffect(() => {
        setActive(isCollapse?.includes(section._id));
    }, [isCollapse]);

    //if section active then mesure height.
    const[sectionHeight, setSectionHeight] = useState(0);
    useEffect(() => {
        setSectionHeight(active? contentE1.current.scrollHeight : 0);
    }, [active]);

    return(
        <div className="overflow-hidden border border-solid border-richblack-600 bg-richblack-700 text-richblack-5 last:mb-0">
            <div 
                className="flex cursor-pointer items-start justify-between bg-opacity-20 px-7 py-6 transition-[0.3s]"
                onClick={() => handleCollapse(section?._id)}
            >
                {/* Left part */}
                <div className="flex items-center gap-2">
                    <i
                        className={isCollapse.includes(section?._id)? "rotate-180" : "rotate-0"}
                    >
                        <AiOutlineDown/>
                    </i>
                    <p>{section?.sectionName}</p>
                </div>
                {/* Right part */}
                <div className="space-x-4">
                    <span className="text-yellow-25">
                        {`${section?.subSection.length || 0} lecture(s)`}
                    </span>
                </div>
            </div>

            {/* Subsection(Lecture) Title inside SectionAccordionBar*/}
            <div 
                ref={contentE1} //Mesure inner height
                className="relative h-0 overflow-hidden bg-richblack-900 transition-[height] 
                duration-[0.35s] ease-[ease]"
                style={{
                    height: sectionHeight
                }}
            >
                <div className="text-textHead flex flex-col gap-2 px-7 py-6 font-semibold">
                    {section?.subSection?.map((subSec, i) => (
                        <CourseSubSectionAccordion
                            key={i}
                            subSection={subSec}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CourseAccordionBar;