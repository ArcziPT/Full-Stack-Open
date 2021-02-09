import ax from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await ax.get(baseUrl)
    return response.data
}

const create = async (anecdote) => {
    const response = await ax.post(baseUrl, anecdote)
    return response.data
}

const vote = async (anecdote) => {
    const response = await ax.put(`${baseUrl}/${anecdote.id}`, anecdote)
    return response.data
}

export default {getAll, create, vote}