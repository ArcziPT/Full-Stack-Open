import axios from "axios"

const getAll = () => axios.get('http://localhost:3001/persons').then(response => response.data)

const add = (person) => axios.post('http://localhost:3001/persons', person).then(response => response.data)

const deletePerson = (id) => axios.delete(`http://localhost:3001/persons/${id}`).then(response => response.data)

export default {getAll, add, deletePerson}