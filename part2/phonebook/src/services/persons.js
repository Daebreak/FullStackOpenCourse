import axios from 'axios'

const url = '/api/persons'

const getNumbers = () => {
    const request = axios.get(url)
    return request.then(response => response.data)
}

const addNumber = person => {
    const request = axios.post(url, person)
    return request.then(response => response.data)
}

const updateNumber = (id, newNumber) => {
    const request = axios.put(`${url}/${id}`, newNumber)
    return request.then(response => response.data )
}

const deleteNumber = id => axios.delete(`/api/persons/${id}`)

const phoneServices = { getNumbers, addNumber, deleteNumber, updateNumber }

export default phoneServices