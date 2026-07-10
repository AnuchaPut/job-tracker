const STYLES = {
  APPLIED: 'bg-blue-50 text-status-applied border border-blue-200',
  INTERVIEWING: 'bg-yellow-50 text-status-interviewing border border-yellow-200',
  OFFER: 'bg-green-50 text-status-offer border border-green-200',
  REJECTED: 'bg-red-50 text-status-rejected border border-red-200'
}

const LABELS = {
  APPLIED: 'Applied',
  INTERVIEWING: 'Interviewing',
  OFFER: 'Offer',
  REJECTED: 'Rejected'
}

export default function StatusBadge({ status }) {
  const style = STYLES[status] || 'bg-gray-50 text-gray-600 border border-gray-200'
  const label = LABELS[status] || status

  return (
    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${style}`}>
      {label}
    </span>
  )
}
