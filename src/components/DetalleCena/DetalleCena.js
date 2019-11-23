import React from 'react'
import './DetalleCena.css'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const OBTENER_CENA = gql`
  query FindCenaByID($id: ID!) {
    findCenaByID(id: $id) {
      titulo
      monto
      dividida
      paga {
        nombre
      }
    }
  }
`

const DetalleCena = () => {

  const { id } = useParams() 
  const { loading, error, data } = useQuery(OBTENER_CENA, {
    variables: { id }
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <div>
      <p>DetalleCena {id}</p>
      <p>Titulo: {data && data.findCenaByID.titulo}</p>
      <p>Paga: {data && data.findCenaByID.paga.nombre}</p>
      <p>Monto: {data && data.findCenaByID.monto}</p>
      <p>Se dividio: {data && data.findCenaByID.dividida ? 'si' : 'no'}</p>
    </div>
  )
}

export default DetalleCena
