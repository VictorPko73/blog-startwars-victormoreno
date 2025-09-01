const BASE_URL = "https://www.swapi.tech/api";

// Función para manejar la respuesta y errores
async function handleResponse(response) {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
}


// Servicio para obtener la lista de personajes con todos sus detalles
// La API de SWAPI.tech solo entrega nombre y uid en /people,
// por lo que es necesario hacer una petición adicional por cada personaje para obtener detalles como eye_color, gender, etc.
export const getPeople = async (dispatch) => {
        const response = await fetch(`${BASE_URL}/people`);
        const data = await response.json();
        // Hacemos fetch de los detalles de cada personaje en paralelo
        const peopleWithDetails = await Promise.all(
            data.results.map(async (person) => {
                const detailRes = await fetch(`${BASE_URL}/people/${person.uid}`);
                const detailData = await detailRes.json();
                console.log(detailData);
                // Combinamos los datos básicos con los detalles
                return {
                    ...person,
                    ...detailData.result.properties
                };
            })
        );
        // Guardamos en el store la lista completa con detalles
        dispatch({ 
                type: 'load_people', 
                payload: peopleWithDetails 
        });
}


// Servicio para obtener la lista de vehículos con todos sus detalles
export const getVehicles = async (dispatch) => {
        const response = await fetch(`${BASE_URL}/vehicles`);
        const data = await response.json();
        // Hacemos fetch de los detalles de cada vehículo en paralelo
        const vehiclesWithDetails = await Promise.all(
            data.results.map(async (vehicle) => {
                const detailRes = await fetch(`${BASE_URL}/vehicles/${vehicle.uid}`);
                const detailData = await detailRes.json();
                return {
                    ...vehicle,
                    ...detailData.result.properties
                };
            })
        );
        dispatch({ 
                type: 'load_vehicles', 
                payload: vehiclesWithDetails 
        });
}


// Servicio para obtener la lista de planetas con todos sus detalles
export const getPlanets = async (dispatch) => {
        const response = await fetch(`${BASE_URL}/planets`);
        const data = await response.json();
        // Hacemos fetch de los detalles de cada planeta en paralelo
        const planetsWithDetails = await Promise.all(
            data.results.map(async (planet) => {
                const detailRes = await fetch(`${BASE_URL}/planets/${planet.uid}`);
                const detailData = await detailRes.json();
                return {
                    ...planet,
                    ...detailData.result.properties
                };
            })
        );
        dispatch({ 
                type: 'load_planets', 
                payload: planetsWithDetails 
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




