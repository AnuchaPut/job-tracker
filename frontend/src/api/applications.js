// All requests to the backend go through here, so if the base URL or auth
// header changes later (Week 5: add JWT), you only update it in one place.

const BASE_URL = 'http://localhost:8080/api/applications'

async function handleResponse(res) {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.message || `Request failed with status ${res.status}`)
  }
  if (res.status === 204) return null // no content, e.g. DELETE
  return res.json()
}

export async function getApplications(status) {
  const url = status ? `${BASE_URL}?status=${status}` : BASE_URL
  const res = await fetch(url)
  return handleResponse(res)
}

export async function getApplication(id) {
  const res = await fetch(`${BASE_URL}/${id}`)
  return handleResponse(res)
}

export async function createApplication(data) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return handleResponse(res)
}

export async function updateApplication(id, data) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return handleResponse(res)
}

export async function deleteApplication(id) {
  const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' })
  return handleResponse(res)
}
