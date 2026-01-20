import React, { useEffect, useState } from "react";
import {useForm} from "react-hook-form"
import CountryCode from "../../../data/countrycode.json";
import { useDispatch } from "react-redux";
import { contactUs } from "../../../services/operations/contactApi";

const ContactUsForm = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const {
        register, 
        handleSubmit,
        reset,
        formState: {errors, isSubmitSuccessful}

    } = useForm();

    async function submitContactForm(data){
        // console.log(data);
        //API call for contact....
        dispatch(contactUs(data, setLoading));

    }

    useEffect(() => {
      if(isSubmitSuccessful){
        reset({
            firstName: "",
            lastName: "",
            email: "",
            phoneNo: "",
            message: "",
        })
      }
    
      
    }, [reset, isSubmitSuccessful]);
    

    return (
        <form 
            onSubmit={handleSubmit(submitContactForm)}
            className="relative flex flex-col gap-7"
        >
            {/* ------Name------- */}
            <div className="flex flex-col md:flex-row gap-6">
                {/* First name */}
                <div className="lg:w-[48%] flex flex-col gap-2">
                    <label htmlFor="firstName" className="lable-style">
                        First Name
                    </label>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="Enter first name"
                        id="firstName"
                        className="form-style"
                        {...register("firstName", {required:true})}
                    />
                    {/* Error handling */}
                    {errors.firstName && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                Please enter your name
                            </span>
                        )
                    }
                </div>
                {/* Last name */}
                <div className="lg:w-[48%] flex flex-col gap-2">
                    <label htmlFor="lastName" className="lable-style">
                        Last Name
                    </label>
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Enter last name"
                        id="lastName"
                        className="form-style"
                        {...register("lastName")}
                    />
                </div>
                
            </div>

            {/* -------Email------- */}
            <div className="flex flex-col gap-2">
                <label htmlFor="email" className="lable-style">
                    Email Address
                </label>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter email address"
                    id="email"
                    className="form-style"
                    {...register("email", {required:true})}
                />
                {/* Error handling */}
                {errors.email && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                            Please enter your email
                        </span>
                    )
                }
            </div>

            {/* ------Phone no--------- */}
            <div className="flex flex-col gap-2 ">
                <label htmlFor="phoneNo" className="lable-style">
                    Phone Number
                </label>
                <div className="flex items-center gap-5">
                    {/* country code */}
                    <select
                        defaultValue={'+91'}
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
                        type="tel"
                        name="phoneNo"
                        id="phoneNo"
                        placeholder="Enter phone number"
                        className="form-style w-[calc(100%-90px)]"
                        {...register("phoneNo", {
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
                {errors.phoneNo && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                            {errors.phoneNo.message}
                        </span>
                    )
                }

            </div>

            {/* ---------Message------------ */}
            <div className="flex flex-col gap-2 ">
                <label htmlFor="message" className="lable-style">
                    Message
                </label>
                <textarea
                    id="message"
                    name="message"
                    cols={30}
                    rows={7}
                    placeholder="Enter your message here"
                    className="form-style"
                    {...register("message",{required: true})}
                />
                {/* Error handling */}
                {errors.message && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                            Please enter your message
                        </span>
                    )
                }
            </div>
            {/* ----------Submit btn------ */}
            <button
                disabled = {loading}
                type="submit"
                className={`rounded-md bg-yellow-50 px-6 py-3 text-center  font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)]
                    ${loading && 
                        "transition-all duration-200 hover:scale-95 hover:shadow-none disabled:bg-richblack-500"
                    }
                `}
            >
                Send Message
            </button>

        </form>
    )
}

export default ContactUsForm;