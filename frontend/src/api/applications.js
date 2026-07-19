import { axiosClient } from './axiosClient'

const BASE_URL = `${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/applications`

async function handleResponse(res) {
  return res.data
}

export async function getApplications(status) {
  const url = status ? `${BASE_URL}?status=${status}` : BASE_URL
  const res = await axiosClient.get(url)
  return handleResponse(res)
}

export async function getApplication(id) {
  const res = await axiosClient.get(`${BASE_URL}/${id}`)
  return handleResponse(res)
}

export async function createApplication(data) {
  const res = await axiosClient.post(BASE_URL, data)
  return handleResponse(res)
}

export async function updateApplication(id, data) {
  const res = await axiosClient.put(`${BASE_URL}/${id}`, data)
  return handleResponse(res)
}

export async function deleteApplication(id) {
  const res = await axiosClient.delete(`${BASE_URL}/${id}`)
  return handleResponse(res)
}
