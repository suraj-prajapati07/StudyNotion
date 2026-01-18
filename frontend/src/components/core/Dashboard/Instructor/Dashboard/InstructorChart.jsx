import React, { useState } from "react";
import {Chart, registerables} from "chart.js";
import {Pie} from "react-chartjs-2";

Chart.register(...registerables);

const InstructorChart = ({coursesData}) => {
    const[currChart, setCurrentChart] = useState("Student");

    const getRandomColors = (n) => {
        let colors =[];
        for(let i=0; i < n; i++){
            const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)},
            ${Math.floor(Math.random() * 256)})`
            //store
            colors.push(color);
        }
        return colors;
    }

    //Create chart data for  students enrolled -> How many students are enrolled in which course
    const studentsEnrolledChartData = {
        labels: coursesData?.map((course) => course?.courseName),
        datasets: [
            {
                data: coursesData?.map((course) => course?.totalEnrolledStudents),
                backgroundColor: getRandomColors(coursesData?.length)
            }
        ]
    }

    //Create chart data for  courses income -> How much income are generated from which course.
    const courseIncomeChartData = {
        labels: coursesData?.map((course) => course?.courseName),
        datasets: [
            {
                data: coursesData?.map((course) => course?.totalGeneratedAmount),
                backgroundColor: getRandomColors(coursesData?.length)
            }
        ]
    }

    const options = {
        maintainAspectRatio: false,
    }

    return(
        <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6">
            <p className="text-lg font-bold text-richblack-5">Visualize</p>
            {/* Btns */}
            <div className="space-x-4 font-semibold">
                <button
                    onClick={() => setCurrentChart("Student")}
                    className={`rounded-sm p-1 px-3 transition-all duration-200 text-sm md:text-lg font-bold ${currChart === "Student" ? "bg-richblack-700 text-yellow-50" : 
                        "text-yellow-400"}`
                    }
                >
                    Student
                </button>
                <button
                    onClick={() => setCurrentChart("Income")}
                    className={`rounded-sm p-1 px-3 transition-all duration-200 text-sm md:text-lg font-bold ${currChart === "Income" ? "bg-richblack-700 text-yellow-50" : 
                        "text-yellow-400"}`
                    }
                >
                    Income
                </button>
            </div>
            {/* Chart */}
            <div className="relative mx-auto aspect-square h-[300px] w-full">
                <Pie
                    data={currChart === "Student" ? studentsEnrolledChartData : courseIncomeChartData}
                    options={options}
                />
            </div>
        </div>
    )
}
export default InstructorChart;