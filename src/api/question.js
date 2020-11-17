import axios from "axios";

const BASE_URL = "https://gaymers06.herokuapp.com";

export async function createQuestion(publicacion) {
  await axios.post(`${BASE_URL}/preguntas`, publicacion);
}

export async function getQuestion(id) {
  let query = await axios.get(`${BASE_URL}/preguntas/${id}`);
  return query.data;
}
