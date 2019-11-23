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
      }
    }
  }
`

const ListaCenas = () => {

  const { loading, error, data } = useQuery(OBTENER_CENAS, {
    pollInterval: 1000
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return data.getCenas.data
    .sort((c1, c2) => c2._ts > c1._ts ? 1 : -1)
    .map(({ _id, _ts, titulo, monto }) => (
      <div key={_id}>
        <Link to={`/cena/${_id}`}>{_ts} - {titulo} - {monto}</Link>
      </div>
  ))
}

export default ListaCenas
