import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'
import ListaCenas from '../ListaCenas'
import FormularioNuevaCena from '../FormularioNuevaCena';
import DetalleCena from '../DetalleCena';
import Navegacion from '../Navegacion';

const App = () => {
  return (
    <BrowserRouter>
      <div id="contenedor">
        <Navegacion />
        <Route path="/" exact component={ListaCenas} />
        <Route path="/nuevacena" exact component={FormularioNuevaCena} />
        <Route path="/cena/:id" exact component={DetalleCena} />
      </div>
    </BrowserRouter>
  );
}

export default App;
