import React from "react";
import Logo from "../../assets/Logo/Logo-Full-Light.png"
import { Link } from "react-router-dom";
// Icons
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";

import{FooterLink2} from "../../data/footer-links"

const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];

const Footer = () => {
    return (
        <div className="bg-richblack-800">
            {/*-------All over container--- */}
            <div className="relative w-11/12 max-w-maxContent mx-auto  text-richblack-400 leading-6 py-14">
            {/* All links container(devided into 2 section) */}
                <div className="border-b border-richblack-700 w-[100%] flex flex-col lg:flex-row pb-5">
                    {/* section-1 */}
                    <div className="lg:w-[50%] lg:border-r border-richblack-700 flex flex-wrap flex-row justify-between">
                        {/* List--1 */}
                        <div className="w-[30%] flex flex-col gap-3 lg:w-[30%] mb-7 lg:pl-0">
                            <img src={Logo} alt="" className="object-contain" />
                            <h1 className="text-richblack-50 font-semibold text-[16px]">
                                Company
                            </h1>
                            <div className="flex flex-col gap-2">
                                {
                                    ["About", "Careers", "Affiliates"].map((ele, index) => {
                                        return(
                                            <div
                                                key={index}
                                                className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200" 
                                            >
                                                <Link to={ele.toLowerCase()}>
                                                    {ele}
                                                </Link>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            {/* Icons */}
                            <div className="flex gap-3 text-lg">
                                <FaFacebook />
                                <FaGoogle />
                                <FaTwitter />
                                <FaYoutube />
                            </div>
                        </div>
                        {/* List--2 */}
                        <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
                            <h1 className="text-richblack-50 font-semibold text-[16px]">
                                Resources
                            </h1>
                            <div className="flex flex-col gap-2 mt-2">
                                {
                                    Resources.map((ele, index) => {
                                        return(
                                            <div
                                                key={index}
                                                className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200" 
                                            >
                                                <Link to={ele.split(" ").join("-").toLowerCase()}
                                                >
                                                    {ele}
                                                </Link>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <h1 className="text-richblack-50 font-semibold text-[16px] mt-7">
                                Support
                            </h1>
                            <div className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200 mt-2">
                                <Link to={"/help-center"}>Help Center</Link>
                            </div>
                        </div>
                        {/* List--3 */}
                        <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
                            <h1 className="text-richblack-50 font-semibold text-[16px]">
                                Plans
                            </h1>
                            <div className="flex flex-col gap-2 mt-2">
                                {
                                    Plans.map((ele, index) => {
                                        return(
                                            <div
                                                key={index}
                                                className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200" 
                                            >
                                                <Link to={ele.split(" ").join("-").toLowerCase()}
                                                >
                                                    {ele}
                                                </Link>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <h1 className="text-richblack-50 font-semibold text-[16px] mt-7">
                                Community
                            </h1>
                            <div className="flex flex-col gap-2 mt-2">
                                {
                                    Community.map((ele, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                                        >
                                        <Link to={ele.split(" ").join("-").toLowerCase()}>
                                            {ele}
                                        </Link>
                                        </div>
                                    )})
                                }
                            </div>

                        </div>
                    </div>

                    {/* section-2 */}
                    <div className="lg:w-[50%] flex flex-wrap flex-row justify-between lg:pl-5 gap-3">
                        {
                            FooterLink2.map((ele, index) => {
                                return(
                                    <div key={index} className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
                                        <h1 className="text-richblack-50 font-semibold text-[16px]">
                                            {ele.title}
                                        </h1>
                                        <div className="flex flex-col gap-2 mt-2">
                                            {
                                                ele.links?.map((link, index) => {
                                                    return(
                                                        <div 
                                                            key={index}
                                                            className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                                                        >
                                                            <Link to={link.link}>
                                                                {link.title}
                                                            </Link>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>

            </div>

            {/* --------Bottom Fotter---- */}
            <div className="w-11/12 max-w-maxContent text-richblack-400 mx-auto pb-14 text-sm">
                <div className="flex justify-between lg:items-start items-center flex-col lg:flex-row gap-3 w-full">
                    {/* Left-text */}
                    <div className="flex flex-row">
                        {BottomFooter.map((ele, i) => {
                            return (
                                <div
                                    key={i}
                                    className={`px-3 ${
                                            BottomFooter.length - 1 === i? "" : 
                                            "border-r border-richblack-700 cursor-pointer hover:text-richblack-50 transition-all duration-200"
                                        }`
                                    }
                                >
                                <Link to={ele.split(" ").join("-").toLocaleLowerCase()}>
                                    {ele}
                                </Link>
                                </div>
                            );
                        })}
                    </div>
                    {/* Right-text */}
                    <div className="text-center">
                        Made By Suraj Prajapati © 2025 StudyNotion
                    </div>
                </div>
           </div>

        </div>
    )
}

export default Footer;