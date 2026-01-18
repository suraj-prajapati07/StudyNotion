import toast from "react-hot-toast";
import { profileSettingEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import { setUser } from "../../slices/profileSlice";
import { logout } from "./authApi";

const {
    UPDATE_DP_API,
    UPDATE_PROFILE_API,
    UPDATE_PASSWORD_API,
    DELETE_ACCOUNT_API
} = profileSettingEndpoints;

//Update DP
export function updateProfilePicture(token, formData){
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiConnector("PUT", UPDATE_DP_API, formData,
                {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                }
            );

            //if backend call get fail.
            if(!response.data.success){
                throw new Error(response.data.message);
            }

            //display success message.
            toast.success("Display Picture Updated Successfully")

            dispatch(setUser(response.data.data));
            //also update user in localstorage.
            localStorage.setItem("user", JSON.stringify(response.data.data));
        }
        catch(error){
            console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error)
            toast.error(error.response.data.message)
        }
        //remove loading toast.
        toast.dismiss(toastId);
        //remove setLoading....

    }
}

//Update profile info
export function updateProfileInfo(token, formData){
    return async(dispatch) => {
        const toastId = toast.loading("Loading...")
        try{
            const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData,
                {
                    Authorization: `Bearer ${token}`,
                }
            )

            //if response get fail......
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            
            toast.success("Your Profile Info Updated Successfully");

            dispatch(setUser(response.data.updatedUserDetails));
            localStorage.setItem("user", JSON.stringify(response.data.updatedUserDetails));
        }
        catch(error){
            console.log("UPDATE_PROFILE_API ERROR---------",error);
            toast.error(error.response.data.message)
        }
        toast.dismiss(toastId);
    }
}

// change password.
export function changePassword (token, formData){
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiConnector("POST", UPDATE_PASSWORD_API, formData,
                {
                    Authorization: `Bearer ${token}`,
                }
            )

            //if response get fail.
            if(!response.data.success){
                throw new Error(response.data.message);
            }

            // success message
            toast.success("Password Changed Successfully");

        }
        catch(error){
            console.log("CHANGE_PASSWORD_API API ERROR............", error)
            toast.error(error.response.data.message)
        }
        toast.dismiss(toastId);
    }
}

//Delete account
export function deleteUserAccount(token, navigate){
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        try {
            console.log("Before Deleting Account");
            const response = await apiConnector("DELETE", DELETE_ACCOUNT_API, null, 
                {
                    Authorization: `Bearer ${token}`,
                }
            )
            console.log("After Deleting Account");
            //if response get fail.
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            toast.success(response.data.message);
            //logout..
            dispatch(logout(navigate));
        }
        catch (error) {
            console.log("DELETE ACCOUNT API ERROR-----------", error);
            toast.error("Could Not Delete Profile");
        }
        toast.dismiss(toastId);
    }
}