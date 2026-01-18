import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetAverageRating } from "../../../utils/GetAverageRating";
import RatingStars from "../../common/RatingStars";

const Course_Card = ({ course, height }) => {
  const [avgRating, setAvgRating] = useState(0);

  useEffect(() => {
    const ans = GetAverageRating(course?.ratingAndReview);
    setAvgRating(ans);
  }, [course]);

  return (
    <div className="rounded-xl bg-richblack-800 p-2 w-full h-full">
      <Link to={`/course/${course._id}`}>
        {/* Thumbnail */}
        <div className=" overflow-hidden">
          <img
            src={course?.thumbnail}
            alt="course thumbnail"
            className={`${height} w-full object-cover`}
          />
        </div>

        {/* Course Info */}
        <div className="flex flex-col gap-2 px-1 py-3">
          <p className="text-xl text-richblack-5">{course?.courseName}</p>
          <p className="text-sm text-richblack-50">
            {course?.instructor?.firstName} {course?.instructor?.lastName}
          </p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <span className="text-yellow-500">{avgRating || 0}</span>
          <RatingStars avgRating={avgRating} />
          <span className="text-richblack-400">
            {course?.ratingAndReview?.length} Ratings
          </span>
        </div>

        {/* Price */}
        <p className="text-xl text-richblack-5">Rs. {course?.price}</p>
      </Link>
    </div>
  );
};

export default Course_Card;
