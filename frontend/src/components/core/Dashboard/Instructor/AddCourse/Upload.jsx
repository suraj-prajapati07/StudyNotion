import React, { useState, useEffect } from "react";
import {useDropzone} from "react-dropzone"
import { FiUploadCloud } from "react-icons/fi"

import "video-react/dist/video-react.css"
import { Player } from "video-react"


const Upload = ({
    label, 
    name, 
    register, 
    setValue,
    errors,
    video=null,
    viewData=null,
    editData=null
}) => {

    const[selectedFile, setSelectedFile] = useState(null);
    const[previewSource, setPreviewSource] = useState(
        viewData? viewData : editData? editData : null
    );

    const onDrop = (acceptedFiles) => {
        //array of files aa raha hai to extract only single file
        const file = acceptedFiles[0];
        if(file){
            //preview the file
            previewFile(file);
            setSelectedFile(file);
        }
    }

    const previewFile = (file) => {
        // console.log(file)
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPreviewSource(reader.result)
        }
    }
    //useDropzone -> Give drag and drop functionality.
    //isDragActive -> boolean, true if user is currently dragging files over the area
    //getRootProps -> spread props into a wrapper <div> to make it a drop area
    //getInputProps -> spread props into a <input> file selection
    const {isDragActive, getInputProps, getRootProps} = useDropzone({
        //accept file type
        accept: !video? {"image/*":[".jpeg", ".jpg", ".png"]} : {"video/*": [".mp4"]},
        //only single file
        multiple: false,
        //function execution -> when file are selected/dropped
        onDrop,
    });


    //first render -> pe register kro
    useEffect(() => {
        register(name, {
            required: true,
        });

    }, [])

    //update the selectedFile in form data on every change
    useEffect(() => {

        setValue(name, selectedFile);
    }, [selectedFile, setValue]);


    return(
        <div className="flex flex-col space-y-2">
            <label htmlFor={name} className="text-sm text-richblack-5 uppercase tracking-wider">
                {label} <sup className="text-pink-200">*</sup>
            </label>
            
            <div
                className={`flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500
                ${isDragActive ? "bg-richblack-600" : "bg-richblack-700"}`}
            >
                {!previewSource ? (
                        <div
                            className="flex w-full flex-col items-center p-6"
                            {...getRootProps()}
                        >
                            <input type="file" {...getInputProps()}  />
                            <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
                                <FiUploadCloud className="text-2xl text-yellow-50" />
                            </div>
                            <p className="mt-2 max-w-[200px] text-center text-xs text-richblack-200 uppercase tracking-wider">
                                Drag and drop an {!video ? "image" : "video"}, or click to{" "}
                                <span className="font-semibold text-yellow-50">Browse</span>
                                {""} a file
                            </p>
                            <ul className="mt-10 flex list-disc justify-between space-x-12 text-center  text-xs text-richblack-200 uppercase tracking-wider">
                                <li>Aspect ratio 16:9</li>
                                <li>Recommended size 1024x576</li>
                            </ul>
                        </div>
                    ) : (
                        //Show preview of file..........
                        <div className="flex w-full flex-col p-6">
                            {/* Video or Image ho skta hai */}
                            {!video ? (
                                    <img
                                        src={previewSource}
                                        alt="Preview"
                                        className="h-full w-full rounded-md object-cover"
                                    />
                                ) 
                                : (
                                    <Player
                                        src={previewSource}
                                        aspectRatio="16:9"
                                        playsInline
                                    />
                                )
                            }
                            {/* cancel btn */}
                            {
                                !viewData && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSelectedFile(null);
                                            setPreviewSource(null);
                                            setValue(name, setSelectedFile);
                                        }}
                                        className="mt-3 text-yellow-300 underline"
                                    >
                                        Cancel
                                    </button>
                                )
                            }
                        </div>
                    )
                }
            </div>
            {errors[name] && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                        {label} is required
                    </span>
                )
            }
            
        </div>
    )
}

export default Upload;