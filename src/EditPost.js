import React, { useContext, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import DataContext from './context/DataContext';

const EditPost = ({  }) => {
  const { id } = useParams();
  const {posts, editBody, setEditBody, editTitle, setEditTitle, handleEdit}=useContext(DataContext)
  const post = posts.find((post) => (post.id) === id);

  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post, setEditTitle, setEditBody]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEdit(post.id);
  };

  return (
    <main className='NewPost'>
      {editTitle ? (
        <>
          <h2>Edit Post</h2>
          <form className='newPostForm' onSubmit={handleSubmit}>
            <label htmlFor="postTitle">Title:</label>
            <input
              id="postTitle"
              type="text"
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <label htmlFor='postBody'>Post:</label>
            <textarea
              id="postBody"
              required
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
            />
            <button type='submit'>Submit</button>
          </form>
        </>
      ) : (
        <>
          <h2>Post not found</h2>
          <p>Well, that's disappointing.</p>
          <p>
            <Link to='/'>Visit Our Homepage</Link>
          </p>
        </>
      )}
    </main>
  );
};

export default EditPost;
