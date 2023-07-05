import axios from 'axios'

export const axiosReq = axios.create({
  baseURL: 'https://reqres.in/api',
})

export const getUsersPage = async (pageParam = 1) => {
  const response = await axiosReq.get(`/users?page=${pageParam}&per_page=1`)
  return response.data
}
