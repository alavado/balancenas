import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import './FormularioNuevaCena.css'
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const AGREGAR_CENA = gql`
  mutation createCena($titulo: String!, $monto: Int!, $dividida: Boolean!) {
    createCena(data: {
      titulo: $titulo
      monto: $monto
      dividida: $dividida
      paga: {
        connect: "249858179658154515"
      }
    }) {
      titulo
    }
  }
`;

const FormularioNuevaCena = () => {

  const [addTodo, { data }] = useMutation(AGREGAR_CENA)
  const [variables, setVariables] = useState({
    titulo: '',
    monto: 0,
    dividida: false
  })

  if (data) {
    return <Redirect to="/" />
  }

  const agregarCena = e => {
    e.preventDefault()
    addTodo({ variables })
  }

  return (
    <div>
      <form onSubmit={agregarCena}>
        <label htmlFor="titulo">Título</label>
        <input
          id="titulo"
          type="text"
          onChange={e => setVariables({...variables, titulo: e.target.value})}
        />
        <label htmlFor="monto">Monto</label>
        <input
          id="monto"
          type="number"
          onChange={e => setVariables({...variables, monto: Number(e.target.value)})}
        />
        <label htmlFor="dividida">Dividir la cuenta</label>
        <input
          id="dividida"
          type="checkbox"
          onChange={e => setVariables({...variables, dividida: e.target.checked})}
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  )
}

export default FormularioNuevaCena
