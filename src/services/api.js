import http from '../helpers/http';

const API_VERSION = 'api/v1'

export const fetchList = async () => {
  const URL = '/guest'
  const response = await http.get(`${API_VERSION}${URL}`)

  return response.data;
}

export const setList = async (payload) => {
  const URL = '/guest'
  const response = await http.post(`${API_VERSION}${URL}`, payload)

  return response.data;
}
