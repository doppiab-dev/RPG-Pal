import { createTheme } from "@mui/material"
import { mainColor, secondaryColor } from "../Utils/config"

export const getViewport = () => ({
  width: 1440,
  height: 900
})
export const theme = createTheme({
  palette: {
    primary: {
      main: mainColor
    },
    secondary: {
      main: secondaryColor
    }
  }
})