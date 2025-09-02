import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Funciones para localStorage
const getFavoritesFromLocalStorage = () => {
  const favs = localStorage.getItem("favorites");
  return favs ? JSON.parse(favs) : [];
};

const saveFavoritesToLocalStorage = (favorites) => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
};

export const Navbar = () => {
  // Estado local para favoritos
  const [favorites, setFavorites] = useState([]);

  // Leer favoritos al cargar
  useEffect(() => {
    setFavorites(getFavoritesFromLocalStorage());
    // Escuchar cambios en localStorage desde otros componentes
    window.addEventListener("storage", () => {
      setFavorites(getFavoritesFromLocalStorage());
    });
    return () => {
      window.removeEventListener("storage", () => {});
    };
  }, []);

  // Eliminar favorito
  const removeFavorite = (uid) => {
    const newFavs = favorites.filter((item) => item.uid !== uid);
    setFavorites(newFavs);
    saveFavoritesToLocalStorage(newFavs);
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">React Boilerplate</span>
        </Link>
        <div className="ml-auto d-flex align-items-center gap-3">
          
          {/* Dropdown de favoritos */}
          <div className="dropdown">
            <button
              className="btn btn-warning dropdown-toggle"
              type="button"
              id="favoritesDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Favorites <span className="badge bg-dark">{favorites.length}</span>
            </button>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="favoritesDropdown">
              {favorites.length === 0 ? (
                <li className="dropdown-item">(empty)</li>
              ) : (
                favorites.map((item, idx) => (
                  <li className="dropdown-item d-flex justify-content-between align-items-center" key={idx}>
                    <span>{item.name}</span>
                    <button
                      className="btn btn-sm btn-outline-danger ms-2"
                      onClick={() => removeFavorite(item.uid)}
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};