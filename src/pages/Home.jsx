


import { Image, useEffect } from "react";
import { Link } from "react-router-dom";


import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

// Funciones para localStorage favoritos
const getFavoritesFromLocalStorage = () => {
  const favs = localStorage.getItem("favorites");
  return favs ? JSON.parse(favs) : [];
};

const saveFavoritesToLocalStorage = (favorites) => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
};

import {
  getPeople,
  getVehicles,
  getPlanets,} from "../sevices/starsWarsServices.js";

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

  // Añadir a favoritos en localStorage
  const addFavoriteLocal = (item) => {
    const favs = getFavoritesFromLocalStorage();
    // Evitar duplicados por uid
    if (!favs.some(f => f.uid === item.uid)) {
      favs.push(item);
      saveFavoritesToLocalStorage(favs);
      // Disparar evento para sincronizar Navbar
      window.dispatchEvent(new Event("storage"));
    }
  };

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
                  <p className="card-text mb-1">Eye-Color: {person.eye_color}</p>
                  <p className="card-text">Hair_Color: {person.hair_color}</p>
                  {/* Botón para ver detalles (debería llevar a /single/:theId) */}
                  {/* Usar Link para navegación SPA, no <a> */}
                  <Link
                    to={`/person/${person.uid}`}
                    className="btn btn-primary me-2"
                  >
                    Learn more!
                  </Link>
                  {/* Botón para añadir a favoritos */}
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => addFavoriteLocal(person)}
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
                  <p className="card-text">Model: {vehicles.model}</p>
                  {/* Botón para ver detalles (debería llevar a /single/:theId) */}
                  <Link
                    to={`/vehicles/${vehicles.uid}`}
                    className="btn btn-primary me-2"
                  >
                    Learn more!
                  </Link>
                  {/* Botón para añadir a favoritos */}
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => addFavoriteLocal(vehicles)}
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
                  
                  <p className="card-text mb-1" >Climate: {planets.climate}</p>
                  <p className="card-text ">Terrain: {planets.terrain}</p>
                 
                  <Link
                    to={`/planets/${planets.uid}`}
                    className="btn btn-primary me-2"
                  >
                    Learn more!
                  </Link>
                  {/* Botón para añadir a favoritos */}
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => addFavoriteLocal(planets)}
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
