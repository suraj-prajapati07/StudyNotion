import React from "react";
import { Link } from "react-router-dom";
import {FaArrowRight} from "react-icons/fa";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/Button";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import Footer from "../components/common/Footer";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import ReviewSlider from "../components/common/ReviewSlider";

const Home = () => {

    return(
        <div>
            {/*-------------------- section -1 -------------------- */}
            <div className="relative w-11/12 max-w-maxContent mx-auto  flex flex-col items-center justify-between text-white drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]">
                
                <Link to={"/signup"}>
                    <button className="p-1 group mt-16 bg-richblack-800 rounded-full text-richblack-200 font-bold transition-all duration-200 hover:scale-95 w-fit">
                        <div className="py-2 px-10 flex flex-row items-center gap-2 transition-all duration-200 group-hover:bg-richblack-900 rounded-full">
                            <p>Become an Instructor</p>
                            <FaArrowRight/>
                        </div>
                    </button>
                </Link>

                <div className="mt-7 text-4xl text-center font-semibold">
                    Empower Your Future with <HighlightText text={"Coding Skills"}/>
                </div>

                <div className='mt-4 w-[90%] text-center text-lg font-bold text-richblack-300'>
                    With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
                </div>

                <div className="mt-8 flex flex-row gap-6">
                    {/* Call to act btn */}
                    <CTAButton active={true} linkTo={"/signup"}>
                        Learn More
                    </CTAButton>
                    <CTAButton active={false} linkTo={"/login"}>
                        Book a Demo
                    </CTAButton>
                </div>
                {/* Video banner */}
                <div className='mx-3 my-12 shadow-[10px_-5px_50px_-5px] shadow-blue-200'>
                    <video 
                    autoPlay 
                    loop 
                    muted 
                    class="shadow-[20px_20px_rgba(255,255,255)]"
                    >
                        <source src={Banner} type="video/mp4"/>
                    </video>
                </div>
                {/* Code Section-1  */}
                <div>
                    <CodeBlocks
                        position={"lg:flex-row"}
                        heading={
                            <div className="text-4xl font-semibold">
                                Unlock your
                                <HighlightText text={"coding potential"} /> with our online
                                courses.
                            </div>
                        }
                        subheading={
                        "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                        }
                        ctabtn1={
                            {
                                btnText: "Try it Yourself",
                                link: "/signup",
                                active: true,
                            }
                        }
                        ctabtn2={
                            {
                                btnText: "Learn More",
                                link: "/signup",
                                active: false,
                            }
                        }
                        codeColor={"text-yellow-25"}
                        codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
                        backgroundGradient={<div className="codeblock1 absolute"></div>}
                    />
                </div>

                {/* Code Section-2 */}
                <div>
                    <CodeBlocks
                        position={"lg:flex-row-reverse"}
                        heading={
                            <div className="w-[100%] text-4xl font-semibold lg:w-[50%]">
                                Start
                                <HighlightText text={"coding in seconds"} />
                            </div>
                        }
                        subheading={
                        "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                        }
                        ctabtn1={
                            {
                                btnText: "Continue Lesson",
                                link: "/signup",
                                active: true,
                            }
                        }
                        ctabtn2={
                            {
                                btnText: "Learn More",
                                link: "/signup",
                                active: false,
                            }
                        }
                        codeColor={"text-white"}
                        codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
                        backgroundGradient={<div className="codeblock2 absolute"></div>}
                    />
                </div>
                {/* Switching Tab wala -> ExploreMore*/}
                <ExploreMore/>


            </div>

            {/* ---------------section -2 ------------------------*/}
            <div className="bg-pure-greys-5 text-richblack-700">

                <div className="homepage_bg h-[333px]">
                    <div className="w-11/12 max-w-maxContent mx-auto flex flex-col gap-8 items-center justify-between">
                        <div className="lg:h-[150px]"></div>
                        {/* Button group */}
                        <div className="flex flex-row gap-7 text-white lg:mt-8">
                            <CTAButton active={true} linkto={"/signup"}>
                                <div className="flex items-center gap-2">
                                    Explore Full Catalog
                                    <FaArrowRight />
                                </div>
                            </CTAButton>
                            <CTAButton active={false} linkto={"/login"}>
                                Learn More
                            </CTAButton>
                        </div>
                    </div>
                </div>

                <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-8 ">
                    <div className="mb-10 mt-[-100px] lg:mt-20 flex flex-col lg:flex-row justify-between gap-7 lg:gap-0 ">
                        {/* Left part */}
                        <div className="text-4xl font-semibold lg:w-[45%] ">
                            Get the skills you need for a
                            <HighlightText text={"job that is in demand."} />
                        </div>
                        {/* Right part */}
                        <div className="flex flex-col items-start gap-10 lg:w-[40%]">
                            <div className="text-[16px]">
                                The modern educational landscape dictates its own terms. Today, being a competitive specialist requires more than just professional skills.
                            </div>
                            <CTAButton active={true} linkto={"/signup"}>
                                Learn More
                            </CTAButton>
                        </div>
                    </div>

                    {/*-Timeline section-*/}
                    <TimelineSection/>

                    {/*-Learning Language Section-*/}
                    <LearningLanguageSection/>
                </div>

                
            </div>

            {/* ------------------------section-3---------------------- */}
            <div className="relative my-20 w-11/12 max-w-maxContent mx-auto flex flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
                {/* Become a instructor section */}
                <InstructorSection/>
                {/* Reviws from Other Learner */}
                <h2 className="text-center text-4xl font-semibold mt-8">
                    Reviews From Other Learner
                </h2>
                {/* Review Slider */}
                <ReviewSlider/>
                    
            </div>

            {/* footer */}
            <Footer/>
        </div>
    )
}

export default Home;