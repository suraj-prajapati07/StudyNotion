import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineCaretDown } from "react-icons/ai"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { logout } from "../../../services/operations/authApi";

const ProfileDropDown = ()  => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {user} = useSelector((state) => state.profile);
    const [open, setOpen] = useState(false);

    return(
        <button
            onClick={()=> setOpen((prev) => !prev)}
            className="relative"
        >
            <div className="flex gap-x-1 items-center">
                <img
                    src={user?.image}
                    alt="profileImage"
                    className="w-[30px] rounded-full aspect-square object-cover"
                />
                <AiOutlineCaretDown className="text-sm text-richblack-100" />
            </div>

            {/* Dashboard and logout btn -> dropdown menu*/}
            { open && (
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="absolute top-[118%] right-0 z-[1000] rounded-md border-[1px] border-richblack-700 bg-richblack-800"
                    >
                        {/* Dashboard Link */}
                        <Link
                            to={"/dashboard/my-profile"}
                            onClick={() => setOpen(false)}
                        >
                            <div className="w-full flex items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
                                <VscDashboard className="text-lg"/>
                                <p>Dashboard</p>
                            </div>
                        </Link>

                        {/* logout btn */}
                        <div
                            onClick={() =>{
                                dispatch(logout(navigate));
                                setOpen(false);
                            }}
                            className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
                        >
                            <VscSignOut className="text-lg"/>
                            <p>Logout</p>
                        </div>

                    </div>
                )
            }
        </button>
    )
}

export default ProfileDropDown;