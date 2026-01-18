import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/common/Spinner";
import OTPInput from "react-otp-input";
import { useState, useEffect } from "react";
import { RxCountdownTimer } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { sendOtp, signUp } from "../services/operations/authApi";


const VerifyEmail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const{loading, signupData} = useSelector((state) => state.auth);

    useEffect(() => {
        if (!signupData) {
            navigate("/signup");
        }

    }, []);

    const[otp, setOtp] = useState('');

    //function for handling form data..
    function submitHandler(event){
        event.preventDefault();
        //API call for signup...
        dispatch(signUp(signupData, otp, navigate))
    }

    return(
        <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center">
            {
                loading? 
                (<Spinner/>) :(
                <div className="max-w-[500px] p-4 lg:p-8">
                    <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
                        Verify email
                    </h1>
                    <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">
                        A verification code has been sent to you. Enter the code below
                    </p>

                    {/* form */}
                    <form
                        onSubmit={submitHandler}
                        className=""
                    >
                        <OTPInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderInput={(props) => (
                                    <input 
                                        {...props}
                                        placeholder="-"
                                        style={{
                                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                            }
                                        }
                                        
                                    />
                                )
                            }
                            
                            inputStyle = "w-[48px] lg:w-[60px] aspect-square bg-richblack-800 rounded-[0.5rem] text-center text-richblack-5 outline-none focus:outline-2 focus:outline-yellow-50"
                            
                            containerStyle = "flex flex-row justify-between gap-x-0 gap-y-[6px] "
                        />

                        <button
                            type="submit"
                            className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900 "
                        >
                            Verify and Register
                        </button>

                        {/* Back to login and resend otp btn */}
                        <div className="mt-6 flex items-center justify-between">
                            <Link to={"/login"}>
                                <div className="flex items-center gap-x-2 text-richblack-5">
                                    <BiArrowBack/>
                                    <p>Back To Login</p>
                                </div>
                            </Link>

                            {/*resend otp btn  */}
                            <button
                                onClick={() => dispatch(sendOtp(signupData.email))}
                                className="flex items-center gap-2 text-blue-100"
                            >
                                <RxCountdownTimer/>
                                <p>Resend it</p>
                            </button>

                        </div>
                    </form>
                </div>
                )
            }
        </div>

        
    )
}

export default VerifyEmail;