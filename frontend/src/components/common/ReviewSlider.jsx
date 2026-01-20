import React, { useEffect, useState } from "react";
import { getAllRatingReviews } from "../../services/operations/courseApi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import ReactStars from "react-stars"
import {FaStar} from "react-icons/fa";

const ReviewSlider = () => {
    const[reviews, setReviews] = useState([]);
    const truncateWords = 15;
    useEffect(() => {
        const fetchAllRatingReviews = async() => {
            const res = await getAllRatingReviews();
            setReviews(res);
        }
        //call
        fetchAllRatingReviews();
    }, [])

    return(
        <div className="my-[50px] h-[184px] max-w-[100vw] lg:max-w-maxContent p-1 text-white">
            <Swiper
                slidesPerView={reviews?.length < 4? reviews.length % 4 : 4}
                spaceBetween={14}
                freeMode={true}
                loop={true}
                pagination={{clickable: true}}
                modules={[FreeMode, Pagination, Autoplay]}
                autoplay={{
                    delay:2500,
                    disableOnInteraction: false,
                }}
                className="relative w-full "
            >
                {reviews?.map((review, index) => (
                    <SwiperSlide key={index}>
                        <div className="bg-richblack-800 p-2 md:p-4 text-richblack-25 rounded-lg flex flex-col justify-between  h-[250px]">
                            <div className="flex items-center gap-4">
                                <img
                                    src={review?.user?.image ? review?.user?.image : 
                                        `https://api.dicebear.com/9.x/initials/svg?seed=${review?.user?.firstName[0]}${review?.user?.lastName[0]}`}
                                    alt="profile pic"
                                    className="h-12 w-12 rounded-full aspect-square object-cover"
                                />
                                <div className="flex flex-col">
                                    <h1 className="font-semibold text-richblack-5">
                                        {`${review?.user?.firstName} ${review?.user?.lastName}`} 
                                    </h1>
                                    <h2 className="text-[12px] font-medium text-richblack-400">
                                        {review?.course?.courseName}
                                    </h2>
                                </div> 
                            </div>
                            {/* Review */}
                            <p className="text-sm md:text-xl font-medium text-richblack-25">
                                {review?.review?.split(" ").length < truncateWords ? `${review?.review}`
                                    : `${review.review.split(" ").slice(0, truncateWords).join(" ")}...`
                                }
                            </p>
                            {/* Rating */}
                            <div className="flex items-center mt-2 gap-2">
                                <p className="font-semibold text-yellow-400">
                                    {review?.rating.toFixed(1)}
                                </p>
                                <ReactStars
                                    count={5}
                                    size={20}
                                    value={review?.rating}
                                    activeColor="#ffd700"
                                    edit={false}
                                    emptyIcon={<FaStar />}
                                    fullIcon={<FaStar />}
                                />
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default ReviewSlider;
/*
import React from "react";
import Course_Card from "./Course_Card";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const CourseSlider = ({ Courses }) => {
  return (
    <>
      {Courses?.length > 0 ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={25}
          freeMode={true}
          pagination={{ clickable: true }}
          loop={true}
          modules={[FreeMode, Pagination, Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            
          }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="max-h-[30rem]"
        >
          {Courses.map((course, i) => (
            <SwiperSlide key={i}>
              <Course_Card course={course} height="h-[250px]" />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-xl text-richblack-50">No Courses Found</p>
      )}
    </>
  );
};

export default CourseSlider;

*/
