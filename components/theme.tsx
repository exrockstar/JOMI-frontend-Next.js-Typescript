import { createTheme, PaletteOptions } from '@mui/material/styles'
import colors from 'tailwindcss/colors'
const basePalette: PaletteOptions = {
  background: {
    default: '#18181B'
  },
  primary: {
    main: '#000000',
    contrastText: '#ffffff'
  },
  neutral: {
    main: '#64748B',
    contrastText: '#fff'
  },
  secondary: {
    main: '#fff',
    contrastText: '#000000 '
  },
  success: {
    main: '#2CB673',
    dark: '#2B9C65',
    light: '#31cb80',
    contrastText: 'rgba(255,255,255,.87)'
  },
  header: {
    main: '#121212',
    contrastText: '#ffffff'
  },
  google: {
    main: '#db3236',
    contrastText: '#ffffff'
  },
  facebook: {
    main: '#3b5998',
    contrastText: '#ffffff'
  },
  linkedin: {
    main: '#0077b5',
    contrastText: '#ffffff'
  },
  linkblue: {
    main: '#337ab7',
    dark: '#23527c'
  },

  grey: {
    50: colors.zinc[50],
    100: colors.zinc[100],
    200: colors.zinc[200],
    300: colors.zinc[300],
    400: colors.zinc[400],
    500: colors.zinc[500],
    600: colors.zinc[600],
    700: colors.zinc[700],
    800: colors.zinc[800],
    900: colors.zinc[900]
  }
}

// theme inside article / pages
export const defaultTheme = createTheme({
  typography: {
    fontSize: 14
  },
  palette: {
    ...basePalette
  },
  zIndex: {
    snackbar: 2000
  },
  components: {
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: 0
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 400
        }
      }
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none'
        }
      }
    }
  }
})

// most of the colors are based on tailwindCSS colors
export const frontPageTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1280,
      xl: 1440
    }
  },
  palette: {
    ...basePalette,
    header: {
      main: colors.zinc[800],
      light: '#27272a8c',
      contrastText: colors.zinc[50]
    },
    primary: {
      main: '#4F46E5',
      contrastText: colors.white
    },
    neutral: {
      main: '#64748B',
      contrastText: colors.white
    },
    secondary: {
      main: colors.zinc[50],
      contrastText: colors.zinc[800]
    },
    background: {
      default: '#18181B',
      paper: colors.zinc[800]
    },
    text: {
      primary: colors.zinc[50],
      secondary: colors.zinc[400]
    },
    grey: {
      50: colors.zinc[50],
      100: colors.zinc[100],
      200: colors.zinc[200],
      300: colors.zinc[300],
      400: colors.zinc[400],
      500: colors.zinc[500],
      600: colors.zinc[600],
      700: colors.zinc[700],
      800: colors.zinc[800],
      900: colors.zinc[900]
    },
    divider: colors.zinc[600],
    mode: 'dark'
  },
  zIndex: {
    snackbar: 1400
  },
  typography: {
    fontFamily: 'Manrope, Arial, Helvetica, sans-serif;',
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      lineHeight: 1.375, //137.5%
      '@media (max-width:600px)': {
        fontSize: '2.5rem',
        lineHeight: 1.25
      }
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2, //120%
      '@media (max-width:600px)': {
        fontSize: '1.25rem',
        lineHeight: 1.0
      }
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: 1.0, //100%
      '@media (max-width:600px)': {
        fontSize: '1.125rem',
        lineHeight: 1.0
      }
    },
    h4: {
      fontFamily: 'DM Sans, Arial, Helvetica, sans-serif;',
      fontSize: '1.25rem',
      lineHeight: 1.0,
      fontWeight: 700,
      '@media (max-width:600px)': {
        fontSize: '1rem',
        lineHeight: 1.375
      }
    },
    h5: {
      fontSize: '1rem',
      lineHeight: 1.375,
      fontWeight: 700
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5
    },
    body2: {
      fontSize: '.875rem',
      lineHeight: 1.5,
      fontWeight: 400
    },
    // h6: {
    //   fontSize: '0.8rem',
    //   '@media (max-width:800px)': {
    //     fontSize: '0.5rem'
    //   }
    // },
    caption: {
      fontSize: '.75rem',
      lineHeight: 1.25
    },
    overline: {
      lineHeight: 'normal'
    }
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: colors.zinc[50]
        }
      }
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: colors.zinc[400],
          transition: '.1s all ease-in-out',
          textDecoration: 'none',
          ':hover': {
            color: colors.white,
            textDecoration: 'underline'
          }
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none'
        }
      }
    }
  }
})
