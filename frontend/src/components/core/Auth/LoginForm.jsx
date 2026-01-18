import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../services/operations/authApi";

function LoginForm(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const[showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const {email, password} = formData;

    //Input change......
    function changeHandler(event){
        setFormData((prevData) => ({
            ...prevData,
            [event.target.name] : event.target.value,
        }));
    }

    //Submit handler....
    function submitHandler(event){
        event.preventDefault();
        //API call for login....
        dispatch(login(email, password, navigate));
    }


    return(
        <form 
            onSubmit={submitHandler}
            className="mt-6 flex w-full flex-col gap-y-4"   
        >
            {/* Email */}
            <label className="w-full">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                    Email Address <sup className="text-pink-200">*</sup>
                </p>
                <input
                    required
                    type="email"
                    name="email"
                    placeholder="Enter email address"
                    value={email}
                    onChange={changeHandler}
                    className="w-full bg-richblack-700 rounded-lg p-3 border-b border-richblack-300 text-richblack-5 outline-none placeholder:text-richblack-400"
                
                />
            </label>

            {/* Password */}
            <label className="relative w-full">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                    Password <sup className="text-pink-200">*</sup>
                </p>
                <input
                    required
                    type={showPassword? "text" : "password"}
                    name="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={changeHandler}
                    className="w-full bg-richblack-700 rounded-lg p-3 border-b border-richblack-300 text-richblack-5 outline-none placeholder:text-richblack-400"
                
                />

                {/* show password or not */}
                <span
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-[38px] z-[10] cursor-pointer"    
                >
                    {
                        showPassword? (<AiOutlineEye fontSize={24} fill="#AFB2BF"/>) : (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>)
                    }
                </span>

                {/* Forget password */}
                <Link to={"/forget-password"}>
                    <p className="capitalize text-xs font-medium text-blue-100 mt-1 max-w-max ml-auto">
                        forgot password
                    </p>
                </Link>

            </label>

            {/* login Btn */}
            <button
                type="submit"
                className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
            >
                Sign In
            </button>

        </form>
    )
}

export default LoginForm;