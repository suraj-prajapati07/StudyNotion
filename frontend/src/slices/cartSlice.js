import { createSlice } from "@reduxjs/toolkit";
import {toast} from "react-hot-toast";

const initialState = {
    cart: localStorage.getItem("cart")? JSON.parse(localStorage.getItem("cart")) :[],
    totalItems: localStorage.getItem("totalItems")? JSON.parse(localStorage.getItem("totalItems")) : 0,
    totalPrice: localStorage.getItem("totalPrice")? JSON.parse(localStorage.getItem("totalPrice")) : 0,
}

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers:{
        addToCart: (state, action) => {
            const course = action.payload;
            //add in cart if not already present..
            const index = state.cart.findIndex((item) => item._id === course._id);
            if(index >= 0){
                toast.error("Course already in cart");
                return;
            }
            //otherwise add to cart
            state.cart.push(course);
            state.totalItems++;
            state.totalPrice += course.price;

            //also set in localstorage..
            localStorage.setItem("cart", JSON.stringify(state.cart));
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
            localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice));

            //success message
            toast.success("Course added to cart");
        },

        removeFromCart: (state, action) => {
            const courseId = action.payload;
            const index = state.cart.findIndex((item) => item._id === courseId);
            
            if(index >= 0){
                state.totalItems--;
                state.totalPrice -= state.cart[index].price;
                state.cart.splice(index, 1);

                //update also in localstorage..
                localStorage.setItem("cart", JSON.stringify(state.cart))
                localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice))
                localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
                toast.success("Course removed from cart")
            }

        },
        
        resetCart: (state) => {
            state.cart = [];
            state.totalItems = 0;
            state.totalPrice = 0;
            //also reset in localstorage..
            localStorage.removeItem("cart");
            localStorage.removeItem("totalItems");
            localStorage.removeItem("totalPrice");
        }
        
    }
});

export const{addToCart, removeFromCart, resetCart} = cartSlice.actions;
export default cartSlice.reducer;