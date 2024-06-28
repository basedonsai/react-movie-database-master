import React, { useState } from 'react';
import axios from 'axios';

import Search from './components/Search';
import Results from './components/Results';
import Popup from './components/Popup';

function App() {
  const [state, setState] = useState({
    s: "",
    results: [],
    selected: {}
  });
  const apiKey = "3713f66b"; // Replace with your actual API key

  const search = (e) => {
    if (e.key === "Enter") {
      axios(`http://www.omdbapi.com/?apikey=${apiKey}&s=${state.s}`).then(({ data }) => {
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
    axios(`http://www.omdbapi.com/?apikey=${apiKey}&i=${id}`).then(({ data }) => {
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

  return (
    <div className="App">
      <header>
        <h1>WatchFlix</h1>
      </header>
      <main>
        <Search handleInput={handleInput} search={search} />
        <Results results={state.results} openPopup={openPopup} />
        {state.selected.Title ? <Popup selected={state.selected} closePopup={closePopup} /> : null}
      </main>
    </div>
  );
}

export default App;
