import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import { amber, yellow, purple } from '@material-ui/core/colors';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: yellow,
    secondary: purple,
    info: '',
  },
});

export default theme;
