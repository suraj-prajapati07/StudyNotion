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
