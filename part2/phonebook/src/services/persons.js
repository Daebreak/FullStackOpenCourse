import axios from 'axios'

const url = 'http://localhost:3001/persons'

const getNumbers = () => {
    const request = axios.get(url)
    return request.then(response => response.data)
}

const addNumber = person => {
    const request = axios.post(url, person)
    return request.then(response => response.data)
}

const phoneServices = { getNumbers, addNumber }

export default phoneServices