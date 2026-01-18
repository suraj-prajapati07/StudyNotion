import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiConnector } from "../services/apiConnector";
import { categories } from "../services/apis";
import { getCatalogPageData } from "../services/operations/catalogApi";
import Error from "./Error";
import Spinner from "../components/common/Spinner";
import CourseSlider from "../components/core/Catalog/CourseSlider";
import Course_Card from "../components/core/Catalog/Course_Card";
import Footer from "../components/common/Footer";

const Catalog = () => {
    const {catalogName} = useParams();
    const[categoryId, setCategoryId] = useState(null);
    const[catalogData, setCatalogData] = useState(null);

    const[loading, setLoading] = useState(false);
    const[active, setActive] = useState(1);

    //fetch categoryId according to category name.
    useEffect(() => {
        const fetchCategories = async() => {
            try{
                const response = await apiConnector("GET", categories.CATEGORIES_API);
                const category_id = response?.data?.data?.filter((ct) => 
                    ct.name.split(' ').join('-').toLowerCase() === catalogName)[0]._id;
                setCategoryId(category_id);
            }
            catch(error){
                console.log("Error occur while fetching categories-----",error);
            }
        }
        //Call
        fetchCategories();
    },[catalogName]);

    //Now find categoryPage details according to categoryId.
    useEffect(() => {
        const fetchCategoryPageDetails = async() => {
            setLoading(true);
            try{
                const response = await getCatalogPageData(categoryId);
                setCatalogData(response);
            }
            catch(error){
                console.log("fetchCategoryPageDetails Error");
            }
            setLoading(false);
        }
        // Call
        if(categoryId){
            fetchCategoryPageDetails();
        }
    },[categoryId]);

    //Set mostPopular and new courses according to selected category courses.
    const[mostPopular, setMostPopular] = useState([]);
    const[newCourse, setNewCourses] = useState([]);
    useEffect(() => {
        if(catalogData?.data?.selectedCategory){
            const result1 = catalogData?.data?.selectedCategory?.courses?.sort((a, b) => 
            a.studentsEnrolled.length < b.studentsEnrolled.length);

            const result2 = catalogData?.data?.selectedCategory?.courses?.sort((a, b) => 
            a.createdAt < b.createdAt);

            setMostPopular(result1);
            setNewCourses(result2);
        }
    },[catalogData]);

    //-----------UI------------------
    if (loading || !catalogData) {
        return (
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                <Spinner/>
            </div>
        )
    }
    if (!loading && !catalogData?.success) {
        return (
            //Error src not found page
            <Error/>
        )
    }

    //Normal page when sb kuch accha hai
    return(
        <>
            {/* -------Hero section---------- */}
            <div className="bg-richblack-800 px-4 box-content">
                <div className="mx-auto min-h-[260px] max-w-maxContentTab lg:max-w-maxContent 
                flex flex-col justify-center gap-4">
                    <p className="text-sm text-richblack-300">
                        {`Home / Catalog / `}
                        <span className="text-yellow-25">
                            {catalogData?.data?.selectedCategory?.name}
                        </span>
                    </p>
                    <p className="text-3xl text-richblack-5">
                        {catalogData?.data?.selectedCategory?.name}
                    </p>
                    <p className="max-w-[870px] text-richblack-200">
                        {catalogData?.data?.selectedCategory?.description}
                    </p>
                </div>
            </div>

            {/* ------------Section-1---------- */}
            <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                <h2 className="text-2xl font-semibold text-richblack-5 lg:text-4xl">
                    Courses to get you started
                </h2>
                <div className="my-4 flex border-b border-b-richblack-600 text-sm">
                    <p
                        onClick={() => setActive(1)}
                        className={`px-4 py-2 cursor-pointer ${active === 1?
                            "border-b border-b-yellow-25 text-yellow-25" : "text-richblack-50"
                        }`}
                    >
                        Most Popular
                    </p>
                    <p
                        onClick={() => setActive(2)}
                        className={`px-4 py-2 cursor-pointer ${active === 2?
                            "border-b border-b-yellow-25 text-yellow-25" : "text-richblack-50"
                        }`}
                    >
                        New
                    </p>
                </div>
                <div>
                    <CourseSlider
                        //send courses according to active=1 & active=2.
                        Courses = {catalogData?.data?.selectedCategory?.courses}
                    />
                </div>
            </div>

            {/* ------------Section-2---------- */}
            <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                <h2 className="text-2xl font-semibold text-richblack-5 lg:text-4xl">
                    Top courses in {catalogData?.data?.differentCategory?.name}
                </h2>
                <div className="py-8">
                    <CourseSlider
                        Courses={catalogData?.data?.differentCategory?.courses}
                    />
                </div>
            </div>

            {/* ------------Section-3---------- */}
            <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                <h2 className="text-2xl font-semibold text-richblack-5 lg:text-4xl">
                    Frequently Bought
                </h2>
                <div className="py-8">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {catalogData?.data?.mostSellingCourses?.slice(0, 4).map((course, i) => (
                           <Course_Card key={i} course={course} height={'h-[400px]'}/>
                        ))}
                    </div>
                </div>
            </div>
            {/* -----------Footer section------------ */}
            <Footer/>
        </>
    )
}

export default Catalog