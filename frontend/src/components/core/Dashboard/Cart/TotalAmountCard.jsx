import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BuyTheCourse } from "../../../../services/operations/studentFeaturesApi";
import { useNavigate } from "react-router-dom";


const TotalAmountCard = () => {
    const{totalPrice, cart} = useSelector((state) => state.cart);
    const{token} = useSelector((state) => state.auth);
    const{user} = useSelector((state) => state.profile);

    const dispatch = useDispatch();
    const navigate = useNavigate();



    //Course buying handler function
    const courseBuyHandler = () => {
        const courses = cart?.map((course) => course._id);
        if(token){
            BuyTheCourse(token, courses, user, dispatch, navigate);
        }
    }

    return(
        <div className="min-w-[280px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
            <p className="mb-1 text-sm font-medium text-richblack-300">Total:</p>
            <p className="mb-6 text-3xl font-medium text-yellow-100">₹ {totalPrice}</p>
            <button
                onClick={courseBuyHandler}
                className="w-full cursor-pointer rounded-md bg-yellow-50 px-[20px] py-[8px] font-semibold text-richblack-900"
            >
                Buy Now
            </button>
        </div>
    )
}
export default TotalAmountCard;