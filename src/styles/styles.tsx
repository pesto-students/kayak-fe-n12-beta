import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { components } from './components';
import { grey, primary } from './themeColors';

const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920
  }
};

let theme = createTheme({
  palette: {
    primary: {
      ...primary,
      main: primary[900]
    },
    secondary: {
      ...grey,
      main: grey[100]
    }
  },
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  components: { ...components },
  breakpoints
});

theme = responsiveFontSizes(theme);

theme.shadows[1] = '0px 1px 3px rgba(3, 0, 71, 0.09)';
theme.shadows[2] = '0px 4px 16px rgba(43, 52, 69, 0.1)';
theme.shadows[3] = '0px 8px 45px rgba(3, 0, 71, 0.09)';
theme.shadows[4] = '0px 0px 28px rgba(3, 0, 71, 0.01)';

export default theme;
