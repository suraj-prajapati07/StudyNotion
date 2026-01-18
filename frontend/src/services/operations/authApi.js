import { toast } from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { authEndpoints } from "../apis"
import { setLoading, setToken } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";


const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSWORDTOKEN_API,
    RESETPASSWORD_API,
} = authEndpoints;


//calling frontend to backend for sending otp..
export function sendOtp(email, navigate){
    console.log("Enter in sendOTP function");
    
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true))
        try{
            const response = await apiConnector("POST", SENDOTP_API, {email});
            console.log("Otp response : ",response);

            //if response fail
            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("OTP Sent Successfully")

            //navigate to verify email page....
            navigate('/verify-email');
        }
        catch (error) {
            console.log("SENDOTP API ERROR............", error)
            toast.error("Could Not Send OTP")
        }
        //remove spinner
        dispatch(setLoading(false))
        //remove toast (Loading...) 
        toast.dismiss(toastId);
    }
}

//sending mail  -> containing link for password reset...
export function getPasswordResetToken(email, setEmailSent){
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try{
            const response = await apiConnector("POST", RESETPASSWORDTOKEN_API, {
                email,
            })


            //validate -> if response get fail..
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            //
            toast.success("Reset email sent");

            setEmailSent(true);

                
        }
        catch(error){
            console.log("RESETPASSTOKEN ERROR............", error)
            toast.error("Failed To Send Reset Email")
        }

        //remove spinner
        dispatch(setLoading(false))
        //remove toast (Loading...) 
        toast.dismiss(toastId);
    }
}

//reset password.......
export function resetPassword(password, confirmPassword, token, setResetCompleted, setEmail){
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));

        try{
            const response = await apiConnector("POST", RESETPASSWORD_API, {
                password,
                confirmPassword,
                token,
            })

            //if response get fail..
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            toast.success("Password Reset Successfully");

            //set reset completed.....
            setResetCompleted(true);
            //set email..
            setEmail(response.data.email);
        }
        catch(error){
            console.log("RESETPASSWORD ERROR............", error)
            toast.error("Failed To Reset Password")
        }
        //remove spinner
        dispatch(setLoading(false))
        //remove toast (Loading...) 
        toast.dismiss(toastId);
    }
}

//signup ..
export function signUp(signupData, otp, navigate){
    const {
        accountType, 
        firstName, 
        lastName, 
        email, 
        password, 
        confirmPassword
    } = signupData;

    return async(dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true));

        try{
            const response = await apiConnector("POST", SIGNUP_API, {
                accountType, 
                firstName, 
                lastName, 
                email, 
                password, 
                confirmPassword,
                otp
            });

            //if response get fail..
            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Signup Successfull");
            //navigate to login page......
            navigate("/login");
        }
        catch(error){
            console.log("SIGNUP API ERROR............", error)
            toast.error("Sign Up Failed")
            navigate("/signup")
        }
        //remove spinner
        dispatch(setLoading(false))
        //remove toast (Loading...) 
        toast.dismiss(toastId);
    }
}

//Login....
export function login(email, password, navigate){
    return async(dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true));

        try{
            const response = await apiConnector("POST", LOGIN_API, {
                email,
                password
            });

            //if response get fail.......
            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Login Successfull");

            //store token and user.....
            dispatch(setToken(response.data.token));
            const userImage = response.data?.user?.image? response.data.user.image : 
            `https://api.dicebear.com/9.x/initials/svg?seed=${response.data.user.firstName[0]}${response.data.user.lastName[0]}`;

            dispatch(setUser({ ...response.data.user, image: userImage }));

            //also store in local storage.....
            localStorage.setItem("token", JSON.stringify(response.data.token));
            localStorage.setItem("user", JSON.stringify(response.data.user));
            
            //navigate to dashboard......
            navigate("/dashboard/my-profile")
        }
        catch(error){
            console.log("LOGIN API ERROR.......", error);
            toast.error("Login Failed");
        }

        //remove spinner
        dispatch(setLoading(false))
        //remove toast (Loading...) 
        toast.dismiss(toastId);
    }
}

//Logout......
export function logout(navigate){
    return async(dispatch) => {
        dispatch(setToken(null));
        dispatch(setUser(null));
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        toast.success("Logout Successfull");
        //navigate to home page..
        navigate("/");
    }
}