import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "../../../common/IconButton";
import { FiUpload } from "react-icons/fi"
import { GrInProgress } from "react-icons/gr"
import { updateProfilePicture } from "../../../../services/operations/settingsApi";

const ChangeProfilePicture = () => {
    const {user} = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth);

    const fileInputRef = useRef(null);
    const dispatch = useDispatch();

    const[loading, setLoading] = useState(false);

    const[imageFile, setImageFile] = useState(null);
    const[previewSource, setPreviewSource] = useState(null);

    //function for handle select file click
    function handleFileSelect(){
        fileInputRef.current.click();
    }

    //function for Handle file change..........
    function handleFileChange(e){
        const file = e.target.files[0];
        console.log("File : ", file);
        if(file){
            setImageFile(file);
            //preview kr ke dekhaw image....
            previewFile(file);   
        }
    }
    function previewFile (file){
        const reader = new FileReader()
        
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result); //base64 URL
        }
    }

    //function for handling file upload..
    function handleFileUpload(){  
        const formData = new FormData();
        formData.append("dpImage", imageFile);
        //API call.
        try{
            setLoading(true);
            dispatch(updateProfilePicture(token, formData)).then(() => setLoading(false));
            
        }
        catch(error){
            console.log("ERROR MESSAGE - ", error.message)
        }

    }

    //Re-render the component on every imageFile change...
    useEffect(() => {
        
    }, [previewSource])

    return(
        <div className="my-10 border border-richblack-700 bg-richblack-800 p-8 px-2 md:px-12 rounded-md">
            <div className="flex gap-x-6 items-center">
                {/* Profile pic */}
                <div>
                    <img
                        src={previewSource || user?.image}
                        alt={`profile-${user?.firstName}`}
                        className="aspect-square w-[60px] md:w-[78px] rounded-full object-cover"
                    />
                </div>

                {/* Form for change dp */}
                <div className="space-y-2">
                    <h2 className="lg:text-lg text-md font-medium text-richblack-25 tracking-wider">
                        Change Profile Picture
                    </h2>
                    
                    <div className="flex items-center gap-x-4">
                        {/* hidden input tag for uploading file */}
                        <input 
                            required
                            type="file" 
                            ref={fileInputRef} 
                            onChange={handleFileChange} 
                            className='hidden'
                            accept='image/jpeg, image/gif image/jpg image/png' 
                        />

                        {/* Select and Upload btn */}
                        <button 
                            onClick={handleFileSelect} 
                            disabled={loading}
                            className={` bg-richblack-600 text-richblack-50 lg:py-2 py-1 lg:px-5 px-2 font-semibold rounded-md uppercase tracking-wider ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}
                            `} 
                        >
                            Select
                        </button>
                        <IconButton
                            text={loading? "Uploading..." : "Upload"}
                            onClickHandler= {handleFileUpload}
                            customClasses={`lg:py-2 lg:px-5`}
                            disabled={loading}
                            children={
                                loading ? <GrInProgress className="text-lg text-richblack-900 animate-spin"/> :
                                <FiUpload className="text-lg text-richblack-900"/>
                            }
                            
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ChangeProfilePicture;