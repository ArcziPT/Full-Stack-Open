import axios from "axios"

const baseUrl = 'http://localhost:3001'

const getAll = () => axios.get(`${baseUrl}/api/persons`).then(response => response.data)

const add = (person) => axios.post(`${baseUrl}/api/persons`, person).then(response => response.data)

const deletePerson = (id) => axios.delete(`${baseUrl}/api/persons/${id}`).then(response => response.data)

const updatePerson = (id, person) => axios.put(`${baseUrl}/api/persons/${id}`, person).then(response => response.data)

export default {getAll, add, deletePerson, updatePerson}
