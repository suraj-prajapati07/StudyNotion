import React from "react";
import { useDispatch, useSelector } from "react-redux";
import RatingAndStar from "./RatingAndStar";
import {RiDeleteBin6Line} from "react-icons/ri";
import { removeFromCart } from "../../../../slices/cartSlice";

const CartCourses = () => {

    const {cart} = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    return(
        <div className="flex flex-1 flex-col">
            {cart?.map((course, i) => (
                <div
                    key={course._id}
                    className={`flex w-full flex-wrap items-start justify-between gap-6
                    ${i !== cart.length-1 && "border-b border-b-richblack-400 pb-6"}
                    ${i !== 0 && "mt-6"}`}
                >
                    {/* Left part -> thumbnail & description */}
                    <div className="flex flex-1 flex-col gap-4 xl:flex-row">
                        <img
                            src={course?.thumbnail}
                            alt={course?.courseName}
                            className="h-[148px] w-[220px] rounded-lg object-cover"
                        />
                        <div className="flex flex-col space-y-1">
                            <p className="text-lg font-medium text-richblack-5">
                                {course?.courseName}
                            </p>
                            <p className="text-sm text-richblack-300">
                                {course?.category?.name}
                            </p>
                            <RatingAndStar
                                course={course}
                            />
                        </div>
                    </div>

                    {/* Right part -> remove btn & price */}
                    <div className="flex flex-col items-end space-y-2">
                        <button
                            onClick={() => dispatch(removeFromCart(course._id))}
                            className="flex items-center gap-x-1 rounded-md border border-richblack-600 bg-richblack-700 py-3 px-[12px] text-pink-200"
                        >
                            <RiDeleteBin6Line/>
                            <span>Remove</span>
                        </button>
                        <p className="mb-6 text-3xl font-medium text-yellow-100">
                            ₹ {course?.price}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default CartCourses;