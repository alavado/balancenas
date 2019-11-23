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
      }
    }
  }
`

const ListaCenas = () => {
  const { loading, error, data } = useQuery(OBTENER_CENAS)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  return data.getCenas.data.map(({ _id, _ts, titulo }) => (
    <div key={_id}>
      <Link to={`/cena/${_id}`}>{_ts} - {titulo}</Link>
    </div>
  ))
}

export default ListaCenas
