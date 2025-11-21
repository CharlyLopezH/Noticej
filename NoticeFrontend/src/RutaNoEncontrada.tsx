const RutaNoEncontrada=()=>{


    return (
  <div className="min-vh-100 bg-dark d-flex align-items-center justify-content-center">
    <div className="text-center text-white p-4">
      <div className="mb-4">
        <i className="bi bi-search display-1 text-light opacity-50"></i>
      </div>
      <h1 className="display-3 fw-light mb-3">404</h1>
      <h2 className="h4 text-light-emphasis mb-4">RUTA NO ENCONTRADA</h2>
      <p className="text-light opacity-75 mb-4">
        Error, No existe la URL solicitada
      </p>
      <a href="/" className="btn btn-light btn-lg">
        Volver a Home
      </a>
    </div>
  </div>        
    )
    
}
export default RutaNoEncontrada;