import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createApplication, getApplication, updateApplication } from '../api/applications'

const EMPTY_FORM = {
  company: '',
  role: '',
  status: 'APPLIED',
  dateApplied: '',
  jobUrl: '',
  notes: ''
}

export default function ApplicationForm() {
  const { id } = useParams()
  const isEditing = Boolean(id)
  const navigate = useNavigate()

  const [form, setForm] = useState(EMPTY_FORM)
  const [loading, setLoading] = useState(isEditing)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!isEditing) return
    getApplication(id)
      .then((data) => setForm({ ...EMPTY_FORM, ...data }))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [id, isEditing])

  function handleChange(e) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    try {
      if (isEditing) {
        await updateApplication(id, form)
      } else {
        await createApplication(form)
      }
      navigate('/')
    } catch (err) {
      setError(err.message)
      setSaving(false)
    }
  }

  if (loading) {
    return <p className="max-w-lg mx-auto px-4 py-8 text-gray-500 text-sm">Loading…</p>
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">
        {isEditing ? 'Edit Application' : 'Add Application'}
      </h1>

      {error && (
        <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-md px-3 py-2 mb-4">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
        <Field label="Company">
          <input
            name="company"
            value={form.company}
            onChange={handleChange}
            required
            className="input"
          />
        </Field>

        <Field label="Role">
          <input
            name="role"
            value={form.role}
            onChange={handleChange}
            required
            className="input"
          />
        </Field>

        <Field label="Status">
          <select name="status" value={form.status} onChange={handleChange} className="input">
            <option value="APPLIED">Applied</option>
            <option value="INTERVIEWING">Interviewing</option>
            <option value="OFFER">Offer</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </Field>

        <Field label="Date Applied">
          <input
            type="date"
            name="dateApplied"
            value={form.dateApplied || ''}
            onChange={handleChange}
            className="input"
          />
        </Field>

        <Field label="Job URL">
          <input name="jobUrl" value={form.jobUrl || ''} onChange={handleChange} className="input" />
        </Field>

        <Field label="Notes">
          <textarea
            name="notes"
            value={form.notes || ''}
            onChange={handleChange}
            rows={4}
            className="input"
          />
        </Field>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50"
          >
            {saving ? 'Saving…' : 'Save'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="text-gray-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-gray-700 mb-1">{label}</span>
      {children}
    </label>
  )
}
