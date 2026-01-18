import React from "react"; 
import Template from "../components/core/Auth/Template";
import loginImage from "../assets/Images/login.webp"

const Login = () => {
    return (
        <Template
            title = "Welcome Back"
            description1 = "Build skills for today, tomorrow, and beyond."
            description2 = "Education to future-proof your career."
            formType = "login"
            image = {loginImage}
        />
    )
}

export default Login;