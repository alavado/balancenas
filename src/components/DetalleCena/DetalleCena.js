import React from 'react'
import './DetalleCena.css'
import { useParams } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Redirect } from 'react-router-dom'
import { formatearDinero } from '../../helpers/formatos';
import logo from '../../assets/logo512.png'

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

const ELIMINAR_CENA = gql`
  mutation deleteCena($id: ID!) {
    deleteCena(id: $id) {
      titulo
    }
  }
`

const DetalleCena = () => {

  const { id } = useParams() 
  const { loading, error, data } = useQuery(OBTENER_CENA, {
    variables: { id }
  })
  const [eliminarCena, { data: dataEliminacion }] = useMutation(ELIMINAR_CENA)

  if (dataEliminacion) {
    return <Redirect to="/" />
  }

  if (loading) return <p>Cargando...</p>
  if (error) return <p>Error :(</p>

  const datosCena = data.findCenaByID

  return (
    <div id="detalle-cena">
      <h1>{datosCena.titulo}</h1>
      <p>{datosCena.paga.nombre} pagó ${formatearDinero(datosCena.monto)}</p>
      <p>Se dividió: {datosCena.dividida ? 'si' : 'no'}</p>
      <img src={logo} alt="cena" />
      <button
        id="boton-eliminar-cena"
        onClick={e => eliminarCena({ variables: { id } })}
      >
        Eliminar esta cena
      </button>
    </div>
  )
}

export default DetalleCena
