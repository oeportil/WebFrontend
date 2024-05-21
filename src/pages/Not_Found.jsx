import React from 'react'
import { useLocation } from 'react-router-dom'

const Not_Found = () => {
    const {pathname} = useLocation();
  return (
    <div>
        <h2>¿Acaso Intenas Buscar Algo?</h2>
        <p>Not found {pathname}</p>
    </div>
  )
}

export default Not_Found