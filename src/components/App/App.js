import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'
import Cenas from '../Cenas'

function App() {
  return (
    <>
      <div>Balancenas</div>
      <BrowserRouter>
        <Route path="/" exact component={Cenas} />
      </BrowserRouter>
    </>
  );
}

export default App;
