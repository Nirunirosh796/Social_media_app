import React from 'react'
import { Link,Outlet } from 'react-router-dom'

const PostLayout = () => {
  return (
    <div>
        <Link to="/PostPage/1">Post1</Link>
        <br></br>
        <Link to="/PostPage/2">Post2</Link>
        <br></br>
        <Link to="/PostPage/3">Post3</Link>
        <br></br>
        <Link to='/PostPage/NewPost'>NewPost</Link>
        <Outlet/>
    </div>
  )
}

export default PostLayout