import { type FC } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Stack, ThemeProvider } from '@mui/material'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { theme } from "./utils";
import { clientId } from "../Utils/config";
import store from '../Store'
import LoggerProvider from "../Hooks/Logger"
import '../Translations'
import '../index.css'

const TestContainer: FC<WithChildren> = ({ children }) => {
  if (clientId == null) return null
  return <GoogleOAuthProvider clientId={clientId}>
    <Provider store={store}>
      <LoggerProvider>
        <ThemeProvider theme={theme}>
          <Router>
            <Stack
              display='flex'
              width='100vw'
              height='100vh'
            >
              {children}
            </Stack>
          </Router>
        </ThemeProvider>
      </LoggerProvider>
    </Provider>
  </GoogleOAuthProvider>;
}

export default TestContainer