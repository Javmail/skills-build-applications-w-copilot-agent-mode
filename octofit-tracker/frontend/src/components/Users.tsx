import { useEffect, useState } from 'react'
import { getResourceUrl, normalizeListResponse } from './api'

function Users() {
  const [users, setUsers] = useState<unknown[]>([])
  const [pageInfo, setPageInfo] = useState<unknown | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch(getResourceUrl('users'))
        if (!response.ok) {
          throw new Error(`Failed to load users: ${response.status}`)
        }
        const json = await response.json()
        const normalized = normalizeListResponse(json)
        setUsers(normalized.items)
        setPageInfo(normalized.pageInfo)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  return (
    <section>
      <h2>Users</h2>
      {loading && <p>Loading users…</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <>
          <p>{users.length} user records found.</p>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Team</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                const item = user as Record<string, unknown>
                return (
                  <tr key={index}>
                    <td>{item.name as string ?? '—'}</td>
                    <td>{item.email as string ?? '—'}</td>
                    <td>{item.role as string ?? '—'}</td>
                    <td>{String(item.team ?? '—')}</td>
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

export default Users
