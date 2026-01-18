import React from "react";
import CTAButton from "../HomePage/Button";
import HighlightText from "../HomePage/HighlightText";


const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highlightText: "Anyone, Anywhere",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description:
      "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 3,
    heading: "Certification",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 4,
    heading: `Rating "Auto-grading"`,
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
];

const LearningGrid = () => {
    return (
        <div className="my-20 w-11/12 max-w-maxContent mx-auto">
            <div className="relative grid mx-auto grid-cols-1 xl:grid-cols-4 w-[350px] xl:w-fit mb-12">
                {
                    LearningGridArray.map((card, index) => {
                        return(
                            <div
                                key={index}
                                className={`h-[294px] ${index === 0 && "xl:col-span-2 bg-transparent mb-12 xl:mb-0"}
                                ${card.order % 2 === 1? "bg-richblack-700" : "bg-richblack-800"}
                                ${card.order === 3 && "xl:col-start-2"}`}
                            >
                                {
                                    card.order < 0 ? (
                                        <div className="xl:w-[90%] flex flex-col gap-4  xl:pb-0 pb-10">
                                            <div className="text-4xl font-semibold text-white">
                                                {card.heading}
                                                <HighlightText text={card.highlightText}/>
                                            </div>

                                            <p className="text-richblack-300 font-medium">
                                                {card.description}
                                            </p>
                                            <div className="w-fit mt-4">
                                                <CTAButton active={true} linkTo={card.BtnLink} >
                                                    {card.BtnText}
                                                </CTAButton>
                                            </div>
                                        </div>
                                    ) : 
                                    (
                                        <div className="flex flex-col gap-8 p-8">
                                            <h1 className="text-richblack-5 text-lg">
                                                {card.heading}
                                            </h1>

                                            <p className="text-richblack-300 font-medium">
                                                {card.description}
                                            </p>

                                        </div>
                                    )
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default LearningGrid;