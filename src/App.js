import React, { useState } from 'react';
import axios from 'axios';


import Search from './components/Search';
import Results from './components/Results';
import Popup from './components/Popup';
import keywords from './test';
import RandomButton from './components/RandomButton';

const apiKey = "3713f66b"; // Replace with your actual API key

function App() {
  const [state, setState] = useState({
    s: "",
    results: [],
    selected: {}
  });

  const search = (e) => {
    if (e.key === "Enter") {
      axios(http://www.omdbapi.com/?apikey=${apiKey}&s=${state.s}).then(({ data }) => {
        if (data.Response === "True") {
          let results = data.Search;
          setState(prevState => {
            return { ...prevState, results: results }
          });
        } else {
          console.log(data.Error);
        }
      });
    }
  }

  const handleInput = (e) => {
    let s = e.target.value;
    setState(prevState => {
      return { ...prevState, s: s }
    });
  }

  const openPopup = id => {
    axios(http://www.omdbapi.com/?apikey=${apiKey}&i=${id}).then(({ data }) => {
      if (data.Response === "True") {
        let result = data;
        setState(prevState => {
          return { ...prevState, selected: result }
        });
      } else {
        console.log(data.Error);
      }
    });
  }

  const closePopup = () => {
    setState(prevState => {
      return { ...prevState, selected: {} }
    });
  }

  const getRandomMovie = () => {
    const keyword=keywords
    const randomKeyword = keyword[Math.floor(Math.random() * keyword.length)];
    


















    axios(http://www.omdbapi.com/?apikey=${apiKey}&s=${randomKeyword}).then(({ data }) => {
      if (data.Response === "True") {
        let randomMovie = data.Search[Math.floor(Math.random() * data.Search.length)];
        openPopup(randomMovie.imdbID);
      } else {
        console.log(data.Error);
      }
    });
  }

  return (
    <div className="App">
      <header>
        <h1>Movie Finder</h1>
      </header>
      <main>
        <Search handleInput={handleInput} search={search} />
        <RandomButton getRandomMovie={getRandomMovie} />
        <Results results={state.results} openPopup={openPopup} />
        {state.selected.Title ? <Popup selected={state.selected} closePopup={closePopup} /> : null}
      </main>
    </div>
  );
}

export default App;
