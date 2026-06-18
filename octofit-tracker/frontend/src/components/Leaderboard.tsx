import { useEffect, useState } from 'react'
import { getResourceUrl, normalizeListResponse } from './api'

function Leaderboard() {
  const [entries, setEntries] = useState<unknown[]>([])
  const [pageInfo, setPageInfo] = useState<unknown | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const response = await fetch(getResourceUrl('leaderboard'))
        if (!response.ok) {
          throw new Error(`Failed to load leaderboard: ${response.status}`)
        }
        const json = await response.json()
        const normalized = normalizeListResponse(json)
        setEntries(normalized.items)
        setPageInfo(normalized.pageInfo)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchLeaderboard()
  }, [])

  return (
    <section>
      <h2>Leaderboard</h2>
      {loading && <p>Loading leaderboard…</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <>
          <p>{entries.length} leaderboard entries found.</p>
          <table>
            <thead>
              <tr>
                <th>Entity</th>
                <th>Entity Type</th>
                <th>Rank</th>
                <th>Score</th>
                <th>Category</th>
                <th>Updated</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => {
                const item = entry as Record<string, unknown>
                return (
                  <tr key={index}>
                    <td>{String(item.entityRef ?? '—')}</td>
                    <td>{item.entityType as string ?? '—'}</td>
                    <td>{item.rank as number ?? '—'}</td>
                    <td>{item.score as number ?? '—'}</td>
                    <td>{item.category as string ?? '—'}</td>
                    <td>{new Date(String(item.updatedAt ?? '')).toLocaleString()}</td>
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

export default Leaderboard
