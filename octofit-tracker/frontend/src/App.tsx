import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <header className="app-header">
          <div>
            <h1>OctoFit Tracker</h1>
            <p>
              The app uses <code>VITE_CODESPACE_NAME</code> to construct the backend
              API URL for Codespaces deployments.
            </p>
            <p className="note">
              If <code>VITE_CODESPACE_NAME</code> is unset, the app falls back to
              <code>http://localhost:8000/api</code>.
            </p>
          </div>
          <nav>
            <ul>
              <li>
                <Link to="/users">Users</Link>
              </li>
              <li>
                <Link to="/teams">Teams</Link>
              </li>
              <li>
                <Link to="/activities">Activities</Link>
              </li>
              <li>
                <Link to="/workouts">Workouts</Link>
              </li>
              <li>
                <Link to="/leaderboard">Leaderboard</Link>
              </li>
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Users />} />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
