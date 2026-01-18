import {toast} from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { contactUsEndpoints } from "../apis";

const {CONTACT_US_API} = contactUsEndpoints; 
export function contactUs (data, setLoading){
    const {
        email, 
        firstName, 
        lastName, 
        message, 
        phoneNo, 
        countryCode
    } = data;

    return async() => {
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiConnector("POST", CONTACT_US_API, {
                email, 
                firstName, 
                lastName, 
                message, 
                phoneNo, 
                countryCode
            })

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Reaches Successfully");
            setLoading(true);
        }
        catch(error){
            console.log("CONTACT US API ERROR..........", error);
            toast.error("Failed to reach")
            setLoading(false);
        }
        toast.dismiss(toastId);
    } 
}