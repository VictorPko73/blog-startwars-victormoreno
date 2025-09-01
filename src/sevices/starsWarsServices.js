const BASE_URL = "https://www.swapi.tech/api";

// Función para manejar la respuesta y errores
async function handleResponse(response) {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
}

export const getPeople = async (dispatch) => {
    const response = await fetch(`${BASE_URL}/people`);
    const data = await response.json();
    console.log(data);
    dispatch({ 
        type: 'load_people', 
        payload: data.results 
    });

}

export const getVehicles = async (dispatch) => {
    const response = await fetch(`${BASE_URL}/vehicles`);
    const data = await response.json();
    console.log(data);
    dispatch({ 
        type: 'load_vehicles', 
        payload: data.results 
    });
}

export const getPlanets = async (dispatch) => {
    const response = await fetch(`${BASE_URL}/planets`);
    const data = await response.json();
    console.log(data);
    dispatch({ 
        type: 'load_planets', 
        payload: data.results 
    });
}

export const addFavorite = async (dispatch, item) => {
    dispatch({ 
        type: 'add_favorite', 
        payload: item 
    });
}

export const removeFavorite = async (dispatch, uid) => {
    dispatch({ 
        type: 'remove_favorite', 
        payload: uid 
    });
}




