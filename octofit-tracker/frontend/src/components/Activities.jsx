import { useEffect, useState } from 'react'
import { getResourceUrl, normalizeListResponse } from './api'

function Activities() {
  const [activities, setActivities] = useState([])
  const [pageInfo, setPageInfo] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchActivities() {
      try {
        const response = await fetch(getResourceUrl('activities'))
        if (!response.ok) {
          throw new Error(`Failed to load activities: ${response.status}`)
        }
        const json = await response.json()
        const normalized = normalizeListResponse(json)
        setActivities(normalized.items)
        setPageInfo(normalized.pageInfo)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchActivities()
  }, [])

  return (
    <section>
      <h2>Activities</h2>
      {loading && <p>Loading activities…</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <>
          <p>{activities.length} activity records found.</p>
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>User</th>
                <th>Distance</th>
                <th>Duration</th>
                <th>Calories</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, index) => {
                const item = activity || {}
                return (
                  <tr key={index}>
                    <td>{item.type ?? '—'}</td>
                    <td>{String(item.user ?? '—')}</td>
                    <td>{item.distanceKm ?? '—'}</td>
                    <td>{item.durationMinutes ?? '—'}</td>
                    <td>{item.calories ?? '—'}</td>
                    <td>{new Date(String(item.date ?? '')).toLocaleString()}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {pageInfo && <pre className="page-info">{JSON.stringify(pageInfo, null, 2)}</pre>}
        </>
      )}
    </section>
  )
}

export default Activities
