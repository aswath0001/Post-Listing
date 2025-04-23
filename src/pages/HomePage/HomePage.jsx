import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import SearchBar from '../../components/SearchBar/SearchBar';
import AddPost from '../../components/AddPost/AddPost';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import "./HomePage.css";

const HomePage = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [nextId, setNextId] = useState(101); // Start from ID 101
  const [error, setError] = useState(null);
  const [editPost, setEditPost] = useState(null); // Track post being edited

  useEffect(() => {
    fetch("https://dummyjson.com/posts?limit=100")
      .then((res) => res.json())
      .then((data) => {
        setData(data.posts);
        setNextId(data.posts.length + 1); // Set the next ID after the last post's ID
        setIsLoading(false); 
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setError("Failed to load posts.");
        setIsLoading(false); 
      });
  }, []);

  const handleAddPost = (newPost) => {
    setData([newPost, ...data]);
    setNextId(nextId + 1); // Increment nextId for future posts
    setShowForm(false); 
  };

  const handleEditPost = (updatedPost) => {
    // Make sure the ID stays the same when editing a post
    const updatedData = data.map(post =>
      post.id === updatedPost.id ? updatedPost : post
    );
    setData(updatedData);
    setShowForm(false); 
    setEditPost(null); // Reset editPost after submission
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="homepage">
      <Header title="Posts"/>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      
      {error && <div className="error-message">{error}</div>} {/* Display error message */}
      
      <ul className="post-container">
        {showForm && (
          <div className="overlay">
            <AddPost 
              onAddPost={handleAddPost} 
              onClose={() => setShowForm(false)} 
              nextId={nextId} 
              initialData={editPost} // Pass initial data to form for editing
              onEditPost={handleEditPost} // Handle post edit
            />
          </div>
        )}

        {data
          .filter(post =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.body.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((post) => (
            <li key={post.id} className="post-card">
              {post.id > 100 && (
                <button 
                  className="editButton" 
                  onClick={() => {
                    setShowForm(true);
                    setEditPost(post); // Set the post data to be edited
                  }}
                >
                  Edit
                </button>
              )}
              <Link to={`/posts/${post.id}`} className="post-card">
                <h4><strong>Post ID:</strong> {post.id}</h4>
                <h2>{post.title}</h2>
                <p>{post.body.substring(0, 30)}...</p>
              </Link>

            </li>
          ))}
      </ul>
      
      <button 
        className="floating-button" 
        onClick={() => setShowForm(true)}
        aria-label="Add new post"
      >
        +
      </button>
    </div>
  );
};

export default HomePage;
