import {
  createTheme as createMuiTheme,
  responsiveFontSizes,
} from '@mui/material/styles';
import lightTheme from './light-theme';

const createThemeCustom = () => {
  return responsiveFontSizes(createMuiTheme(lightTheme));
};

export default createThemeCustom;
