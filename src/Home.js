import React from 'react'
import  { useContext } from 'react';

import Feed from './Feed'
import DataContext from './context/DataContext'

const Home = () => {
  const {searchResults}=useContext(DataContext)
  
  return (
    <main>
      {searchResults.length?(
          <Feed posts={searchResults}/>
      ):(
      <p style={{marginTop:"2rem"}}>
        No Posts Display
      </p>

      )}
    </main>
  )
}

export default Home