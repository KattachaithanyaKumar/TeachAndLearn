import App from './App'
import { AuthProvider } from './context/AuthContext'
import './styles/global.css'

/** Admin SPA root for embedding (no Router). Standalone `main.tsx` wraps this in `BrowserRouter`. */
export default function AdminModule() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  )
}
