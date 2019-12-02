import React, { useEffect } from 'react'
import './ListaCenas.css'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { formatearDinero } from '../../helpers/formatos';
import Loader from '../Loader/Loader';

const OBTENER_CENAS = gql`
  {
    getCenas {
      data {
        _id
        _ts
        titulo
        monto
        dividida
        paga {
          nombre
        }
      }
    }
  }
`

const ListaCenas = () => {

  const { loading, error, data, refetch } = useQuery(OBTENER_CENAS)

  useEffect(() => {
    refetch()
  }, [refetch])

  if (loading) return <Loader />
  if (error) return <p>Error :(</p>

  const cenas = data.getCenas.data

  const obtenerCenas = nombre => cenas.filter(v => v.paga.nombre === nombre)
  const obtenerMonto = nombre => obtenerCenas(nombre)
    .reduce((sum, {monto, dividida}) => sum + monto * (dividida ? .5 : 1), 0)

  const montoAlejandro = obtenerMonto('Alejandro')
  const montoCatalina = obtenerMonto('Catalina')
  const quienDebe = montoAlejandro > montoCatalina ? 'Catalina' : 'Alejandro'

  return (
    <div id="contenedor-lista-cenas">
      <div id="lista-cenas">
        <h2 id="deudor">{quienDebe} debe ${formatearDinero(Math.abs(montoAlejandro - montoCatalina))}</h2>
        <h3>Últimas cenas</h3>
        {cenas
          .filter((cena, i) => i < 5)
          .sort((c1, c2) => c2._ts > c1._ts ? 1 : -1)
          .map(({ _id, _ts, titulo, monto }) => (
            <Link key={_id} to={`/cena/${_id}`}>
              <div className="fila-lista-cenas">
                <div className="fila-lista-cenas-titulo">{titulo}</div>
                <div className="fila-lista-cenas-monto">${formatearDinero(monto)}</div>
              </div>
            </Link>
        ))}
        <Link to="/nuevacena" id="boton-agregar-cena"><p>Agregar cena</p></Link>
      </div>
    </div>
  )
}

export default ListaCenas
