import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/common/Spinner";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi"
import { getPasswordResetToken } from "../services/operations/authApi";

const ForgotPassword = () => {
    const {loading} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    //flag var for showing "emil sent" or "check your email" component.
    const[emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("");

    //function for handling form submit.
    function submitHandler(event){
        event.preventDefault();
        //API call for sending mail containing url with token for password reset...
        dispatch(getPasswordResetToken(email, setEmailSent));

    }

    return (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            {loading? (<Spinner/>) :(
                    <div className="max-w-[500px] p-4 lg:p-8">
                        <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
                            {
                                !emailSent? "Reset your password" : "Check email"
                            }
                        </h1>

                        <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
                            {
                                !emailSent? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery" : 
                                `We have sent the reset email to ${email}`
                            }
                        </p>
                        {/* form for sending mail */}
                        <form 
                            onSubmit={submitHandler}
                            className=""
                        >
                            {
                                !emailSent && (
                                    <label className="w-full">
                                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                            Email Address <sup className="text-pink-200">*</sup>
                                        </p>
                                        <input
                                            required
                                            type="email"
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="form-style w-full"

                                        />
                                    </label>
                                )
                            }

                            {/* submit btn */}
                            <button
                                type="submit"
                                className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
                            >
                                {
                                    !emailSent? "Submit" : "Resend email"
                                }
                            </button>

                        </form>

                        {/* Back to Login */}
                        <div className="mt-6">
                            <Link to={"/login"}>
                                <div className="flex items-center gap-x-2 text-richblack-5">
                                    <BiArrowBack/>
                                    <p>Back To Login</p>
                                </div>
                            </Link>
                        </div>
                    </div>

                )   
            }
        </div>
    )
}

export default ForgotPassword;