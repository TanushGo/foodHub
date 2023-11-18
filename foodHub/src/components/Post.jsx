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
    }, [fullDetails]);

    const likePost = async () => {
        const { data, error } = await supabase
            .from('social')
            .update({ upvotes: fullDetails.upvotes + 1 })
            .eq('id', params.id)
            .select()
        setFullDetails(data[0])
    }
    function timeSince(date1) {
        var seconds = Math.floor((new Date() - date1) / 1000);
      
        var interval = seconds / 31536000;
      
        if (interval > 1) {
          return Math.floor(interval) + " years";
        }
        interval = seconds / 2592000;
        if (interval > 1) {
          return Math.floor(interval) + " months";
        }
        interval = seconds / 86400;
        if (interval > 1) {
          return Math.floor(interval) + " days";
        }
        interval = seconds / 3600;
        if (interval > 1) {
          return Math.floor(interval) + " hours";
        }
        interval = seconds / 60;
        if (interval > 1) {
          return Math.floor(interval) + " minutes";
        }
        return Math.floor(seconds) + " seconds";
      }
    return (
    <div className="post-content">
        <h3 className="time">Posted {timeSince(new Date(fullDetails.created_at))} ago</h3>
        <h2 className="title">{fullDetails.title}</h2>
        <img src={fullDetails.img} height="100px" width="auto"></img>
        <p>{fullDetails.content}</p>
        <img src="src/assets/thumbs-up" height="100px" width="auto"  onClick={likePost}></img>
        <h3 className="upvotes">{fullDetails.upvotes} votes</h3>
        
    </div>
    )
}

export default Post;