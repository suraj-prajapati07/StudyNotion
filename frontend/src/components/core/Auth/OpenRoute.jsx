
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const OpenRoute = ({children}) => {
    const {token} = useSelector((state) => state.auth);

    if(token === null){
        return children;
    }
    else{
        //navigate to dashboard...
        return <Navigate  to={"/dashboard/my-profile"}/>
    }
}

export default OpenRoute;