import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getConfig = () => {
  return {
    headers: { Authorization: token },
  }
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newBlog) => {
  const response = await axios.post(baseUrl, newBlog, getConfig())
  return response.data
}

const deleteById = async (blogId) => {
  try {
    await axios.delete(`${baseUrl}/${blogId}`, getConfig())
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

const put = async (blog) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, getConfig())
  return response.data
}

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

export default { getAll, create, deleteById, put, setToken }
