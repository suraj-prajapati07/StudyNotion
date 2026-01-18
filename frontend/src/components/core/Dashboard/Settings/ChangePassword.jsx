import React, { useState, useEffect } from "react";
import {useForm} from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import {Link, useNavigate} from "react-router-dom";
import { GrInProgress } from "react-icons/gr"
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../../../services/operations/settingsApi";
import { logout } from "../../../../services/operations/authApi";


const ChangePassword = () => {
    const {token} = useSelector((state) => state.auth); 

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showNewConfirmPassword, setShowNewConfirmPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const{
        register,
        handleSubmit,
        reset,
        formState:{errors, isSubmitSuccessful}
    } = useForm();

    //Fun for handling form 
    async function submitPasswordForm(data){
        // console.log("Password : ",data);
        try{
            //API Call
            setLoading(true);
            dispatch(changePassword(token, data))
                        .then(() => {
                            setLoading(false);
                            //logout...
                            dispatch(logout(navigate));
                        });
        }
        catch(error){
            console.log("Submit password form Error :",error);
        }
    }
    useEffect(() => {
        reset({
            oldPassword:"",
            newPassword:"",
            confirmPassword:"",
        })
    },[reset, isSubmitSuccessful])


    return(
        <form onSubmit={handleSubmit(submitPasswordForm)}>
            <div className="my-5 text-richblack-5 border border-richblack-700 bg-richblack-800 p-8 px-2 md:px-12 rounded-md">
                <h2 className="mb-6 text-richblack-5 tracking-wider font-semibold text-lg ">
                    Password
                </h2>

                <div className="flex w-full flex-col items-center  gap-5">
                    <label className="w-full lg:w-2/3 relative">
                        <p className="label-style  tracking-wider mb-1">
                           Current Password <span className='text-pink-100'>*</span>
                        </p>
                        <input
                            type={showCurrentPassword? "text" : "password"}
                            name="oldPassword"
                            placeholder="Enter old password"
                            className="w-full form-style"
                            {...register("oldPassword", {
                                required: {
                                    value: true,
                                    message: 'Please enter your current password'
                                }
                            })}
                        />
                        <span 
                            onClick={() => setShowCurrentPassword((prev) => !prev)}
                            className="absolute right-3 top-[38px] cursor-pointer"
                        >
                            {
                                !showCurrentPassword ?
                                (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) :
                                (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)
                            }
                        </span>

                        {/* Error handling */}
                        {
                            errors.oldPassword && (
                                <p className='-mt-0.5 text-[12px] text-pink-300' >
                                    {errors.oldPassword?.message}
                                </p>
                            )
                        }
                    </label>

                    <label className="w-full lg:w-2/3 relative">
                        <p className="label-style  tracking-wider mb-1">
                            New Password <span className='text-pink-100'>*</span>
                        </p>
                        <input
                            type={showNewPassword? "text" : "password"}
                            name="newPassword"
                            placeholder="New password"
                            className="w-full form-style"
                            {...register("newPassword", {
                                required: {
                                    value: true,
                                    message: 'Please enter your new password'
                                },
                                minLength: {
                                    value: 8,
                                    message: 'Invalid password! Please enter minimum 8 length strong password'
                                }
                            })}
                        />

                        <span 
                            onClick={() => setShowNewPassword((prev) => !prev)}
                            className="absolute right-3 top-[38px] cursor-pointer"
                        >
                            {
                                !showNewPassword ? 
                                (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) :
                                (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)
                            }
                        </span>

                        {/* Error handling */}
                        {
                            errors.newPassword && (
                                <p className='-mt-0.5 text-[12px] text-pink-300' >
                                    {errors.newPassword?.message}
                                </p>
                            )
                        }
                    </label>

                    <label className="w-full lg:w-2/3 relative">
                        <p className="label-style  tracking-wider mb-1">
                           Confirm Password <span className='text-pink-100'>*</span>
                        </p>
                        <input
                            type={showNewConfirmPassword? "text" : "password"}
                            name="confirmPassword"
                            placeholder="Confirm password"
                            className="w-full form-style"
                            {...register("confirmPassword", {
                                required: {
                                    value: true,
                                    message: 'Please enter your confirm password'
                                },
                                minLength: {
                                    value: 8,
                                    message: 'Invalid password!'
                                }
                            })}
                        />

                        <span 
                            onClick={() => setShowNewConfirmPassword((prev) => !prev)}
                            className="absolute right-3 top-[38px] cursor-pointer"
                        >
                            {
                                !showNewConfirmPassword ? 
                                (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) :
                                (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)
                            }
                        </span>

                        {/* Error handling */}
                        {
                            errors.confirmPassword && (
                                <p className='-mt-0.5 text-[12px] text-pink-300' >
                                    {errors.confirmPassword?.message}
                                </p>
                            )
                        }
                    </label>
                </div>
            </div>
            
            {/* Cancel and Change Btn */}
            <div className="flex items-center gap-x-4 justify-end">
                <Link
                    to={'/dashboard/my-profile'}
                    className={`rounded-md bg-richblack-800 lg:py-2 py-1 lg:px-5 px-2 font-semibold text-richblack-50 uppercase tracking-wider
                        ${loading? "cursor-not-allowed" : "cursor-pointer"}`
                    }
                >
                    Cancel
                </Link>

                <button
                    type="submit"
                    className={`flex items-center gap-x-2 lg:py-2 lg:px-5 rounded-md py-1 px-2 font-semibold text-richblack-900 uppercase tracking-wider bg-yellow-50 ${loading? "cursor-not-allowed" : "cursor-pointer"}`}
                >
                    <p>
                        {loading? "Changing..." : "Change"}
                    </p>
                    {loading && <GrInProgress className="text-lg text-richblack-900 animate-spin"/>}
                </button>
            </div>
        </form>
    )
}

export default ChangePassword;