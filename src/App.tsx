import './App.css'
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Routes from './app/router'

const theme = createTheme({
  typography: {
      fontFamily: ['Montserrat'].join(',')
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
    <Routes />
   </ThemeProvider>
  )
}

export default App
