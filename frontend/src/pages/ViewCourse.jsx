import React, { useEffect, useState } from "react";
import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar";
import { Outlet, useParams } from "react-router-dom";
import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal";
import { getAuthenticatedFullCourseDetails } from "../services/operations/courseApi";
import { useDispatch, useSelector } from "react-redux";
import { setCompletedLecture, setCourseData, setCourseSectionData, setTotalNoOfLecture } from "../slices/viewCouresSlice";
import Spinner from "../components/common/Spinner";

const ViewCourse = () => {
    const[reviewModal, setReviewModal] = useState(false);
    const[loading, setLoading] = useState(false);

    const{token} = useSelector((state) => state.auth);
    const {courseId} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        //Get Authenticated full course details.
        const fetchFullCourseDetails = async() => {
            setLoading(true);
            try{
                const res = await getAuthenticatedFullCourseDetails(courseId, token);
                // res = {courseDetails, totalDuration, completedVideos, totalNoOfLecture}
                dispatch(setCourseData(res?.courseDetails));
                dispatch(setCourseSectionData(res?.courseDetails?.courseContent))
                dispatch(setCompletedLecture(res?.completedVideos));
                dispatch(setTotalNoOfLecture(res?.totalNoOfLecture));
            }
            catch(error){
                console.log("Could not fetch Authenticated CourseDetails",error);
            }
            setLoading(false);
        }
        //Call
        fetchFullCourseDetails();
    },[])


    return(
        <> 
            {loading ? (
                    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                        <Spinner/>
                    </div>
                ) : (
                    <div className="relative flex min-h-[calc(100vh-3.5rem)]">
                        <VideoDetailsSidebar setReviewModal={setReviewModal}/>
                        <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
                            <div className="mx-6">
                                <Outlet/>
                            </div>
                        </div>
                    </div>
                )
            }
            
            {/* Review Modal */}
            {reviewModal && <CourseReviewModal setReviewModal={setReviewModal}/>}
        </>
    )
}
export default ViewCourse;