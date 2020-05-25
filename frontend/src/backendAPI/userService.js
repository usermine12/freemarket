import axios from 'axios'

const baseUrl = '/api/users/'

//Returns an access and refresh token if email and password are valid
export const login = async (email, password) => {
  const response = await axios.post(
    '/api/token/',
    {
      email,
      password
    }
  )
  
  if (response.status === 401) {
    throw Error('Invalid Credentials')
  } else {
    return response.data
  }
}

//Returns a list of all users that match the search parameter
export const search = async search => {
  const response = await axios.get(`${baseUrl}/?search=${search}`)
  return response.data.results
}