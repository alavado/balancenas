import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import './FormularioNuevaCena.css'
import { useMutation, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const OBTENER_COMENSALES = gql`
  {
    getComensales {
      data {
        _id
        nombre
      }
    }
  }
`

const AGREGAR_CENA = gql`
  mutation createCena($titulo: String!, $monto: Int!, $dividida: Boolean!, $paga: ID!) {
    createCena(data: {
      titulo: $titulo
      monto: $monto
      dividida: $dividida
      paga: {
        connect: $paga
      }
    }) {
      titulo
    }
  }
`

const FormularioNuevaCena = () => {
  
  const { loading, error, data: dataComensales } = useQuery(OBTENER_COMENSALES)
  const [agregarCena, { data }] = useMutation(AGREGAR_CENA)
  const [variables, setVariables] = useState({
    titulo: '',
    monto: 0,
    dividida: false,
    paga: ''
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  if (data) {
    return <Redirect to="/" />
  }

  if (variables.paga === '') {
    setVariables({...variables, paga: dataComensales.getComensales.data[0]._id})
  }

  const enviarFormulario = e => {
    e.preventDefault()
    agregarCena({ variables })
  }

  return (
    <div>
      <form id="formulario-nueva-cena" onSubmit={enviarFormulario}>
        <label htmlFor="titulo-nueva-cena">Título</label>
        <input
          id="titulo-nueva-cena"
          type="text"
          onChange={e => setVariables({...variables, titulo: e.target.value})}
        />
        <label htmlFor="monto-nueva-cena">Monto</label>
        <input
          id="monto-nueva-cena"
          type="number"
          onChange={e => setVariables({...variables, monto: Number(e.target.value)})}
        />
        <label htmlFor="paga-nueva-cena">Paga</label>
        <select
          id="paga-nueva-cena"
          onChange={e => setVariables({...variables, paga: e.target.value})}
        >
          {dataComensales && dataComensales.getComensales.data.map(({_id, nombre}) => (
            <option
              key={_id}
              value={_id}
            >
              {nombre}
            </option>
          ))}
        </select>
        <div>
          <input
            id="dividida-nueva-cena"
            type="checkbox"
            onChange={e => setVariables({...variables, dividida: e.target.checked})}
          />
          <label htmlFor="dividida-nueva-cena">Dividir la cuenta</label>
        </div>
        <button type="submit">Agregar Cena</button>
      </form>
    </div>
  )
}

export default FormularioNuevaCena
