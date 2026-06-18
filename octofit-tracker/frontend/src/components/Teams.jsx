import { useEffect, useState } from 'react'
import { getResourceUrl, normalizeListResponse } from './api'

function Teams() {
  const [teams, setTeams] = useState([])
  const [pageInfo, setPageInfo] = useState(null)
  const [error, setError] = useState(null)
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
                const item = team || {}
                const members = item.members || []
                return (
                  <tr key={index}>
                    <td>{item.name ?? '—'}</td>
                    <td>{item.description ?? '—'}</td>
                    <td>{members.length}</td>
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
