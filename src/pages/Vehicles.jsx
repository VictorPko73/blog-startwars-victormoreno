
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

// Componente de detalle para mostrar la información de un vehiclesaje
export const Vehicles = () => {
  // Obtener el parámetro de la URL (uid del vehiclesaje)
  const { theId } = useParams();

  // Estado local para los datos del vehiclesaje
  const [vehicles, setvehicles] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Efecto para hacer fetch a la API SWAPI.tech y obtener los detalles
  useEffect(() => {
    const fetchvehicles = async () => {
      try {
        setLoading(true);
        setError(null);
        // Petición a la API para obtener los detalles del vehiclesaje
        const res = await fetch(`https://www.swapi.tech/api/vehicles/${theId}`);
        const data = await res.json();
        setvehicles(data.result.properties);
      } catch (err) {
        setError("Error al cargar los datos del vehiclesaje.");
      } finally {
        setLoading(false);
      }
    };
    fetchvehicles();
  }, [theId]);

  // Renderizado condicional según el estado
  if (loading) {
    return <div className="container text-center mt-5">Cargando...</div>;
  }
  if (error) {
    return <div className="container text-center mt-5 text-danger">{error}</div>;
  }
  if (!vehicles) {
    return <div className="container text-center mt-5">No se encontró el vehiclesaje.</div>;
  }

  // Interfaz de detalle estilo demo
  return (
    <div className="container py-5">
      <div className="row align-items-center">
        {/* Imagen del vehiclesaje */}
        <div className="col-md-6 text-center">
          <img
            src={`https://starwars-visualguide.com/assets/img/characters/${theId}.jpg`}
            alt={vehicles.name}
            style={{ width: "100%", maxWidth: "400px", height: "auto", background: "#eee" }}
            onError={e => e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg"}
          />
        </div>
        {/* Info principal */}
        <div className="col-md-6">
          <h1 className="display-4">{vehicles.name}</h1>
          {/* Puedes poner aquí una descripción estática o dinámica si la tienes */}
          <p className="lead">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi.
          </p>
        </div>
      </div>
      {/* Línea separadora */}
      <hr className="my-4" style={{ borderColor: "#e74c3c" }} />
      {/* Datos en formato tabla horizontal */}
      <div className="row text-center text-danger fw-bold" style={{ fontSize: "1.2rem" }}>
        <div className="col">Name<br /><span className="text-dark fw-normal">{vehicles.name}</span></div>
        <div className="col">Model<br /><span className="text-dark fw-normal">{vehicles.model}</span></div>
        <div className="col">Cost in Credits<br /><span className="text-dark fw-normal">{vehicles.cost_in_credits}</span></div>
        <div className="col">Manufacturer<br /><span className="text-dark fw-normal">{vehicles.manufacturer}</span></div>
        <div className="col">Cargo Capacity<br /><span className="text-dark fw-normal">{vehicles.cargo_capcity}</span></div>
        <div className="col">Passenger<br /><span className="text-dark fw-normal">{vehicles.passenger}</span></div>
      </div>
      {/* Botón para volver al home */}
      <div className="mt-4">
        <Link to="/">
          <span className="btn btn-primary btn-lg" role="button">
            Back home
          </span>
        </Link>
      </div>
    </div>
  );
};
