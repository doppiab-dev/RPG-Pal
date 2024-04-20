import { defineConfig } from "cypress"
import { config } from 'dotenv'
config()

export default defineConfig({
  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
  env: {
    googleRefreshToken: process.env.REACT_APP_GOOGLE_REFRESH_TOKEN,
    googleClientId: process.env.REACT_APP_CLIENT_ID,
    googleClientSecret: process.env.REACT_APP_GOOGLE_CLIENT_SECRET,
    secretKey: process.env.REACT_APP_SECRET_KEY
  },
  e2e: {
    setupNodeEvents(on, config) {
    },
    experimentalMemoryManagement: true,
    experimentalStudio: true,
    numTestsKeptInMemory: 2,
  },
});
