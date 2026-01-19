import React, { useEffect, useState } from "react";
import { Link, matchPath } from "react-router-dom";
import Logo from "../../assets/Logo/Logo-Full-Light.png";
import {NavbarLinks} from "../../data/navbar-links";
import {useLocation} from "react-router-dom"
import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "../../utils/constants";
import {AiOutlineShoppingCart} from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import {apiConnector} from "../../services/apiConnector"
import { categories } from "../../services/apis";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";

const Navbar = () => {

    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const {totalItems} = useSelector((state) => state.cart);

    const location = useLocation();
    const matchRoute = (route) => {
        //it return null or current path
        return matchPath({path:route}, location.pathname)
    }

    // const subLinks = [
    //     {
    //         title: "python",
    //         link: "/catalog/python",
    //     },
    //     {
    //         title: "web dev",
    //         link: "/catalog/web-developmet",
    //     }
    // ]

    const[subLinks, setSubLinks] = useState("");

    //Get catalog Data.....
    const fetchSubLinks =  async() =>{
        try{
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            // console.log("Printing subLinks : ",result);
            setSubLinks(result.data.data);

        }
        catch(error){
            console.log("Could not fetch Categories.", error);
        }
    }

    useEffect(() => {
       fetchSubLinks();

    }, []);

    const[isOpen, setIsOpen] = useState(false);

    return(
        <div className="bg-richblack-800 h-14 border-b-[1px] border-b-richblack-700 flex items-center">
            <div className="w-11/12 max-w-maxContent mx-auto flex justify-between items-center text-white">
                {/* Logo */}
                <Link>
                    <img src={Logo} alt="" width={160} height={42} loading="lazy"/>
                </Link>

                {/* Nav links */}
                <nav>
                    <ul className="hidden lg:flex gap-x-6 text-richblack-25">
                        {
                            NavbarLinks.map((ele, index) => {
                                return(
                                    <li 
                                        key={index}
                                        className="uppercase tracking-wider"
                                    >    
                                    {
                                        ele.title === "Catalog"? 
                                        (<div className="relative flex items-center gap-2 group cursor-pointer">
                                            <p>{ele.title}</p>
                                            <BsChevronDown/>

                                            {/* Drop-down sublinks container */}
                                            <div className="z-[100] w-[200px] lg:w-[300px] flex flex-col invisible absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[3em]
                                            rounded-md bg-richblack-5 text-richblack-900 p-4 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em]"
                                            >
                                                <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5">
                                                </div>

                                                {//-->sublinks data (catalog data)...
                                                    subLinks?.length > 0? (
                                                        subLinks.map((subLink, index)=> {
                                                            return(
                                                                <Link
                                                                className="bg-transparent py-4 pl-4 rounded-lg   hover:bg-richblack-50"
                                                                key={index} 
                                                                to={`/catalog/${subLink.name.split(" ")
                                                                    .join('-')
                                                                    .toLowerCase()
                                                                    }`
                                                                }   
                                                                >
                                                                    {subLink.name}
                                                                </Link>
                                                            )
                                                        })
                                                    ) : 
                                                    (
                                                        <p className="text-center capitalize">
                                                            No Courses Found
                                                        </p>
                                                    )
                                                }
                                            </div>
                                            
                                        </div>) :(
                                            <Link 
                                                to={ele?.path}
                                                className={`${matchRoute(ele?.path)? "text-yellow-25" : "text-richblack-25"
                                            }`}
                                        >
                                            {ele.title}
                                        </Link>
                                        )
                                    }
                                    </li>
                                )
                            })
                        }
                    </ul>
                </nav>

                {/* Login / Signup / Dashboard btn*/}
                <div className="flex items-center gap-4">
                    {//-->User Jb student Ho......
                        user && user?.accountType === ACCOUNT_TYPE.STUDENT && (
                            <Link to={"/dashboard/cart"} className="relative">
                                <AiOutlineShoppingCart  className="text-2xl text-richblack-100"/>
                                { totalItems > 0 &&
                                    <span className="absolute -top-3 -right-2 h-6 w-6 grid place-content-center overflow-hidden rounded-full bg-richblack-600 text-sm font-bold text-yellow-100">
                                        <p className="-pr-1">{totalItems}</p>
                                    </span>
                                }
                            </Link>
                        )
                    }

                    {//-->Login btn dikhana hai ya nahi......
                        token === null && (
                            <Link to={"/login"}>
                                <button 
                                    className="hidden lg:block rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 uppercase"
                                >
                                    Log in
                                </button>
                            </Link>
                        )
                    }

                    {//-->Signup btn dikhana hai ya nahi......
                        token === null && (
                            <Link to={"/signup"}>
                                <button 
                                    className="hidden lg:block rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 uppercase"
                                >
                                    Sign up
                                </button>
                            </Link>
                        )
                    }

                    {//-->Dashboard dikhana hai ya nahi.......
                        token !== null && (
                            <ProfileDropDown/>
                        )
                    }

                    {/* ----------------Mobile view ---------------------*/}
                    {/* Hamburger */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className='lg:hidden'
                    >
                        {
                            !isOpen? <GiHamburgerMenu fontSize={20}/> : <ImCross fontSize={20}/>
                        }
                    </button>
                    {isOpen && (
                        <div
                            className='bg-richblack-500 lg:hidden p-2  absolute right-1 
                            top-[3.2rem] z-100 rounded-md'
                        >
                            <ul className="flex flex-col gap-y-6 text-richblack-25">
                                {NavbarLinks.map((ele, index) => {
                                    return(
                                        <li 
                                            key={index}
                                            className="uppercase tracking-wider"
                                        >    
                                            {
                                                ele.title === "Catalog"? 
                                                (<div className="relative flex items-center gap-2 group cursor-pointer">
                                                    <p>{ele.title}</p>
                                                    <BsChevronDown/>

                                                    {/* Drop-down sublinks container */}
                                                    <div className="z-[100] w-[200px] lg:w-[300px] flex flex-col invisible absolute left-[50%] top-[50%] translate-x-[-70%] translate-y-[3em]
                                                    rounded-md bg-richblack-5 text-richblack-900 p-2 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em]"
                                                    >
                                                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5">
                                                        </div>

                                                        {//-->sublinks data (catalog data)...
                                                            subLinks?.length > 0? (
                                                                subLinks.map((subLink, index)=> {
                                                                    return(
                                                                        <Link
                                                                        className="bg-transparent py-4 pl-4 rounded-lg   hover:bg-richblack-50"
                                                                        key={index} 
                                                                        to={`/catalog/${subLink.name.split(" ")
                                                                            .join('-')
                                                                            .toLowerCase()
                                                                            }`
                                                                        }
                                                                        onClick={() => setIsOpen(false)}   
                                                                        >
                                                                            {subLink.name}
                                                                        </Link>
                                                                    )
                                                                })
                                                            ) : 
                                                            (
                                                                <p className="text-center capitalize">
                                                                    No Courses Found
                                                                </p>
                                                            )
                                                        }
                                                    </div>
                                                    
                                                </div>) :(
                                                    <Link 
                                                        to={ele?.path}
                                                        className={`${matchRoute(ele?.path)? "text-yellow-25" : "text-richblack-25"
                                                        }`}
                                                        onClick={() => setIsOpen(false)}
                                                    >
                                                    {ele.title}
                                                </Link>
                                                )
                                            }
                                        </li>
                                    )
                                })}
                                {/* //login and signup btn */}
                                {token === null && (
                                    <Link to={"/login"}>
                                        <button 
                                            className="uppercase tracking-wider"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Log in
                                        </button>
                                    </Link>
                                    )
                                }
                                {token === null && (
                                    <Link to={"/signup"}>
                                        <button 
                                            className="uppercase tracking-wider"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Sign up
                                        </button>
                                    </Link>
                                    )
                                }
                            </ul>
                        </div>)
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar;