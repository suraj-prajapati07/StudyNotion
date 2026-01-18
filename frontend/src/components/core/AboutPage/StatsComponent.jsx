import React from "react";

const stats = [
    {count: "5K", label: "Active Students"},
    {count: "10+", label: "Mentors"},
    {count: "200+", label: "Courses"},
    {count: "50+", label: "Awards"}
]

const StatsComponent = () => {
    return(
        <div className="bg-richblack-700 text-richblack-100">
            <div className="w-11/12 max-w-maxContent mx-auto grid grid-cols-2 md:grid-cols-4">
                {
                    stats.map((stat, index) => {
                        return(
                            <div key={index} className="py-10 flex flex-col  items-center">
                                <h1 className="text-[30px] font-bold text-richblack-5">
                                    {stat.count}
                                </h1>
                                <p className="font-semibold text-[16px] text-richblack-500">
                                    {stat.label}
                                </p>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default StatsComponent;