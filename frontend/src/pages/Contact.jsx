import React from "react";
import ContactDetails from "../components/core/ContactUsPage/ContactDetails";
import ContactUsForm from "../components/core/ContactUsPage/ContactUsForm";
import ReviewSlider from "../components/common/ReviewSlider";
import Footer from "../components/common/Footer";

const Contact = () => {
    return(
        <div>
            <div className="relative mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row">
                {/* Contact details */}
                <div className="lg:w-[40%] ">
                    <ContactDetails/>
                </div>

                {/* contact form */}
                <div className="lg:w-[60%] border border-richblack-600 text-richblack-300 rounded-xl p-7 lg:p-14 
                flex gap-3 flex-col">
                    <h1 className="text-4xl leading-10 font-semibold text-richblack-5">
                        Got a Idea? We&apos;ve got the skills. Let&apos;s team up
                    </h1>
                    <p className="">
                        Tell us more about yourself and what you&apos;re got in mind.
                    </p>
                    <div className="mt-7">
                        <ContactUsForm/>
                    </div>
                </div>
            </div>

            {/* Review from other learner */}
            <div className="relative w-11/12 max-w-maxContent mx-auto my-20 flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
                <h1 className="text-center text-4xl font-semibold mt-8">
                    Reviews from other learners
                </h1>
                <ReviewSlider/>
            </div>

            {/* Footer */}
            <Footer/>

        </div>
    )
}

export default Contact;