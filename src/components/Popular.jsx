import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { Splide, SplideSlide} from "@splidejs/react-splide";
import '@splidejs/react-splide/css';
import {Link} from 'react-router-dom'

function Popular() {

  const [popular, setPopular] = useState([]);

  useEffect(() => {
    getPopular();
  },[]);

  // create function to retrieve the popular recipes that will be displayed
  const getPopular = async() => {

    // check if anything is in local storage
    // if there is, set local state to storage
    const check = localStorage.getItem('popular');

    //conditional to prevent constant fetching of data when the page is refreshed
    if(check){
      //retrieve it from local storage and parse it because its a string
      setPopular(JSON.parse(check));
    }else{
      const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`);
      const data = await api.json();

      //local storage only stores strings
      //turn the array into a string whilst its stored
      localStorage.setItem('popular', JSON.stringify(data.recipes));
      setPopular(data.recipes);
    }

  }


  //display the popular recipes
  return (
      <div>
          <Wrapper>
            <h3>Popular</h3>

            {/* Wrap the recipes in the splide slider */}
            <Splide options={{
              perPage: 4,
              arrows: false,
              pagination: false,
              drag: 'free',
              gap: '5rem'
            }}>
          {/* loop through the objects and grab their titles
              then display them in the slider with images */}
              {popular.map((recipe) => {
                return(
                  <SplideSlide key={recipe.id}>
                    <Card>
                      {/* use the recipe id as the link for recipe page */}
                      <Link to={'/recipe/' + recipe.id}>
                        <p>{recipe.title}</p>
                        <img src={recipe.image} alt={recipe.title}/>
                        <Gradient/>
                      </Link>
                    </Card>
                  </SplideSlide>
                );
              })}
            </Splide>
          </Wrapper>
        .
    </div>
  )
}

//wrapper div
const Wrapper = styled.div`
margin: 4rem 0rem;
`

//Css component to display the recipe onto
const Card = styled.div`
  min-height: 25rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;

  img{
    border-radius: 2rem;
    position: aboslute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  p{
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: black;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`
const Gradient = styled.div`
  z-index: 3'
  position:absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5));
`

export default Popular