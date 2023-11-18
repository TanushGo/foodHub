import { supabase } from '../client'
import { useState } from 'react'
import "./Create.css"

const Create = () => {
   
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

    const createPost = async (event) => {
            event.preventDefault();
        
           const { error } = await supabase
            .from('social')
            .insert({title :post.title, content: post.content, img:post.img})
            .select()
        
            if (error) {
                console.log(error);
            }
            window.location = "/";
        }

    return (<div className='create-page'>
        <h1>Create a new  food post!</h1>
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
            <button type='submit' onClick={createPost}>Create Post!</button>
            
    </div>
    )
}

export default Create;