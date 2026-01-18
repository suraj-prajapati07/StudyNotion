import React from "react";
import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { categories } from "../apis";

export async function getCatalogPageData(categoryId){
    const toastId = toast.loading("Loading...");
    let result = null;
    try{
        const response = await apiConnector("POST", categories.CATALOG_PAGE_DATA_API,
            {
                categoryId :categoryId
            }
        );
        if(!response.data.success){
            throw new Error("Could Not Fetch Catagory Page Details.");
        }
        result = response.data;
    }
    catch(error){
        console.log("CATALOGPAGEDATA_API API ERROR............", error)
        toast.error(error.message);
        result = error.response?.data
    }

    toast.dismiss(toastId);
    return result;
}