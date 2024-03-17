import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { clientId, environment } from './Utils/config'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { GoogleOAuthProvider } from '@react-oauth/google'
import AppRouter from './Controllers/Router'
import LoggerProvider from './Hooks/Logger'
import store from './Store'
import './Translations'
import './index.css'

const rootElement = document.getElementById('root')
if (rootElement !== null) {
  const root = createRoot(rootElement)

  if (clientId === undefined) root.render(null)
  else if (environment === 'DEV') {
    root.render(
      <GoogleOAuthProvider clientId={clientId}>
        <Provider store={store}>
          <LoggerProvider>
            <Router>
              <AppRouter />
            </Router>
          </LoggerProvider>
        </Provider>
      </GoogleOAuthProvider>
    )
  } else {
    root.render(
      <StrictMode>
        <GoogleOAuthProvider clientId={clientId}>
          <Provider store={store}>
            <LoggerProvider>
              <Router>
                <AppRouter />
              </Router>
            </LoggerProvider>
          </Provider>
        </GoogleOAuthProvider>
      </StrictMode>
    )
  }
} else {
  throw new Error('root element id is not in document')
}
