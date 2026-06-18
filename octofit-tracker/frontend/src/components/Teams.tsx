import { useEffect, useState } from 'react'
import { getResourceUrl, normalizeListResponse } from './api'

function Teams() {
  const [teams, setTeams] = useState<unknown[]>([])
  const [pageInfo, setPageInfo] = useState<unknown | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTeams() {
      try {
        const response = await fetch(getResourceUrl('teams'))
        if (!response.ok) {
          throw new Error(`Failed to load teams: ${response.status}`)
        }
        const json = await response.json()
        const normalized = normalizeListResponse(json)
        setTeams(normalized.items)
        setPageInfo(normalized.pageInfo)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchTeams()
  }, [])

  return (
    <section>
      <h2>Teams</h2>
      {loading && <p>Loading teams…</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <>
          <p>{teams.length} teams found.</p>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Members</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team, index) => {
                const item = team as Record<string, unknown>
                const members = item.members as unknown[] | undefined
                return (
                  <tr key={index}>
                    <td>{item.name as string ?? '—'}</td>
                    <td>{item.description as string ?? '—'}</td>
                    <td>{members ? members.length : '—'}</td>
                    <td>{new Date(String(item.createdAt ?? '')).toLocaleString()}</td>
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

export default Teams
