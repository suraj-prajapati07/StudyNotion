import React from "react";

const Tab = ({tabData, accountType, setAccountType}) => {
    return(
        <div className="flex bg-richblack-800 p-1 gap-x-1 my-6 rounded-full max-w-max">
            {
                tabData.map((tab) => {
                    return(
                        <button
                            key={tab.id}
                            onClick={() => setAccountType(tab.type)}
                            className={`py-2 px-5 rounded-full 
                                ${accountType === tab.type? 
                                    "bg-richblack-900 text-richblack-5" : 
                                    "bg-transparent text-richblack-200"
                                } transition-all duration-150 
                            `}

                        >
                            {tab?.name}
                        </button>
                    )
                })
            }
        </div>
    )
}

export default Tab;