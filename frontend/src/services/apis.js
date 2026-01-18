// const BASE_URL = "http://localhost:4000/api/v1";
const BASE_URL = "https://studynotion-aexu.onrender.com"

// CATAGORIES API
export const categories = {
  CATEGORIES_API: BASE_URL + "/course/showAllCategories",
  CATALOG_PAGE_DATA_API: BASE_URL + "/course/getCategoryPageDetails"
}

//AUTH API
export const authEndpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSWORDTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API : BASE_URL + "/auth/reset-password"
}

//CONTACT US API
export const contactUsEndpoints = {
  CONTACT_US_API : BASE_URL + "/reach/contact"
}

//PROFILE SETTING API
export const profileSettingEndpoints = {
  UPDATE_DP_API: BASE_URL + "/profile/updateDisplayPicture",
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
  UPDATE_PASSWORD_API: BASE_URL + "/auth/changepassword",
  DELETE_ACCOUNT_API: BASE_URL + "/profile/deleteProfile"
}

//PROFILE API
export const profileEndpoints = {
  GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",
  GET_INSTRUCTOR_STATISTICS_DATA_API: BASE_URL + "/profile/instructorDashboard"
}

// COURSE API
export const courseEndpoints = {
  COURSE_CATEGORIES_API: BASE_URL + "/course/showAllCategories",
  CREATE_COURSE_API: BASE_URL + "/course/createCourse",
  EDIT_COURSE_API: BASE_URL + "/course/editCourse",
  CREATE_SECTION_API: BASE_URL + "/course/addSection",
  UPDATE_SECTION_API: BASE_URL + "/course/updateSection",
  DELETE_SECTION_API: BASE_URL + "/course/deleteSection",
  CREATE_SUBSECTION_API: BASE_URL + "/course/addSubSection",
  UPDATE_SUBSECTION_API: BASE_URL + "/course/updateSubSection",
  DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubSection",
  GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/course/getInstructorCourses",
  DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",
  GET_COURSE_DETAILS_API: BASE_URL + "/course/getCourseDetails",
  GET_AUTHENTICATED_FULL_COURSE_DETAILS_API: BASE_URL + "/course/getFullCourseDetails",
  UPDATE_COURSE_PROGRESS_API: BASE_URL + "/course/updateCourseProgress",
}

//RATING AND REVIEW API
export const ratingAndReviewEndpoints = {
  CREATE_RATING_REVIEW_API: BASE_URL + "/course/createRating",
  GET_ALL_RATING_REVIEW_API: BASE_URL + "/course/getReviews",
}

//STUDENT FEATURES | PAYMENTS API
export const studentEndpoints = {
  COURSE_CAPTURE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
  COURSE_VERIFY_PAYMENT_API: BASE_URL + "/payment/verifyPayment",
  PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",
}