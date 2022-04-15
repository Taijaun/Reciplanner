import React from 'react'
import Home from './Home'
import Cuisine from './Cuisine';
import SearchedPage from './SearchedPage';
import Recipe from './Recipe';
import { Route, Routes } from 'react-router-dom';

function Pages() {
  return (

      <Routes>
          {/* Create routes for seperate pages */}
          <Route path="/" element={<Home/>}/>
          <Route path="/cuisine/:type" element={<Cuisine/>}/>
          <Route path='/searched/:search' element={<SearchedPage/>}/>
          <Route path='/recipe/:name' element={<Recipe/>}/>
      </Routes>

  )
}

export default Pages