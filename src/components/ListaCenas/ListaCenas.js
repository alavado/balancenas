import React from 'react'
import './ListaCenas.css'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const OBTENER_CENAS = gql`
  {
    getCenas {
      data {
        _id
        _ts
        titulo
        monto
        paga {
          nombre
        }
      }
    }
  }
`

const ListaCenas = () => {

  const { loading, error, data } = useQuery(OBTENER_CENAS, {
    pollInterval: 1000
  })

  if (loading) return <p>Cargando...</p>
  if (error) return <p>Error :(</p>

  const cenas = data.getCenas.data

  const obtenerCenas = nombre => cenas.filter(v => v.paga.nombre === nombre)
  const obtenerMonto = nombre => obtenerCenas(nombre).reduce((sum, {monto}) => sum + monto, 0)

  const montoAlejandro = obtenerMonto('Alejandro')
  const montoCatalina = obtenerMonto('Catalina')
  const quienDebe = montoAlejandro > montoCatalina ? 'Catalina' : 'Alejandro'

  return (
    <>
      <h2>{quienDebe} debe ${Math.abs(montoAlejandro - montoCatalina)}</h2>
      <p>Total Alejandro: ${montoAlejandro}</p>
      <p>Total Catalina: ${montoCatalina}</p>
      <div id="lista-cenas">
        {cenas
          .sort((c1, c2) => c2._ts > c1._ts ? 1 : -1)
          .map(({ _id, _ts, titulo, monto }) => (
            <div key={_id}>
              <Link to={`/cena/${_id}`}>{_ts} - {titulo} - ${monto}</Link>
            </div>
        ))}
      </div>
    </>
  )
}

export default ListaCenas
