import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/common/Spinner";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi"
import { resetPassword } from "../services/operations/authApi";

const UpdatePassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const location = useLocation();

    const[showPassword, setShowPassword] = useState(false);
    const[showConfirmPassword, setShowConfirmPassword] = useState(false);

    const[resetCompleted, setResetCompleted] = useState(false);
    const[email, setEmail] = useState("");

    const {loading} = useSelector((state) => state.auth);
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    })
    const {password, confirmPassword} = formData;

    //input field change handler
    function changeHandler(event){
        setFormData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value,
        }))
    }

    //form submit handler......
    function submitHandler(event){
        event.preventDefault();
        //API call for reset password....
        const token = location.pathname.split("/").at(-1); //URL ke right-most mei hai token.....
        dispatch(resetPassword(password, confirmPassword, token, setResetCompleted, setEmail));

    }

    return(
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            {
                loading? (<Spinner/>) :(
                    <div className="max-w-[500px] lg:p-8 p-4">
                        <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
                            {
                                !resetCompleted? "Choose new password" : "Reset complete!"
                            }
                        </h1>
                        <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
                            {
                                !resetCompleted? "Almost done. Enter your new password and youre all set." :
                                `All done! We have sent an email to ${email.charAt(0)}***********@gmail.com to confirm`
                            }
                            
                        </p>

                        {/* Form  */}
                        {   !resetCompleted &&(
                            <form 
                                onSubmit={submitHandler}
                                className="flex flex-col gap-3"
                            >
                                {/* password  */}
                                <label className="relative">
                                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                        New Password <sup className="text-pink-200">*</sup>
                                    </p>
                                    <input
                                        required
                                        type={showPassword? "text" : "password"}
                                        name="password"
                                        placeholder="Enter Password"
                                        value={password}
                                        onChange={changeHandler}
                                        className="form-style w-full"
                                    />
                                    <span
                                        onClick={()=> setShowPassword((prev) => !prev)}
                                        className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                                    >
                                        {
                                            showPassword? (<AiOutlineEye fontSize={24} fill="#AFB2BF"/>) : 
                                            (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>)
                                        }
                                    </span>
                                </label>
                                {/* confirm password */}
                                <label className="relative">
                                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                        Confirm New Password <sup className="text-pink-200">*</sup>
                                    </p>
                                    <input
                                        required
                                        type={showConfirmPassword? "text" : "password"}
                                        name="confirmPassword"
                                        placeholder="Confirm Password"
                                        value={confirmPassword}
                                        onChange={changeHandler}
                                        className="form-style w-full"
                                    />

                                    <span
                                        onClick={()=> setShowConfirmPassword((prev) => !prev)}
                                        className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                                    >
                                        {
                                            showConfirmPassword? (<AiOutlineEye fontSize={24} fill="#AFB2BF"/>) : 
                                            (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>)
                                        }
                                    </span>
                                </label>

                                {/* Reset Btn */}
                                <button
                                    type="submit"
                                    className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
                                >
                                    Reset Password
                                </button>
                            </form>
                            )
                        }

                        {/* Reset completed btn*/}
                        { resetCompleted && (
                            <button
                                className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
                            >
                                <Link to={"/login"}>
                                    Return to Login
                                </Link>
                            </button>
                            )
                        }

                        {/* Back to login */}
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

export default UpdatePassword;