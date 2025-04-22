import React, { useEffect, useState } from 'react'
import "./HomePage.css"

const HomePage = () => {
    const [data ,setData] = useState([]);
    useEffect(()=>{
      fetch("https://dummyjson.com/posts?limit=100")
      .then((res)=>res.json())
      .then((data) =>setData(data.posts));
    },[]);

  return (
    <div className='homepage'>
        <h1 className='hero'>Posts</h1>
        <ul>
            {data.map((post)=> (
                <li key={post.id}>
                    <p><strong>Post ID:</strong> {post.id}</p>
                    <h2>
                    {post.title}
                    </h2>
                    <p>{post.body}</p>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default HomePage