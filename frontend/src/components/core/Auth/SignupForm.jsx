import React, { useState } from "react";
import Tab from "../../common/Tab";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {toast} from "react-hot-toast";
import {useDispatch} from "react-redux"
import { useNavigate } from "react-router-dom";
import { sendOtp } from "../../../services/operations/authApi";
import { setSignupData } from "../../../slices/authSlice";

function SignupForm(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    //form data
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const { firstName, lastName, email, password, confirmPassword } = formData;

    // data to pass to Tab component
    const tabData = [
        {
            id: 1,
            name: "Student",
            type: ACCOUNT_TYPE.STUDENT,
        },
        {
            id: 2,
            name: "Instructor",
            type: ACCOUNT_TYPE.INSTRUCTOR,
        },
    ]

    //account type -> default(Student)
    const[accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);

    //password show or not..
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    //Input change handler...
    function changeHandler(event){
        setFormData((prevData) =>({
            ...prevData,
            [event.target.name] : event.target.value,
        }))
    }


    //Handle on submit..
    function submitHandler(event){
        event.preventDefault();
        if(password !== confirmPassword){
            toast.error("Passwords Do Not Match")
            return
        }

        const signupData = {
            ...formData,
            accountType,
        }
        console.log("Signup Data : ", signupData);

        // Setting signup data to state
        dispatch(setSignupData(signupData));

        //API call for verify email by sending otp.
        dispatch(sendOtp(formData.email, navigate));

        // Reset
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        })
        setAccountType(ACCOUNT_TYPE.STUDENT)
    }

    return(
        <div>
            {/* Tab :(Student or Instructor) */}
            <Tab
                tabData={tabData}
                accountType = {accountType}
                setAccountType = {setAccountType}
            />

            {/* Form  */}
            <form 
                className="flex w-full flex-col gap-y-4"
                onSubmit={submitHandler}
            >
                {/* First and last name */}
                <div className="flex gap-x-4">
                    <label>
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            First Name <sup className="text-pink-200">*</sup>
                        </p>
                        <input
                            required
                            type="text"
                            name="firstName"
                            value={firstName}
                            placeholder="Enter first name"
                            onChange={changeHandler}
                            className="form-style w-full"
                        />
                    </label>
                    <label>
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            Last Name <sup className="text-pink-200">*</sup>
                        </p>
                        <input
                            required
                            type="text"
                            name="lastName"
                            value={lastName}
                            placeholder="Enter last name"
                            onChange={changeHandler}
                            className="form-style w-full"
                        />
                    </label>
                </div>

                {/* Email address */}
                <label className="w-full">
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                        Email Address <sup className="text-pink-200">*</sup>
                    </p>
                    <input
                        required
                        type="text"
                        name="email"
                        value={email}
                        onChange={changeHandler}
                        placeholder="Enter email address"
                        className="form-style w-full"
                    />
                </label>

                {/* create password */}
                <div className="flex gap-x-4">
                    <label className="relative">
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            Create Password <sup className="text-pink-200">*</sup>
                        </p>
                        <input
                            required
                            type={showPassword? "text" : "password"}
                            name="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={changeHandler}
                            className="form-style w-full"
                        />
                        <span 
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                        >
                            {
                                showPassword? <AiOutlineEye fontSize={24} fill="#AFB2BF"/> :
                                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                            }
                        </span>

                    </label>

                    <label className="relative">
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            Confirm Password <sup className="text-pink-200">*</sup>
                        </p>
                        <input
                            required
                            type={showConfirmPassword? "text" : "password"}
                            name="confirmPassword"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={changeHandler}
                            className="form-style w-full"
                        />
                        <span 
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                            className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                        >
                            {  
                                showConfirmPassword? <AiOutlineEye fontSize={24} fill="#AFB2BF"/> :
                                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                            }
                        </span>
                    </label>
                </div>

                {/* Create account btn */}
                <button
                    type="submit"
                    className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
                >
                    Create Account
                </button>
            </form>

        </div>
        
    )
}

export default SignupForm;