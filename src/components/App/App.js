import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'
import { AnimatedSwitch } from 'react-router-transition'
import ListaCenas from '../ListaCenas'
import FormularioNuevaCena from '../FormularioNuevaCena';
import DetalleCena from '../DetalleCena';
import Navegacion from '../Navegacion';

const App = () => {
  return (
    <BrowserRouter>
      <div id="contenedor">
        <Navegacion />
        <AnimatedSwitch
          atEnter={{ opacity: 0 }}
          atLeave={{ opacity: 0 }}
          atActive={{ opacity: 1 }}
          className="switch-wrapper"
        >
          <Route path="/" exact component={ListaCenas} />
          <Route path="/nuevacena" exact component={FormularioNuevaCena} />
          <Route path="/cena/:id" exact component={DetalleCena} />
        </AnimatedSwitch>
      </div>
    </BrowserRouter>
  );
}

export default App;
