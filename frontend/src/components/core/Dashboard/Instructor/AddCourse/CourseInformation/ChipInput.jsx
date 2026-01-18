import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md"
import { useSelector } from "react-redux";

const ChipInput = ({
    label,
    name, // [courseTags -> array of string]
    placeholder,
    register,
    setValue,
    errors
}) => {

    const {isEditCourse, course} = useSelector((state) => state.course);
    const [chips, setChips] = useState([]);

    function handleDeleteChip(index) {
        const newChips = chips.filter((chip,chipIndex) => index !== chipIndex);
        setChips(newChips);
    }

    function keyDownHandler(event){
        //check -> enter/comma btn press or not..
        if(event.key === "Enter" || event.key === ","){
            event.preventDefault();
            const chipValue = event.target.value;
            if(chipValue && !chips.includes(chipValue)){
                //set new chip value in chips array
                const newChips = [...chips, chipValue];
                setChips(newChips);
                //reset input field
                event.target.value = "";
            }
        }
    }

    //first render -> pe he register kr lo
    useEffect(() => {
        register(name, {
            required: true,
            validate: (value) => value.length > 0
        });

        //Lets course edit ho raha ho tb ka case
        if(isEditCourse){
            //set existing course tag
            setChips(course.tag);
        }
    }, [])

    //re-render and update the courseTags[]  in form data when chips[]  is updated..
    useEffect(() => {
        setValue(name, chips);
    }, [chips]);

    return(
        <div className="flex flex-col space-y-2">
            <label htmlFor={name} className="text-sm text-richblack-5 uppercase tracking-wider">
                {label} <sup className="text-pink-200">*</sup>
            </label>
            {/* Render the chips and input */}
            <div className="w-full flex flex-wrap gap-y-2">
                {/* Chips */}
                {
                    chips?.map((chip, index) => {
                        return(
                            <div
                                key={index}
                                className="m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5 font-medium"
                            >
                                {chip}
                                {/* btn -> delete the chip*/}
                                <button
                                    onClick={() => handleDeleteChip(index)}
                                    className="ml-2 focus:outline-none"
                                >
                                    <MdClose className="text-sm" />
                                </button>
                            </div>
                        )
                    })
                }
                {/* Input field */}
                <input
                    type="text"
                    id={name}
                    name={name}
                    placeholder={placeholder}
                    onKeyDown={keyDownHandler}
                    className="form-style w-full placeholder:uppercase placeholder:tracking-wider placeholder:text-sm"
                />
            </div>
            {errors[name] && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
                {label} is required
            </span>
            )}
        </div>
    )
}

export default ChipInput;