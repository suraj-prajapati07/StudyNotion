import React, { useState } from "react";
import {sidebarLinks} from "../../../data/dashboard-links";
import SidebarLinks from "./SidebarLinks";
import { useDispatch, useSelector } from "react-redux";
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from "../../common/ConfirmationModal";
import { logout } from "../../../services/operations/authApi";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {user, loading: profileLoading} = useSelector((state) => state.profile);
    const {loading: authLoading} = useSelector((state) => state.auth);

    const[isModalOpen, setIsModalOpen] = useState(false);
    const[isCollapse, setIsCollapse] = useState(false);

    const modalData = {
        text1: "Are you sure?",
        text2: "You will be logged out of your account",
        btn1Text: "Logout",
        btn2Text: "Cancel",
        btn1Handler: () => dispatch(logout(navigate)),
        btn2Handler: () => setIsModalOpen(false),
    }

    return(
        <div className="bg-richblack-800">
            <div className="relative min-h-[calc(100vh-3.5rem)] w-fit md:min-w-[220px] border-r border-richblack-700 py-10 flex flex-col">
                {/* Links */}
                <div className="flex flex-col gap-2">
                    {
                        sidebarLinks.map((link) => {
                            //when user account type does not match..
                            if(link?.type && link?.type !== user?.accountType){
                                return null
                            }
                            return(<SidebarLinks key={link.id} data={link}/>)
                        })
                    }

                </div>

                {/* Horizontal line */}
                <div className="my-6 mx-auto w-10/12 h-[1px] bg-richblack-700"></div>

                {/* Setting */}
                <div className="">
                    <SidebarLinks
                        data={
                            {   name: "Setting",
                                path: "/dashboard/setting",
                                icon: "VscSettingsGear"
                            }
                        }
                    />
                </div>

                {/* logout btn */}
                <div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-x-2 text-sm text-richblack-300 px-3 md:px-8 py-2"
                    >
                        <VscSignOut className='text-lg' />
                        <span className='hidden md:block tracking-wider uppercase' >Logout</span>
                    </button>
                </div>
            </div>
            
            {/* Confirmation modal */}
            {
                isModalOpen && (
                    <ConfirmationModal modalData={modalData}/>
                )
            }
        </div>
    )
}

export default Sidebar;