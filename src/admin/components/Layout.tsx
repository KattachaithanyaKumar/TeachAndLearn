import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { adminPath } from '../utils/adminPath'

const MOBILE_BREAKPOINT = '(max-width: 768px)'
const SIDEBAR_COLLAPSED_KEY = 'teachlearn-admin-sidebar-collapsed'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? 'nav-link active' : 'nav-link'

function readStoredDesktopCollapsed(): boolean {
  try {
    return typeof localStorage !== 'undefined' && localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === '1'
  } catch {
    return false
  }
}

export default function Layout() {
  const { user, logout, refresh } = useAuth()
  const location = useLocation()
  const isMobile = useMediaQuery(MOBILE_BREAKPOINT)
  const [refreshing, setRefreshing] = useState(false)
  const [desktopCollapsed, setDesktopCollapsed] = useState(readStoredDesktopCollapsed)
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)

  useEffect(() => {
    setMobileDrawerOpen(false)
  }, [location.pathname, location.search])

  useEffect(() => {
    if (!isMobile) setMobileDrawerOpen(false)
  }, [isMobile])

  useEffect(() => {
    if (!mobileDrawerOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [mobileDrawerOpen])

  async function handleRefresh() {
    setRefreshing(true)
    try {
      await refresh()
    } finally {
      window.location.reload()
    }
  }

  function toggleMenu() {
    if (isMobile) {
      setMobileDrawerOpen((open) => !open)
    } else {
      setDesktopCollapsed((c) => {
        const next = !c
        try {
          localStorage.setItem(SIDEBAR_COLLAPSED_KEY, next ? '1' : '0')
        } catch {
          /* ignore */
        }
        return next
      })
    }
  }

  const sidebarHiddenAway =
    (isMobile && !mobileDrawerOpen) || (!isMobile && desktopCollapsed)
  const menuExpanded = isMobile ? mobileDrawerOpen : !desktopCollapsed

  const layoutClass = [
    'layout',
    !isMobile && desktopCollapsed && 'layout--sidebar-collapsed',
    isMobile && mobileDrawerOpen && 'layout--mobile-drawer-open',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={layoutClass}>
      {isMobile && mobileDrawerOpen ? (
        <button
          type="button"
          className="sidebar-backdrop"
          aria-label="Close menu"
          onClick={() => setMobileDrawerOpen(false)}
        />
      ) : null}
      <aside
        id="admin-sidebar"
        className="sidebar"
        aria-hidden={sidebarHiddenAway ? true : undefined}
      >
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
            onClick={toggleMenu}
            aria-expanded={menuExpanded}
            aria-controls="admin-sidebar"
          >
            {isMobile ? (mobileDrawerOpen ? 'Close menu' : 'Menu') : desktopCollapsed ? 'Show menu' : 'Hide menu'}
          </button>
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
