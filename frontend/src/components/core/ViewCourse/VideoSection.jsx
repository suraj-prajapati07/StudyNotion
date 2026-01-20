import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BigPlayButton, ControlBar, CurrentTimeDisplay, ForwardControl, LoadingSpinner, PlaybackRateMenuButton, Player, ReplayControl, TimeDivider } from "video-react";
import "video-react/dist/video-react.css"
import { BiSkipNextCircle, BiSkipPreviousCircle } from "react-icons/bi"
import {MdOutlineReplayCircleFilled} from "react-icons/md";
import { markLectureCompleted } from "../../../services/operations/courseApi";
import { updateCompletedLecture } from "../../../slices/viewCouresSlice";

const VideoSection = () => {

    const playerRef = useRef(null);
    const{courseId, sectionId, subSectionId} = useParams();
    const{
        courseData, 
        courseSectionData, 
        completedLecture
    } = useSelector((state) => state.viewCourse);
    const{token} = useSelector((state) => state.auth);

    const[loading, setLoading] = useState(false);
    const[videoData, setVideoData] = useState(null);
    const[isVideoEnded, setIsVideoEnded] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    //set video src on every render
    useEffect(() => {
        const setVideoDetails = () => {
            if(!courseSectionData) return;
            if(!courseId && !sectionId && !subSectionId){
                navigate("/dashboard/enrolled-courses");
            }
            else{
                const filteredSectionData = courseSectionData?.find(
                    (section) => section._id === sectionId
                );
                const filteredSubSectionData = filteredSectionData?.subSection?.find(
                    (subSec) => subSec._id === subSectionId
                );
                setVideoData(filteredSubSectionData);
                setIsVideoEnded(false);
            }
        }
        //call
        setVideoDetails();
    }, [courseData, courseSectionData, location.pathname])

    //Fun -> check first lecture of course
    const isFirstLecture = () => {
        const currentSectionIndex = courseSectionData?.findIndex(
            (section) => section._id === sectionId
        );
        const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection?.findIndex(
            (subsec) => subsec._id === subSectionId
        );
        //return result by verifying condition......
        if(currentSectionIndex === 0 && currentSubSectionIndex === 0){
            return true;
        }
        else{
            return false;
        }
    }

    //Fun -> check last lecture of course
    const isLastLecture = () => {
        const currentSectionIndex = courseSectionData?.findIndex(
            (section) => section._id === sectionId
        );
        const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection?.findIndex(
            (subsec) => subsec._id === subSectionId
        );
        //return result by verifying condition......
        if(currentSectionIndex === courseSectionData?.length-1  && 
            currentSubSectionIndex === courseSectionData?.[currentSectionIndex]?.subSection?.length-1
        ){
            return true;
        }
        else{
            return false;
        }
    }

    //Fun -> Go to next video.
    const goToNextVideo = () => {
        const currentSectionIndex = courseSectionData?.findIndex(
            (section) => section._id === sectionId
        );
        const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection?.findIndex(
            (subsec) => subsec._id === subSectionId
        );

        //case-1: when last lecture of a section.
        //case-2: normal.
        const CurrentSubSectionLength = courseSectionData?.[currentSectionIndex]?.subSection?.length;
        if(currentSubSectionIndex === CurrentSubSectionLength - 1){
            //Go to next section of first lecture/subsection.
            const nextSectionId = courseSectionData?.[currentSectionIndex + 1]?._id;
            const nextFirstSubSectionId = courseSectionData?.[currentSectionIndex + 1]?.subSection?.[0]?._id;

            navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextFirstSubSectionId}`)
        }
        else{
            //noraml -> go to next lecture/subsection
            const nextSubSectionId = courseSectionData?.[currentSectionIndex]?.subSection?.[currentSubSectionIndex + 1]?._id;

            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`)
        }
    }

    //Fun -> Go to previous video.
    const goToPreviousVideo = () => {
        const currentSectionIndex = courseSectionData?.findIndex(
            (section) => section._id === sectionId
        );
        const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection?.findIndex(
            (subsec) => subsec._id === subSectionId
        );

        //case-1: when first lecture of a section.
        //case-2: normal.

        if(currentSubSectionIndex === 0){
            //Go to prev section of last lecture/subsection
            const prevSectionId = courseSectionData?.[currentSectionIndex - 1]?._id;

            const prevSubSectionLength = courseSectionData?.[currentSectionIndex - 1]?.subSection?.length;
            const prevlastSubSectionId = courseSectionData?.[currentSectionIndex - 1]?.subSection?.[prevSubSectionLength - 1]?._id;

            navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevlastSubSectionId}`)
        }
        else{
            //noraml -> go to prev lecture/subsection
            const prevSubSectionId = courseSectionData?.[currentSectionIndex]?.subSection?.[currentSubSectionIndex - 1]?._id;

            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`)
        }
    }

    //Fun -> Mark lecture complete.
    const lectureCompletedHandler = async() => {
        //Update course progress.
        setLoading(true);
        try{
            const res = markLectureCompleted({courseId, subSectionId}, token);
            if(res){
                //update state also
                dispatch(updateCompletedLecture(subSectionId));
            }
        }
        catch(error){
            console.log("Could not mark Lecture as completed");
        }
        setLoading(false);
    }

    //Fun -> Rewatch video
    const rewatchVideoHandler = () => {
        playerRef.current.seek(0);
        playerRef.current.play();
        setIsVideoEnded(false);
    }

    return(
        <div className='md:w-[calc(100vw-320px)] w-screen p-3'>
            {!videoData ? (
                <p className="text-richblack-5">
                    Video Not Found
                </p>
                ) : (
                <Player
                    ref={playerRef}
                    src={videoData?.videoUrl}
                    aspectRatio="16:9"
                    autoPlay={false}
                    onEnded={() => setIsVideoEnded(true)}
                    fluid={true} //-> make <Player> responsive
                >
                    <BigPlayButton position="center"/>
                    <LoadingSpinner/>
                    {/* control bar */}
                    <ControlBar>
                        {/* playback speed options -> 1x, 1.5x ... */}
                        <PlaybackRateMenuButton rates={[2, 1.5, 1.25, 1, 0.5, 0.1]} order={7.1} />
                        {/* Go backword -> 5/10/30sec */}
                        <ReplayControl seconds={10} order={7.1}/>
                        {/* Go forward -> 5/10/30sec */}
                        <ForwardControl seconds={10} order={7.2}/>
                        {/* colon sheparator(/) between current time and total duration */}
                        <TimeDivider order={4.2}/>
                        {/* Current playback time */}
                        <CurrentTimeDisplay order={4.1}/>
                    </ControlBar>

                    {/* Btns */}
                    {isVideoEnded && (
                        <div className="flex justify-center items-center">
                            {/* Mark as Completed btn*/}
                            {!completedLecture?.includes(videoData?._id) && (
                                <button
                                    onClick={lectureCompletedHandler}
                                    className='bg-yellow-50 text-sm text-richblack-700 absolute top-2 hover:scale-90 z-20 font-medium md:text-[18px] px-4 py-2 rounded-full transition-transform duration-300'
                                >
                                    Mark as Completed
                                </button>
                            )}
                            
                            {/* GoToPrevious video btn  */}
                            {!isFirstLecture() && (
                                <div className='z-20 left-0 top-1/2 transform -translate-y-1/2 absolute m-5'>
                                    <BiSkipPreviousCircle
                                        onClick={goToPreviousVideo}
                                        className="text-2xl md:text-5xl bg-richblack-600 rounded-full cursor-pointer hover:scale-90"
                                    />   
                                </div>
                            )}

                            {/* GoToNext video btn  */}
                            {!isLastLecture() && (
                                <div className='z-20 right-4 top-1/2 transform -translate-y-1/2 absolute m-5'>
                                    <BiSkipNextCircle
                                        onClick={goToNextVideo}
                                        className=" text-2xl md:text-5xl bg-richblack-600 rounded-full cursor-pointer hover:scale-90"
                                    />
                                </div>
                            )}

                            {/* Rewatch btn*/}
                            {
                                <MdOutlineReplayCircleFilled
                                    onClick={rewatchVideoHandler}
                                    className="text-2xl md:text-5xl bg-richblack-600 rounded-full cursor-pointer hover:scale-90 absolute top-1/2 z-20"
                                />
                            }
                        </div>
                    )}
                    
                </Player>
            )}

            {/* video title and desc */}
            <div className='mt-5'>
                <h1 className='text-xl md:text-2xl font-bold text-richblack-25'>{videoData?.title}</h1>
                <p className='text-gray-500 text-richblack-100'>{videoData?.description}</p>
            </div>
        </div>
    )
}
export default VideoSection;