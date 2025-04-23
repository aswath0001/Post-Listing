import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import Header from '../../components/Header/Header';
import "./DetailsPage.css";

const DetailsPage = () => {

const {id} = useParams();
const [post,setPost] = useState(null);
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
    fetch(`https://dummyjson.com/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data); 
        setIsLoading(false);
      })
     
  }, [id]);
  
  if (isLoading) {
    return <LoadingSpinner />;  
  };

  return (
    <div className='detailsPage'>
        <Header title="Post"/>
        <h4><strong>Post ID:</strong> {post.id}</h4>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
    </div>
  )
}

export default DetailsPage;