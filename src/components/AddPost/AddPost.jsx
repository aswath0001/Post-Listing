import React, { useState, useEffect } from 'react';
import './AddPost.css';

const AddPost = ({ onAddPost, onClose, initialData, onEditPost, nextId }) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [body, setBody] = useState(initialData?.body || "");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setBody(initialData.body);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      id: initialData?.id || nextId, // If editing, retain the original ID
      title,
      body
    };

    if (initialData) {
      onEditPost(newPost); // If editing, call the edit handler
    } else {
      onAddPost(newPost); // If adding a new post, call the add handler
    }
  };

  return (
    <div className="add-post-form">
      <h2>{initialData ? 'Edit Post' : 'Add Post'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
        <div className="form-buttons">
          <button type="submit">{initialData ? 'Update' : 'Add'}</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
