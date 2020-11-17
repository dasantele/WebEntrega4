import axios from "axios";

const BASE_URL="https://gaymers06.herokuapp.com";

export async function getPublicacionesFromId(id) {
  const query = await axios.get(`${BASE_URL}/publicaciones`);
  let publicaciones = query.data;
  publicaciones = publicaciones.filter(publicacion => publicacion.id_vendedor === id);
  return publicaciones;
}

// This is very bad too c:
export async function register(values){
  const query = await axios.post(`${BASE_URL}/usuarios`,{
    "nombre": values["name"],
    "apellido": values["lastName"],
    "direccion": values["dir"],
    "pais": "Colombia",
    "edad": values["age"],
    "correo": values["email"],
    "contrasenia": values["password"],
    "calificacion": 0,
    "cantidadVentas": 0,
    "publicaciones":[],
    "ventas": [],
    "compras": []
  });
  return query.data;
}