import toast from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import rzpLogo from "../../assets/Logo/rzp_logo.png"
import { setIsPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";


const RAZORPAY_KEY = "rzp_test_oOFU7XhhW8zTgz";
const {
    COURSE_CAPTURE_PAYMENT_API,
    COURSE_VERIFY_PAYMENT_API,
    PAYMENT_SUCCESS_EMAIL_API,
} = studentEndpoints;
/*
    1. Load script
    2. Create options object for open modal.
*/
// Load the Razorpay SDK from the CDN
function loadScript(src){
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        }
        script.onerror = () => {
            resolve(false);
        }
        document.body.appendChild(script);
    })
}

// Buy the Course
export async function BuyTheCourse(token, courses, user, dispatch, navigate){
    const toastId = toast.loading("Loading...");
    try{
        // Load the script of Razorpay SDK -> to integrate Razorpay checkout(Modal)
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if (!res) {
            toast.error("Razorpay SDK failed to load. Please Check your Internet Connection.");
            return
        }

        // Initiating the Order in Backend
        const orderResponse = await apiConnector("POST",COURSE_CAPTURE_PAYMENT_API, 
            {courses},
            {
                Authorization: `Bearer ${token}`,
            }
        )
        //validate
        if(!orderResponse?.data?.success){
            throw new Error(orderResponse.data.message);
        }

        // console.log("Order Response :",orderResponse);

        // Opening the Razorpay checkout(Modal) for paying money
        const options = {
            key: RAZORPAY_KEY,
            currency: orderResponse.data.data.currency,
            amount: `${orderResponse.data.data.amount}`,
            order_id: orderResponse.data.data.id,
            name: "StudyNotion",
            description: "Thank you for Purchasing the Course.",
            image: rzpLogo,
            prefill:{
                name: `${user.firstName} ${user.lastName}`,
                email: user.email,
            },
            handler: function(response){
                //send payment success Email.
                sendPaymentSuccessEmail(response, orderResponse.data.data.amount, token);

                //verify payment and accordingly enroll student
                verifyPayment({...response, courses}, token, dispatch, navigate);
            }
        }
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function(response){
            toast.error("Oops! Payment Failed.")
            console.log(response.error)
        });

    }
    catch(error){
        console.log("COURSE_CAPTURE_PAYMENT_API ERROR............", error)
        toast.error("Could Not make Payment.")
    }
    toast.dismiss(toastId);
}


//Fun -> payment success mail
const sendPaymentSuccessEmail = async(response, amount, token) => {

    // orderId, paymentId, amount
    try{
        await apiConnector("POST", PAYMENT_SUCCESS_EMAIL_API,
            {
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                amount,
            },
            {
                Authorization: `Bearer ${token}`
            }
        )
    }
    catch(error){
        console.log("PAYMENT_SUCCESS_EMAIL_API ERROR............", error)
    }
}

//Fun -> verify payment
const verifyPayment = async(bodyData, token, dispatch, navigate) => {
    const toastId = toast.loading("Verifying Payment...")
    dispatch(setIsPaymentLoading(true));
    try{
        const response = await apiConnector("POST", COURSE_VERIFY_PAYMENT_API, 
            bodyData,
            {
                Authorization: `Bearer ${token}`
            }
        )
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        toast.success("Payment Successful. You are Added to the course ")
        //reset cartItem
        dispatch(resetCart())
        //go to enrolled courses
        navigate("/dashboard/enrolled-courses");
    }
    catch(error){
        console.log("PAYMENT VERIFY ERROR............", error)
        toast.error("Could Not Verify Payment.")
    }
    toast.dismiss(toastId);
    dispatch(setIsPaymentLoading(false));
}
