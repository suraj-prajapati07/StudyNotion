import React, { useState,useEffect } from "react";
import {
  TiStarFullOutline,
  TiStarHalfOutline,
  TiStarOutline,
} from "react-icons/ti";


const RatingStars = ({avgRating, starSize}) => {
    const [starCount, SetStarCount] = useState({
        full: 0,
        half: 0,
        empty: 0,
    });


    useEffect(() => {
        const wholeStar = Math.floor(avgRating) || 0;
        SetStarCount({
            full: wholeStar,
            half: Number.isInteger(avgRating)? 0 : 1,
            empty: Number.isInteger(avgRating)? 5 - wholeStar : 4 - wholeStar,
        })
    },[avgRating]);

    return(
        <div className="flex gap-1 text-yellow-100">
            {/* Full star */}
           {[...new Array(starCount.full)].map((_, i) => {
                return <TiStarFullOutline key={i} size={starSize || 20} />
           })}
           {/* Half star */}
           {[...new Array(starCount.half)].map((_, i) => {
                return <TiStarHalfOutline key={i} size={starSize || 20}/>
           })}
           {/* Empty star */}
           {/* This is a bit cleaner [best method to create empty array] */}
           {Array.from({length: starCount.empty}, (_, i) => {
                return <TiStarOutline key={i} size={starSize || 20}/>
           })}
        </div>
    )
}
export default RatingStars;