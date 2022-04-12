//page to add two components on the homepage
import Veggie from "../components/Veggie";
import Popular from "../components/Popular";

import React from 'react'

//function to render the correct components on the homepage
function Home() {
  return (
    <div>
        <Popular />
        <Veggie />
    </div>
  )
}

export default Home