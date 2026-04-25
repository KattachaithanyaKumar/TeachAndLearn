import { Helmet } from 'react-helmet-async'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import './styles/global.css'
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'

/** Admin SPA root for embedding (no Router). Standalone `main.tsx` wraps this in `BrowserRouter`. */
export default function AdminModule() {
  return (
    <AuthProvider>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <App />
    </AuthProvider>
  )
}

