import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import CountryCode from "../../../../data/countrycode.json";
import { Link } from "react-router-dom";
import { GrInProgress } from "react-icons/gr"
import { updateProfileInfo } from "../../../../services/operations/settingsApi";

const EditProfile = () => {
    const{user} = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const[loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    //Profile form handler......
    const submitProfileForm = async(data) => {
        // console.log("Form Data : ", data);
        //API call.....
        try{
            setLoading(true);
            dispatch(updateProfileInfo(token, data)).then(() => setLoading(false));
        }
        catch(error){
            console.log("updateProfileInfo Error");
        }
    }

    return(
        <form onSubmit={handleSubmit(submitProfileForm)}>
            <div className="my-5 border border-richblack-700 bg-richblack-800 p-8 px-2 md:px-12 rounded-md">
                <h2 className="text-richblack-5 tracking-wider text-lg font-semibold mb-6">
                    Profile Information
                </h2>

                <div className="flex flex-col gap-y-6">
                    {/*----------- First and Last name--------------- */}
                    <div className="flex flex-col lg:flex-row gap-5">
                        <label className="w-full">
                            <p className="label-style  tracking-wider mb-1">
                                First Name <span className='text-pink-100'>*</span>
                            </p>
                            <input
                                defaultValue={user?.firstName}
                                type="text"
                                name="firstName"
                                placeholder='Enter first name'
                                className="form-style w-full"
                                {...register("firstName", {required:true})}

                            />
                            {/* Error handling */}
                            {
                                errors.firstName && (
                                <p className="-mt-0.5 text-[12px] text-pink-300" >
                                    Please enter your first name
                                </p>
                                )
                            }

                            <p className="text-xs text-richblack-500 mt-2">
                                Name entered above will be used for all issued certifies.
                            </p>
                        </label>

                        <label className="w-full">
                            <p className="label-style  tracking-wider mb-1">
                                Last Name <span className='text-pink-100'>*</span>
                            </p>
                            <input
                                defaultValue={user?.lastName}
                                type="text"
                                name="lastName"
                                placeholder='Enter last name'
                                className="form-style w-full"
                                {...register("lastName", {required:true})}    
                            />
                            {/* Error handling */}
                            {
                                errors.lastName && (
                                <p className="-mt-0.5 text-[12px] text-pink-300" >
                                    Please enter your last name
                                </p>
                                )
                            }
                        </label>
                    </div>

                    {/* -----------------DOB and Gender ------------------------*/}
                    <div className="flex flex-col lg:flex-row gap-5">
                        <label className="w-full">
                            <p className="label-style tracking-wider mb-1">
                                Date Of Birth <span className='text-pink-100'>*</span>
                            </p>
                            <input
                                defaultValue={user?.additionalDetails?.dateOfBirth?.split('T')[0]}
                                type="date"
                                name="dateOfBirth"
                                placeholder='Enter DOB'
                                className="form-style w-full appearance-none"
                                {...register("dateOfBirth", {
                                        required:{
                                            value: true,
                                            message: 'Please enter your Date of Birth'
                                        },
                                        max:{
                                            value: new Date().toISOString().split('T')[0],
                                            message: 'Date of Birth cannot be in the future'
                                        }
                                    }
                                )}

                            />
                            {/* Error handling */}
                            {
                                errors.dateOfBirth && (
                                <p className="-mt-0.5 text-[12px] text-pink-300" >
                                    {errors.dateOfBirth.message}
                                </p>
                                )
                            }
                        </label>

                        <label className="w-full">
                            <p className="label-style  tracking-wider mb-1">
                                Gender <span className='text-pink-100'>*</span>
                            </p>
                            <div className="form-style w-full flex items-center justify-between">     
                                {
                                    ["male", "female", "other"].map((option, index) => {
                                        return(
                                            <label 
                                                key={index}
                                                className="font-medium text-richblack-5 flex items-center gap-x-3
                                                capitalize"
                                            >
                                            <input
                                                defaultChecked={user?.additionalDetails?.gender === `${option}`}
                                                type="radio"
                                                value={option}
                                                className="appearance-none w-5 h-5 border-4 border-pure-greys-400 rounded-full checked:bg-yellow-50 checked:border-yellow-50 focus:outline-none p-2"
                                                {...register("gender", {required:true})}
                                            />
                                            {option}
                                            </label>
                                        )
                                    })
                                }  
                            </div>
                            {/* Error handling */}
                            {
                                errors.gender && (
                                <p className="-mt-0.5 text-[12px] text-pink-300" >
                                    Please select a gender
                                </p>
                                )
                            }
                        </label>
                    </div>

                    {/*------------ Contact number and About ---------------------*/}
                    <div className="flex flex-col lg:flex-row gap-5">
                        <label className="w-full">
                            <p className="label-style tracking-wider mb-1">
                                Phone Number <span className='text-pink-100'>*</span>
                            </p>

                            <div className="flex items-center gap-5">
                                {/* country code */}
                                <select
                                    defaultValue={CountryCode.find(obj => obj?.code === '+91')}
                                    name="countryCode"
                                    className="form-style w-[81px]"
                                    {...register("countryCode", { required: true })}
                                >
                                    {   
                                        CountryCode.map((ele, index) => {
                                            return(
                                                <option key={index} value={ele.code}>
                                                    {ele.code} - {ele.country}
                                                </option>
                                            )
                                        })
                                    }  
                                </select>

                                {/* Number input field */}
                                <input
                                    defaultValue={user?.additionalDetails?.contactNumber}
                                    type="tel"
                                    name="contactNumber"
                                    placeholder="Enter phone number"
                                    className="form-style w-[calc(100%-90px)]"
                                    {...register("contactNumber", {
                                            required: true,
                                            pattern:{
                                                value: /^[0-9]{10}$/,
                                                message:"Please enter valid 10-digit mobile Number.",
                                            }
                                        })
                                    }
                                />

                            </div>
                            {/* Error handling */}
                            {errors.contactNumber && (
                                    <span className="-mt-0.5 text-[12px] text-pink-300">
                                        {errors.contactNumber?.message}
                                    </span>
                                )
                            }
                        </label>

                        <label className="w-full">
                            <p className="label-style tracking-wider mb-1">
                                About <span className='text-pink-100'>*</span>
                            </p>
                            <input
                                defaultValue={user?.additionalDetails?.about}
                                type="text"
                                name="about"
                                placeholder='Enter Bio Detail'
                                className="form-style w-full placeholder:uppercase placeholder:text-sm placeholder:tracking-wider"
                                {...register('about', { required: true })}
                            />
                            {/* Error handling */}
                            {
                                errors.about && (
                                <p className="-mt-0.5 text-[12px] text-pink-300" >
                                    Please enter your Bio Details
                                </p>
                                )
                            }
                        </label>
                    </div>
                </div>
            </div>

            {/* Cancel and Save Btn */}
            <div className="flex justify-end items-center gap-4">
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
                        {loading? "Saving..." : "Save"}
                    </p>
                    {loading && <GrInProgress className="text-lg text-richblack-900 animate-spin"/>}
                </button>
                
            </div>
        </form>
    )
}

export default EditProfile;