import React, { useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "../components/common/Spinner";
import Sidebar from "../components/core/Dashboard/Sidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {

    // const[isCollapse, setIsCollapse] = useState(false);

    const {loading :authLoading} = useSelector((state) => state.auth);
    const {loading :profileLoading} = useSelector((state) => state.profile);

    if(authLoading || profileLoading){
        return(
            <div className="mx-auto min-h-[calc(100%-3.5rem)] grid place-items-center">
                <Spinner/>
            </div>
        )
    }

    return(
        <div className="relative flex min-h-[calc(100vh-3.5rem)]">
            <div className="fixed left-0">
                <Sidebar/>               
            </div>

            <div className="ml-11 md:ml-60 min-h-[calc(100vh-3.5rem) flex-1 overflow-auto" >
                <div className="mx-auto w-11/12  py-10  max-w-[1000px]">
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;