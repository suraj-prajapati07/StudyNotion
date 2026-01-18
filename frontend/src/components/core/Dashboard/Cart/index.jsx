import React from "react";
import { useSelector } from "react-redux";
import CartCourses from "./CartCourses";
import TotalAmountCard from "./TotalAmountCard";
import Spinner from "../../../common/Spinner";

const Cart = () => {

    const {isPaymentLoading} = useSelector((state) => state.course);
    const{totalItems} = useSelector((state) => state.cart);

    //when payment is being
    if(isPaymentLoading){
        return (
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                <Spinner/>
            </div>
        )
    }

    return (
        <div>
            <h1 className="text-3xl text-richblack-50 uppercase tracking-wider lg:text-left text-center">
                Your Cart
            </h1>
            <p className='font-semibold text-richblack-400 border-b border-richblack-400 py-2'>
                {totalItems} Courses in Cart
            </p>
            {!totalItems ? (
                    <p className=' text-3xl text-center text-richblack-100 mt-14' >
                        Your cart is empty
                    </p>
                ) : (
                    <div className='flex flex-col-reverse lg:flex-row items-start mt-8 gap-x-10 gap-y-6'>
                        <CartCourses/>
                        <TotalAmountCard/>
                    </div>
                )
            }
        </div>
    )
}

export default Cart;