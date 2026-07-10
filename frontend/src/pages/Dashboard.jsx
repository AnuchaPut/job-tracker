import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getApplications, deleteApplication } from '../api/applications'
import StatusBadge from '../components/StatusBadge'

const STATUS_FILTERS = ['ALL', 'APPLIED', 'INTERVIEWING', 'OFFER', 'REJECTED']

export default function Dashboard() {
  const [applications, setApplications] = useState([])
  const [filter, setFilter] = useState('ALL')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function load() {
    setLoading(true)
    setError(null)
    try {
      const status = filter === 'ALL' ? undefined : filter
      const data = await getApplications(status)
      setApplications(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter])

  async function handleDelete(id) {
    if (!confirm('Delete this application?')) return
    await deleteApplication(id)
    load()
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Job Applications</h1>
        <Link
          to="/new"
          className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          + Add Application
        </Link>
      </div>

      <div className="flex gap-2 mb-6">
        {STATUS_FILTERS.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium ${
              filter === s
                ? 'bg-primary-500 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
            }`}
          >
            {s === 'ALL' ? 'All' : s.charAt(0) + s.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {loading && <p className="text-gray-500 text-sm">Loading…</p>}
      {error && (
        <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-md px-3 py-2">
          Couldn't load applications: {error}
        </p>
      )}

      {!loading && !error && applications.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          <p className="mb-3">No applications yet.</p>
          <Link to="/new" className="text-primary-500 font-medium hover:underline">
            Add your first one
          </Link>
        </div>
      )}

      {!loading && applications.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-left">
              <tr>
                <th className="px-4 py-3 font-medium">Company</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Date Applied</th>
                <th className="px-4 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{app.company}</td>
                  <td className="px-4 py-3 text-gray-600">{app.role}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={app.status} />
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {app.dateApplied || '—'}
                  </td>
                  <td className="px-4 py-3 text-right space-x-3">
                    <Link to={`/edit/${app.id}`} className="text-primary-500 hover:underline">
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(app.id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
