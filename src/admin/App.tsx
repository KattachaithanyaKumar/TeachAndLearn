import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import { adminPath } from './utils/adminPath'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import DashboardPage from './pages/DashboardPage'
import FacilitiesPage from './pages/FacilitiesPage'
import FooterSettingsPage from './pages/FooterSettingsPage'
import FranchisePage from './pages/FranchisePage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ServicePagesPage from './pages/ServicePagesPage'
import ServicePageEditor from './pages/ServicePageEditor'
import SubmissionsPage from './pages/SubmissionsPage'
import FranchiseInquiriesPage from './pages/FranchiseInquiriesPage'

/**
 * Paths are relative to the parent `/admin/*` route. Descendant <Routes> match the URL *suffix*
 * (e.g. `/login`, not `/admin/login`); absolute paths here would never match and yield a blank page.
 */
export default function App() {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="submissions" element={<SubmissionsPage />} />
        <Route path="franchise-inquiries" element={<FranchiseInquiriesPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="footer-settings" element={<FooterSettingsPage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="franchise" element={<FranchisePage />} />
        <Route path="facilities" element={<FacilitiesPage />} />
        <Route path="service-pages" element={<ServicePagesPage />} />
        <Route path="service-pages/:id/edit" element={<ServicePageEditor />} />
        <Route path="*" element={<Navigate to={adminPath()} replace />} />
      </Route>
    </Routes>
  )
}
