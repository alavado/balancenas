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
      <form onSubmit={enviarFormulario}>
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
        <select onChange={e => setVariables({...variables, paga: e.target.value})}>
          {dataComensales && dataComensales.getComensales.data.map(({_id, nombre}) => (
            <option
              key={_id}
              value={_id}
            >
              {nombre}
            </option>
          ))}
        </select>
        <button type="submit">Agregar</button>
      </form>
    </div>
  )
}

export default FormularioNuevaCena
