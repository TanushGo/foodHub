import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../client";
import "./Post.css"

const Post = () => {
    let params = useParams();
    const [fullDetails, setFullDetails] = useState({});

    useEffect(() => {
        const fetchPost = async () => {
            const {data} = await supabase
            .from('social')
            .select('*')
            .eq("id", params.id)
            .order('created_at', { ascending: true })
        
        setFullDetails(data[0]);
        }
        
        fetchPost().catch(console.error);
    }, []);
    return (
    <div className="post-content">
        <h1>{fullDetails.title}</h1>
        <p>{fullDetails.content}</p>
    </div>
    )
}




const BreweryDetail = () => {
    

    console.log(fullDetails)
    return (<div>
        <h1>{fullDetails.name}</h1>
        <h4>Brewery Type: {fullDetails.brewery_type}</h4>
        <p>Address:</p>
        <p>{fullDetails.street}, {fullDetails.city}, {fullDetails.state}</p>
        <a href={fullDetails.website_url}>{fullDetails.website_url}</a>
        <p>Latitude : {fullDetails.latitude}  & Longitude : {fullDetails.longitude}</p>
    </div>
    )
}
export default Post;