import React from "react";
import ContactUsForm from "../ContactUsPage/ContactUsForm";

const GetInTouchForm = () => {
    return(
        <div className="my-20 w-11/12 max-w-maxContent mx-auto grid grid-cols-1">
            <div className="mx-auto text-white">
                <h1 className="text-center text-4xl font-semibold">
                    Get in Touch
                </h1>
                <p className="text-center text-richblack-300 mt-3">
                    We'd love to here for you, Please fill out this form.
                </p>

                <div className="mt-12 mx-auto">
                    <ContactUsForm/>
                </div>
            </div>
        </div>
    )
}

export default GetInTouchForm;