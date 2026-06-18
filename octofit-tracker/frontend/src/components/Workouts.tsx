import { useEffect, useState } from 'react'
import { getResourceUrl, normalizeListResponse } from './api'

function Workouts() {
  const [workouts, setWorkouts] = useState<unknown[]>([])
  const [pageInfo, setPageInfo] = useState<unknown | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchWorkouts() {
      try {
        const response = await fetch(getResourceUrl('workouts'))
        if (!response.ok) {
          throw new Error(`Failed to load workouts: ${response.status}`)
        }
        const json = await response.json()
        const normalized = normalizeListResponse(json)
        setWorkouts(normalized.items)
        setPageInfo(normalized.pageInfo)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchWorkouts()
  }, [])

  return (
    <section>
      <h2>Workouts</h2>
      {loading && <p>Loading workouts…</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <>
          <p>{workouts.length} workout items found.</p>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>User</th>
                <th>Difficulty</th>
                <th>Duration</th>
                <th>Scheduled</th>
                <th>Completed</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout, index) => {
                const item = workout as Record<string, unknown>
                return (
                  <tr key={index}>
                    <td>{item.title as string ?? '—'}</td>
                    <td>{String(item.user ?? '—')}</td>
                    <td>{item.difficulty as string ?? '—'}</td>
                    <td>{item.durationMinutes as number ?? '—'} min</td>
                    <td>{new Date(String(item.scheduledFor ?? '')).toLocaleString()}</td>
                    <td>{item.completed ? 'Yes' : 'No'}</td>
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

export default Workouts
