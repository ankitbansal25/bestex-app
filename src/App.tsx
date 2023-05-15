import React from 'react';
import './App.css';
import Heading from './components/Heading';
import MainContainer from './components/maincontainer/MainContainer';
function App() {
  return (
    <div className="App">
      <Heading />
      <MainContainer></MainContainer>
    </div>
  );
}

export default App;
