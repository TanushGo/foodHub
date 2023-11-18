import { supabase } from '../client'
import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
    
import "./Create.css"

const Edit = () => {
    let params = useParams();
    const [post, setPost] = useState({title: "", content: "", img: ""})

    const handleChange = (event) => {
        
        const {name, value} = event.target;
     
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        
        })
        console.log(post);
    }
    useEffect(() => {
        const fetchPost = async () => {
            const {data} = await supabase
            .from('social')
            .select('*')
            .eq("id", params.id)
            .order('created_at', { ascending: true })
        
        setPost(data[0]);
        }
        
        fetchPost().catch(console.error);
    }, []);

    const editPost = async (event) => {
            event.preventDefault();
        
           const { error } = await supabase
            .from('social')
            .update({title :post.title, content: post.content, img:post.img})
            .eq("id", params.id)
            .select()
        
            if (error) {
                console.log(error);
            }
            window.location = "/";
        }

    return (<div className='create-page'>
        <h1>Edit the food post!</h1>
        <img src="src/assets/meal.png" height="100px" width="auto"></img>
        <br></br>
        <form className="form-container">
            <div className="mini-container">
                <label id='Title'><h3>Title:</h3></label>
                <input type="text" name="title" placeholder="title" value ={post.title} onChange={handleChange}/>
            </div>
            <div className="mini-container">
                <label id='Content'><h3>Content:</h3></label>
                <input type="text" name="content" placeholder="Content" value ={post.content} style={{height:170 + "px", paddingBottom: 170 +"px", paddingTop:0 +"px",width:200 + "px"}} onChange={handleChange} />
            </div>
            <div className="mini-container">
                <label id='img'><h3>Image:</h3></label>
                <input type="text" name="img" placeholder="image" value ={post.img} onChange={handleChange} />
                </div>
                
            </form>
            <button type='submit' onClick={editPost}>Edit Post!</button>
            
    </div>
    )
}


export default Edit;