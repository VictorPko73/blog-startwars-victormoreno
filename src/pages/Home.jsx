
import { Image, useEffect } from "react";

import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

import {
  getPeople,
  getVehicles,
  getPlanets,
} from "../sevices/starsWarsServices.js";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    const loadPepole = async () => {
      try {
        await getPeople(dispatch);
      } catch (error) {
        console.error("Error fetching people:", error);
      }
    };
    loadPepole();

    const loadVehicles = async () => {
      try {
        await getVehicles(dispatch);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };
    loadVehicles();

    const loadPlanets = async () => {
      try {
        await getPlanets(dispatch);
      } catch (error) {
        console.error("Error fetching planets:", error);
      }
    };
    loadPlanets();
  }, [dispatch]);

  return (
    <div className="text-center mt-5">
      {/* Sección de personajes (People) en carrusel horizontal */}
      <div className="container my-4">
        <h2>People</h2>
        {/* Carrusel horizontal con scroll */}
        <div
          className="d-flex flex-row gap-3 overflow-auto pb-3"
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {store.people && store.people.length > 0 ? (
            store.people.map((person, index) => (
              <div
                className="card h-100"
                key={index}
                style={{
                  minWidth: "18rem",
                  maxWidth: "18rem",
                  scrollSnapAlign: "start",
                }}
              >
                {/* Imagen del personaje (usando visualguide) */}
                <img
                  src={``}
                  className="card-img-top"
                  alt={person.name}
                  style={{ height: "200px", objectFit: "cover" }}
                  onError={(e) =>
                    (e.target.src =
                      "")
                  }
                />
                <div className="card-body">
                  <h5 className="card-title">{person.name}</h5>
                  {/* Aquí podrías mostrar más info si la tienes en el store */}
                  <p className="card-text">ID: {person.uid}</p>
                  {/* Botón para ver detalles (debería llevar a /single/:theId) */}
                  <a
                    href={`/single/${person.uid}`}
                    className="btn btn-primary me-2"
                  >
                    Learn more!
                  </a>
                  {/* Botón para añadir a favoritos */}
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      dispatch({ type: "add_favorite", payload: person })
                    }
                    title="Añadir a favoritos"
                  >
                    <i className="fa fa-heart"></i>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center w-100">Cargando...</div>
          )}
        </div>
      </div>

	     {/* DESDE AQUIIIIIIIIIIIIIIIIIIII */}
      <div className="container my-4">
        <h2>Vehicles</h2>
        {/* Carrusel horizontal con scroll */}
        <div
          className="d-flex flex-row gap-3 overflow-auto pb-3"
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {store.vehicles && store.vehicles.length > 0 ? (
            store.vehicles.map((vehicles, index) => (
              <div
                className="card h-100"
                key={index}
                style={{
                  minWidth: "18rem",
                  maxWidth: "18rem",
                  scrollSnapAlign: "start",
                }}
              >
                {/* Imagen del personaje (usando visualguide) */}
                <img
                  src={``}
                  className="card-img-top"
                  alt={vehicles.name}
                  style={{ height: "200px", objectFit: "cover" }}
                  onError={(e) =>
                    (e.target.src =
                      "")
                  }
                />
                <div className="card-body">
                  <h5 className="card-title">{vehicles.name}</h5>
                  {/* Aquí podrías mostrar más info si la tienes en el store */}
                  <p className="card-text">ID: {vehicles.uid}</p>
                  {/* Botón para ver detalles (debería llevar a /single/:theId) */}
                  <a
                    href={`/single/${vehicles.uid}`}
                    className="btn btn-primary me-2"
                  >
                    Learn more!
                  </a>
                  {/* Botón para añadir a favoritos */}
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      dispatch({ type: "add_favorite", payload: vehicle })
                    }
                    title="Añadir a favoritos"
                  >
                    <i className="fa fa-heart"></i>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center w-100">Cargando...</div>
          )}
        </div>
      </div>

         {/* DESDE AQUIIIIIIIIIIIIIIIIIIII */}
      <div className="container my-4">
        <h2>Planets</h2>
        {/* Carrusel horizontal con scroll */}
        <div
          className="d-flex flex-row gap-3 overflow-auto pb-3"
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {store.planets && store.planets.length > 0 ? (
            store.planets.map((planets, index) => (
              <div
                className="card h-100"
                key={index}
                style={{
                  minWidth: "18rem",
                  maxWidth: "18rem",
                  scrollSnapAlign: "start",
                }}
              >
                {/* Imagen del personaje (usando visualguide) */}
                <img
                  src={``}
                  className="card-img-top"
                  alt={planets.name}
                  style={{ height: "200px", objectFit: "cover" }}
                  onError={(e) =>
                    (e.target.src =
                      "")
                  }
                />
                <div className="card-body">
                  <h5 className="card-title">{planets.name}</h5>
                  {/* Aquí podrías mostrar más info si la tienes en el store */}
                  <p className="card-text">ID: {planets.uid}</p>
                  {/* Botón para ver detalles (debería llevar a /single/:theId) */}
                  <a
                    href={`/single/${planets.uid}`}
                    className="btn btn-primary me-2"
                  >
                    Learn more!
                  </a>
                  {/* Botón para añadir a favoritos */}
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      dispatch({ type: "add_favorite", payload: planets })
                    }
                    title="Añadir a favoritos"
                  >
                    <i className="fa fa-heart"></i>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center w-100">Cargando...</div>
          )}
        </div>
      </div>

    </div>
  );
};
