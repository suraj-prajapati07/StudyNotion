export function GetAverageRating(ratingArr){
    if(!ratingArr?.length) return 0;
    //find rating sum
    const totalRating = ratingArr?.reduce((acc, currDoc) => {
        //add ..
        acc += currDoc?.rating;
        return acc;
    }, 0);
    //calculate avg
    const multiplier = Math.pow(10, 1);
    const avgRating = Math.round((totalRating / ratingArr?.length) * multiplier) / multiplier;

  return avgRating;
}