import React from 'react'
import './Navegacion.css'
import { Link, withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

const Navegacion = props => {

  const { location: { pathname } } = props
  const noEstoyEnInicio = pathname !== '/'

  return (
    <div id="titulo">
      {noEstoyEnInicio && <Link to="/"><FontAwesomeIcon id="icono-volver" icon={faArrowLeft} /></Link>}
      Balancenas
    </div>
  )
}

export default withRouter(Navegacion)
