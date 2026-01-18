import React from "react";
import HighlightText from "../components/core/HomePage/HighlightText";
import BannerImage1 from "../assets/Images/aboutus1.webp";
import BannerImage2 from "../assets/Images/aboutus2.webp";
import BannerImage3 from "../assets/Images/aboutus3.webp";
import Quote from "../components/core/AboutPage/Quote";
import foundingStory from "../assets/Images/FoundingStory.png";
import StatsComponent from "../components/core/AboutPage/StatsComponent";
import LearningGrid from "../components/core/AboutPage/LearningGrid";
import GetInTouchForm from "../components/core/AboutPage/GetInTouchForm";
import Footer from "../components/common/Footer";
import ReviewSlider from "../components/common/ReviewSlider";

const About = () => {

    return(
        <div>
            {/* ---------------Section-1---------- */}
            <section className="bg-richblack-700">
                <div className="relative w-11/12 max-w-maxContent mx-auto text-white flex-col justify-between gap-10">
                    <header className="text-4xl text-center font-semibold  py-20 lg:w-[70%] mx-auto">
                        Driving Innovation in Online Education for a
                        <HighlightText text={"Brighter Future"}/>

                        <p className="mt-4 text-center  text-richblack-300 font-medium text-[17px] leading-[27px] lg:w-[90%] mx-auto">
                            Studynotion is at the forefront of driving innovation in online education. We're passionate     about creating a brighter future by offering cutting-edge courses, leveraging emerging  technologies, and nurturing a vibrant learning community.
                        </p>
                    </header>

                    <div className="w-full h-[70px] md:h-[150px] lg:h-[200px]"></div>

                    {/* Images */}
                    <div className="absolute bottom-0 left-[50%] translate-x-[-50%] translate-y-[30%] w-full grid grid-cols-3 gap-3 lg:gap-5 place-items-stretch">
                        <img
                            src={BannerImage1}
                            alt=""
                        />
                        <img
                            src={BannerImage2}
                            alt=""
                        />
                        <img
                            src={BannerImage3}
                            alt=""
                        />

                    </div>
                </div>

            </section>

            {/* ---------------Section-2---------- */}
            <section>
                <div className="mx-auto w-11/12 max-w-maxContent flex flex-col gap-10 ">
                    <div className="w-full h-[50px] md:h-[100px]"></div>
                    <Quote/>
                </div>
            </section>

            {/* ---------------Section-3---------- */}
            <section>
                <div className="mx-auto w-11/12 max-w-maxContent flex flex-col gap-10 ">
                    {/* Our Founding Story  */}
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-x-32">
                        {/* Left Box*/}
                        <div className="lg:my-20 my-10 flex lg:w-[50%] flex-col gap-10">
                            <h2 className="bg-gradient-to-tr from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent lg:w-[75%]">
                                Our Founding Story
                            </h2>
                            <p className="text-base font-medium text-richblack-300 lg:w-[75%]">
                                Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                            </p>
                            <p className="text-base font-medium text-richblack-300 lg:w-[75%]">
                                As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
                            </p>
                        </div>

                        {/* Right Box */}
                        <div className="lg:w-[50%] my-10 lg:my-20">
                            <img
                                src={foundingStory}
                                alt=""
                                className="shadow-[0_0_20px_0] shadow-[#FC6767]"
                            />
                        </div>
                    </div>

                    {/* Our Vision | Our Mission */}
                    <div className="flex flex-col lg:flex-row  justify-between gap-x-32">
                        {/* Left Box */}
                        <div className="lg:my-20 my-10 flex lg:w-[50%] flex-col gap-10">
                            <h1 className="bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-semibold text-transparent lg:w-[75%] ">
                                Our Vision
                            </h1>
                            <p className="text-base font-medium text-richblack-300 lg:w-[75%]">
                                With this vision in mind, we set out on a journey to create an
                                e-learning platform that would revolutionize the way people
                                learn. Our team of dedicated experts worked tirelessly to
                                develop a robust and intuitive platform that combines
                                cutting-edge technology with engaging content, fostering a
                                dynamic and interactive learning experience.
                            </p>
                        </div>

                        {/* Right Box */}
                        <div className="lg:my-20 my-10 flex lg:w-[50%] flex-col gap-10">
                            <h1 className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-4xl font-semibold lg:w-[75%] ">
                                Our Mission
                            </h1>
                            <p className="text-base font-medium text-richblack-300 lg:w-[75%]">
                                Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                            </p>
                        </div>
                    </div>
                   
                </div>
            </section>

            {/* ---------------Section-4---------- */}
            <section>
                <StatsComponent/>
            </section>

            {/* ---------------Section-5---------- */}
            <section>
                <LearningGrid/>
            </section>

            {/* ---------------Section-6---------- */}
            <section>
                <GetInTouchForm/>
            </section>

            {/* ---------------Section-7---------- */}
            <section>
                <div className="relative my-20 w-11/12 max-w-maxContent mx-auto flex flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
                    <h2 className="text-center text-4xl font-semibold mt-8">
                        Reviews From Other Learner
                    </h2>
                    <ReviewSlider/>
                </div>
            </section>

            {/* ---------------Section-7---------- */}
            <section>
                <Footer/>
            </section>


        </div>
    )
}

export default About;