import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Requirements = ({
    label,
    name,
    setValue,
    register,
    errors
}) => {
    
    const{isEditCourse, course} = useSelector((state) => state.course);
    
    const[requirement, setRequirement] = useState("");
    const[requirementList, setRequirementList] = useState([]);
    
    const handleAddRequirement = () =>{
        if(requirement){
            const newRequirementList = [...requirementList, requirement];
            setRequirementList(newRequirementList);
            //reset input field
            setRequirement("");
        }
    }
    const handleRemoveRequirement = (index) => {
        const updatedRequirementList = requirementList.filter((item, itemIndex) => itemIndex !== index);
        setRequirementList(updatedRequirementList);
    }

    //First render pe he register kr lo..
    useEffect(() => {
        register(name, {
            required:true,
            validate: (value) => value.length > 0
        });

        //Lets course edit ho raha ho tb ka case
        if(isEditCourse){
            //set existing course instructions
            setRequirementList(course?.instructions);
        }
    }, []);

    useEffect(() => {
        setValue(name,requirementList);
    }, [requirementList])



    return(
        <div className="flex flex-col space-y-2">
            <label htmlFor={name} className="text-sm text-richblack-5 uppercase tracking-wider">
                {label} <sup className="text-pink-200">*</sup>
            </label>

            <div className="flex flex-col items-start space-y-2">
                <input
                    id={name}
                    type="text"
                    value={requirement}
                    onChange={(e) => setRequirement(e.target.value)}
                    className="form-style w-full"
                />
                {/* btn */}
                <button
                    type="button"
                    onClick={handleAddRequirement}
                    className="font-semibold text-yellow-50 text-[17px] tracking-wider bg-richblack-600 
                    rounded-md px-2 py-[1px]"
                >
                    Add
                </button>
            </div>
            {/* Display requirement list item */}
            {requirementList?.length > 0 && (
                <ul className="mt-2 list-inside list-disc">
                    {requirementList?.map((item, index) => {
                        return(
                            <li key={index} className="flex items-center text-richblack-5">
                                {item}
                                <button
                                    type="button"
                                    onClick={() => handleRemoveRequirement(index)}
                                    className="ml-2 text-[13px] text-pink-200 underline "
                                >
                                    clear
                                </button>
                            </li>
                        )
                    })}
                </ul>
            )}

            {/* error handling */}
            {errors[name] && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                    {label} is required
                </span>
            )}

        </div>     
    )
}

export default Requirements;