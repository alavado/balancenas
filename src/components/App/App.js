import React from 'react';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import ListaCenas from '../ListaCenas'
import FormularioNuevaCena from '../FormularioNuevaCena';
import DetalleCena from '../DetalleCena';

function App() {
  return (
    <>
      <BrowserRouter>
        <div><Link to="/">Balancenas</Link></div>
        <div><Link to="/nuevacena">Agregar cena</Link></div>
        <Route path="/" exact component={ListaCenas} />
        <Route path="/nuevacena" exact component={FormularioNuevaCena} />
        <Route path="/cena" exact component={DetalleCena} />
      </BrowserRouter>
    </>
  );
}

export default App;
