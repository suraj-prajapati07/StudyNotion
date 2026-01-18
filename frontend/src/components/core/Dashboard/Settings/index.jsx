import React from "react";
import ChangeProfilePicture from "./ChangeProfilePicture";
import EditProfile from "./EditProfile";
import DeleteAccount from "./DeleteAccount";
import ChangePassword from "./ChangePassword";

export default function Settings() {
    return(
        <div className="bg-richblack-900 text-white mx-0 md:mx-5">
            <h1 className="font-medium text-richblack-5 text-3xl mb-5 uppercase tracking-wider lg:text-left text-center">
                Edit Profile
            </h1>
            {/* Change Profile Picture */}
            <ChangeProfilePicture />

            {/* Edit Profile Information */}
            <EditProfile/>

            {/* Change Password */}
            <ChangePassword/>

            {/* Delete my account */}
            <DeleteAccount/>
        </div>
    )
}