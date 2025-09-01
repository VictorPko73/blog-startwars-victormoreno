export const initialStore=()=>{
  return{
   people: [],
   vehicles: [],
    planets: [],
    favorites: []
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'load_people':
      return {
        ...store,
        people: action.payload
      };
    case 'get_people':
      return store.people; 
      
    case 'load_vehicles':
      return {
        ...store,
        vehicles: action.payload
      };
    case 'load_planets':
      return {
        ...store,
        planets: action.payload
      };
    case 'add_favorite':
      const item = action.payload;
      if(store.favorites.find((fav) => fav.uid === item.id)) return store;
      return {
        ...store,
        favorites: [...store.favorites, item]
      };
    case 'remove_favorite':
      return {
        ...store,
        favorites: store.favorites.filter((fav) => fav.uid !== uid)
      };
    default:
      throw Error('Unknown action.');
  }    
}
