import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import api from '../api/posts';
import useWindowSize from '../hooks/useWindowSize';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [editBody, setEditBody] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const navigate = useNavigate();
  const { width } = useWindowSize();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts');
        setPosts(response.data);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.headers);
          console.log(error.response.status);
        } else {
          console.log(`Error: ${error.message}`);
        }
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const filteredResults = posts.filter((post) =>
      post.body.toLowerCase().includes(search.toLowerCase()) ||
      post.title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const id = String(posts.length ? posts[posts.length - 1].id + 1 : 1);
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody };

    try {
      const response = await api.post('/posts', newPost);
      const allPosts = [...posts, response.data];
      setPosts(allPosts);
      setPostTitle('');
      setPostBody('');
      navigate('/');
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.headers);
        console.log(error.response.status);
      } else {
        console.log(`Error: ${error.message}`);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      const postsList = posts.filter((post) => post.id !== id);
      setPosts(postsList);
      navigate('/');
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  };

  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatePost = { id, title: editTitle, datetime, body: editBody };

    try {
      const response = await api.put(`/posts/${id}`, updatePost);
      setPosts(posts.map(post => post.id === id ? { ...response.data } : post));
      setEditTitle('');
      setEditBody('');
      navigate('/');
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.headers);
        console.log(error.response.status);
      } else {
        console.log(`Error: ${error.message}`);
      }
    }
  };

  return (
    <DataContext.Provider value={{
      width, search, setSearch, searchResults,
      handleSubmit, postBody, postTitle, setPostBody, setPostTitle,
      posts, editBody, setEditBody, editTitle, setEditTitle, handleEdit,
      handleDelete
    }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;

