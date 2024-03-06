import axios from 'axios';

const BASE_URL = '';

//GET listar todos contatos
const listarTodos = async () => {
  try {
    const contatos = [];
    const response = await axios.get(`${BASE_URL}/contatos/data.json`);
    for (key in response.data) {
      contatos.push({ id: key, ...response.data[key] });
    }
    return contatos;
  } catch (error) {
    console.log(error);
  }
};

//GET?id= listar um contato
const listarPeloId = async (id) => {
   try {
     const response = await axios.get(`${BASE_URL}/contatos/data/${id}.json`);
     return {id, ...response.data};
   } catch (error) {
     console.log(error);
   }
}

//POST incluir um contato
const incluir = async (nome, telefone) => {
  try {
    const response = await axios.post(`${BASE_URL}/contatos/data.json`, {
      nome,
      telefone,
    });
    return { id: response.data.name, nome, telefone };
  } catch (error) {
    console.log(error);
  }
};

//PUT alterar um contato
const alterar = async (id, nome, telefone) => {
  try {
    const response = await axios.put(`${BASE_URL}/contatos/data/${id}.json`, {
      nome,
      telefone,
    });
    return { id, ...response.data };
  } catch (error) {
    console.log(error);
  }
};
//DELETE excluir um contato
const excluir = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/contatos/data/${id}.json`);
  } catch (error) {
    console.log(error);
  }
};

export { listarTodos, listarPeloId, incluir, alterar, excluir };
