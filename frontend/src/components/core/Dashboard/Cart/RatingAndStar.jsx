import React, { useEffect, useState } from "react";
import { GetAverageRating } from "../../../../utils/GetAverageRating";
import RatingStars from "../../../common/RatingStars";

const RatingAndStar = ({course}) => {

    const[avgRating, setAvgRating] = useState(0);
    useEffect(() => {
        const ans = GetAverageRating(course?.ratingAndReview)
        setAvgRating(ans);
    }, [course])

    return(
        <div className="flex items-center gap-2">
            <span className="text-yellow-500">{avgRating || 0}</span>
            <RatingStars
                avgRating={avgRating}
            />
            <span className="text-richblack-400">
                {course?.ratingAndReview?.length} Ratings
            </span>
        </div>
    )
}
export default RatingAndStar;