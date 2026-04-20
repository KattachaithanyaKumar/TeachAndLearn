import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { adminPath } from '../utils/adminPath'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? 'nav-link active' : 'nav-link'

export default function Layout() {
  const { user, logout, refresh } = useAuth()
  const [refreshing, setRefreshing] = useState(false)

  async function handleRefresh() {
    setRefreshing(true)
    try {
      await refresh()
    } finally {
      window.location.reload()
    }
  }

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="brand">Teach & Learn</div>
        {user ? (
          <div className="sidebar-user muted">
            {user.username}
            <button type="button" className="btn btn-link btn-sm" onClick={() => void logout()}>
              Log out
            </button>
          </div>
        ) : null}
        <nav className="nav">
          <NavLink to={adminPath()} end className={linkClass}>
            Dashboard
          </NavLink>
          <NavLink to={adminPath('submissions')} className={linkClass}>
            Submissions
          </NavLink>
          <NavLink to={adminPath('contact')} className={linkClass}>
            Contact
          </NavLink>
          <NavLink to={adminPath('home')} className={linkClass}>
            Home
          </NavLink>
          <NavLink to={adminPath('about')} className={linkClass}>
            About
          </NavLink>
          <NavLink to={adminPath('franchise')} className={linkClass}>
            Franchise
          </NavLink>
          <NavLink to={adminPath('facilities')} className={linkClass}>
            Facilities
          </NavLink>
          <NavLink to={adminPath('service-listings/child')} className={linkClass}>
            Child service listings
          </NavLink>
          <NavLink to={adminPath('service-listings/adult')} className={linkClass}>
            Adult service listings
          </NavLink>
        </nav>
      </aside>
      <main className="main">
        <div className="main-toolbar">
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            disabled={refreshing}
            onClick={() => void handleRefresh()}
          >
            {refreshing ? 'Refreshing…' : 'Refresh'}
          </button>
        </div>
        <Outlet />
      </main>
    </div>
  )
}
