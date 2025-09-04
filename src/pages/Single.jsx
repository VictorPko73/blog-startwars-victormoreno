
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

// Componente de detalle para mostrar la información de un personaje
export const Single = () => {
  // Obtener el parámetro de la URL (uid del personaje)
  const { theId } = useParams();

  // Estado local para los datos del personaje
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Efecto para hacer fetch a la API SWAPI.tech y obtener los detalles
  useEffect(() => {
    const fetchPerson = async () => {
      try {
        setLoading(true);
        setError(null);
        // Petición a la API para obtener los detalles del personaje
        const res = await fetch(`https://www.swapi.tech/api/people/${theId}`);
        const data = await res.json();
        setPerson(data.result.properties);
      } catch (err) {
        setError("Error al cargar los datos del personaje.");
      } finally {
        setLoading(false);
      }
    };
    fetchPerson();
  }, [theId]);

  // Renderizado condicional según el estado
  if (loading) {
    return <div className="container text-center mt-5">Cargando...</div>;
  }
  if (error) {
    return <div className="container text-center mt-5 text-danger">{error}</div>;
  }
  if (!person) {
    return <div className="container text-center mt-5">No se encontró el personaje.</div>;
  }

  // Interfaz de detalle estilo demo
  return (
    <div className="container py-5">
      <div className="row align-items-center">
        {/* Imagen del personaje */}
        <div className="col-md-6 text-center">
          <img
            src={`https://starwars-visualguide.com/assets/img/characters/${theId}.jpg`}
            alt={person.name}
            style={{ width: "100%", maxWidth: "400px", height: "auto", background: "#eee" }}
            onError={e => e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg"}
          />
        </div>
        {/* Info principal */}
        <div className="col-md-6">
          <h1 className="display-4">{person.name}</h1>
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
        <div className="col">Name<br /><span className="text-dark fw-normal">{person.name}</span></div>
        <div className="col">Birth Year<br /><span className="text-dark fw-normal">{person.birth_year}</span></div>
        <div className="col">Gender<br /><span className="text-dark fw-normal">{person.gender}</span></div>
        <div className="col">Height<br /><span className="text-dark fw-normal">{person.height}</span></div>
        <div className="col">Skin Color<br /><span className="text-dark fw-normal">{person.skin_color}</span></div>
        <div className="col">Eye Color<br /><span className="text-dark fw-normal">{person.eye_color}</span></div>
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
