import React from "react";
const IconButton = ({...btnData}) => {
    //destructure btn data.....
    const {text, children=null, onClickHandler, customClasses, outline=false, disabled=false, type}  = btnData;

    return(
        <div className="text-white">
            <button
                onClick={onClickHandler}
                type={type}
                disabled={disabled}
                className={`${customClasses} rounded-md py-1 px-2 font-semibold text-richblack-900 uppercase tracking-wider ${outline? "border border-yellow-50 bg-transparent" : "bg-yellow-50"}
                ${disabled? "cursor-not-allowed" : "cursor-pointer"}`}
            >
                {
                    !children? (
                        <p>{text}</p>
                    ) : 
                    (
                        <div className={`flex items-center gap-x-2 ${outline && "text-yellow-50"}`}>
                            {text}
                            {children}
                        </div>
                    )
                }
            </button>
        </div>
    )
}

export default IconButton;