import React from "react";
import "./App.css"
import { Route, Routes } from "react-router-dom";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import About from "./pages/About";
import Contact from "./pages/Contact";
import OpenRoute from "./components/core/Auth/OpenRoute";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Settings from "./components/core/Dashboard/Settings";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart";
import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "./utils/constants";
import AddCourse from "./components/core/Dashboard/Instructor/AddCourse";
import MyCourses from "./components/core/Dashboard/Instructor/MyCourse";
import EditCourse from "./components/core/Dashboard/Instructor/EditCourse";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import ViewCourse from "./pages/ViewCourse";
import VideoSection from "./components/core/ViewCourse/VideoSection";
import DashboardInfo from "./components/core/Dashboard/Instructor/Dashboard/DashboardInfo";

function App() {
  const {user} = useSelector((state) => state.profile);
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
        <div className="fixed w-full z-50">
          <Navbar/>
        </div>

        <div className="relative mt-14 z-40">
            <Routes>
              <Route path="/" element = {<Home/>} />
              <Route path="/about" element={<About/>} />
              <Route path="/contact" element={<Contact/>} />
              <Route path="/catalog/:catalogName" element={<Catalog/>}/>
              <Route path="/course/:courseId" element={<CourseDetails/>}/>

              {/* Login page */}
              <Route 
                path="/login" 
                element = {
                  <OpenRoute>
                    <Login/>
                  </OpenRoute>
                }
              />

              {/* Signup page */}
              <Route 
                path="/signup" 
                element = {
                  <OpenRoute>
                    <Signup/>
                  </OpenRoute>
                }
              />

              {/* Verify email */}
              <Route 
                path="verify-email" 
                element={
                  <OpenRoute>
                    <VerifyEmail/>
                  </OpenRoute>
                }
              />

              {/* Forget password */}
              <Route 
                path="forget-password" 
                element={
                  <OpenRoute>
                    <ForgotPassword/>
                  </OpenRoute>
                }
              />

              {/* Update password */}
              <Route 
                path="update-password/:id" 
                element={
                  <OpenRoute>
                    <UpdatePassword/>
                  </OpenRoute>
                }
              />

              {/* User login hai tabhi dashboard path le jaw */}
              <Route 
                element={
                  <PrivateRoute>
                    <Dashboard/>
                  </PrivateRoute>
                }
              >
                <Route path="dashboard/my-profile" element={<MyProfile/>} />
                <Route path="dashboard/setting" element={<Settings/>} />
                {
                  user?.accountType === ACCOUNT_TYPE.STUDENT && (
                    //sirf student ko he access hai..
                    <>                     
                      <Route path="dashboard/enrolled-courses" element={<EnrolledCourses/>}/>
                      <Route path="dashboard/cart" element={<Cart/>} />
                    </>
                  )
                }
                {
                  user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
                    //sirf Instructor ko he access hai..
                    <>                     
                      <Route path="dashboard/add-course" element={<AddCourse/>}/>
                      <Route path="dashboard/my-courses" element={<MyCourses/>}/>
                      <Route path="dashboard/edit-course/:courseId" element={<EditCourse/>}/>
                      <Route path="dashboard/instructor" element={<DashboardInfo/>}/>
                    </>
                  )
                }
              </Route>

              {/* View course */}
              <Route
                element={
                  <PrivateRoute>
                    <ViewCourse/>
                  </PrivateRoute>
                }
              >
                {//Access by only student user
                  user?.accountType === ACCOUNT_TYPE.STUDENT && (
                    <>
                      <Route
                        path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                        element={<VideoSection/>}
                      />
                    </>
                  )
                }
              </Route>

              {/*When enter wrong path or url  */}
              <Route path="*" element={<Error/>}/>
          </Routes>
        </div>

    </div>
  );
}

export default App;
