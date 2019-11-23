import React from 'react'
import './FormularioNuevaCena.css'
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const AGREGAR_CENA = gql`
  mutation createCena($titulo: String!) {
    createCena(data: {
      titulo: $titulo
      monto: 100
      dividida: false
    }) {
      titulo
    }
  }
`;

const FormularioNuevaCena = () => {

  const [addTodo, { data }] = useMutation(AGREGAR_CENA);

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          addTodo({ variables: { titulo: 'Prueba' } })
        }}
      >
        <button type="submit">Add Todo</button>
      </form>
    </div>
  )
}

export default FormularioNuevaCena
