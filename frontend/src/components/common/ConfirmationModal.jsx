import React from "react";

const ConfirmationModal = ({modalData}) => {
    return(
        <div className={`!mt-0 fixed grid place-items-center inset-0 z-[1000] bg-white bg-opacity-10 backdrop-blur-sm overflow-auto `}>
            <div className="w-11/12 max-w-[350px] p-6 bg-richblack-800 border border-richblack-400 rounded-lg">
                <p className="text-2xl font-semibold text-richblack-5">
                    {modalData.text1}
                </p>
                <p className="mt-3 mb-5 leading-6 text-richblack-200">
                    {modalData.text2}
                </p>

                {/* btn */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={modalData.btn1Handler}
                        className="cursor-pointer rounded-md bg-yellow-200 py-[8px] px-[20px] font-semibold text-richblack-900"
                    >
                        {modalData.btn1Text}
                    </button>

                    <button
                        onClick={modalData.btn2Handler}
                        className="cursor-pointer rounded-md bg-richblack-200 py-[8px] px-[20px] font-semibold text-richblack-900"
                    >
                        {modalData.btn2Text}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationModal;