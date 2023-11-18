import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../client";
import "./Post.css"
import Pen from "/src/assets/Pen.png"
import ThumbsUp from "/src/assets/thumbs-up.png"
import { Link } from "react-router-dom";
import Trash from "/src/assets/trash.png"

const Post = () => {
    let params = useParams();
    const [fullDetails, setFullDetails] = useState({comments :[]});
    const [newComment, setNewComment] = useState("");

    const handleChange = (event) => {
        
        const {name, value} = event.target;
        console.log(name, value)
        setNewComment(value)
        console.log(newComment);
    }

    const addComment = async () => {
        const { data, error } = await supabase
            .from('social')
            .update({ comments: [...fullDetails.comments, newComment] })
            .eq('id', params.id)
            .select()
        setFullDetails(data[0])
        setNewComment('')
    }

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

    const deletePost = async () => {
        const { error } = await supabase
            .from('social')
            .delete()
            .eq('id', params.id)

        window.location = "/";
                
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
        <img name ="like" src={ThumbsUp} height="100px" width="auto"  onClick={likePost}></img>
        <h3 className="upvotes">{fullDetails.upvotes} votes</h3>
        <h3>Comments:</h3>
        {fullDetails.comments.map((i) => <p key={i}>- {i} </p>)}
        <div className="mini-container">
            <label id='comments'><h3>Add comment</h3></label>
            <input type="text" name="comments" placeholder="Add comment.." value ={newComment} onChange={handleChange} />
            <button type='submit' onClick={addComment}>Submit</button>
        </div>
        <Link to={'/post/edit/'+ fullDetails.id}>
        <img src={Pen} height="20px" width="auto"></img>
        </Link>
        <img src={Trash} height="20px" width="auto" onClick={deletePost}></img>
    </div>
    )
}

export default Post;