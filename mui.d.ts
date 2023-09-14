import { ButtonProps } from '@mui/material'

declare module '@mui/material/styles' {
  type PaletteAction = {
    active: string
    focus: string
    hover: string
    selected: string
    disabledBackground: string
    disabled: string
  }
  interface Palette {
    neutral: Palette['primary'] | Palette['grey']
    action: PaletteAction
    google: Palette['primary']
    facebook: Palette['primary']
    linkedin: Palette['primary']
    header: Palette['primary']
    linkblue: Pallet['primary']
    apple: Palette['primary']
  }
  interface PaletteOptions {
    neutral?: PaletteOptions['primary'] | Palette['grey']
    action?: PaletteAction
    header?: PaletteOptions['primary']
    google?: PaletteOptions['primary']
    facebook?: PaletteOptions['primary']
    linkedin?: PaletteOptions['primary']
    linkblue?: PaletteOptions['primary']
    apple?: PaletteOptions['primary']
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    neutral: true
    header: true
    google: true
    facebook: true
    linkedin: true
    linkblue: true
    apple: true
  }
}

declare module '@mui/material/AppBar' {
  interface AppBarPropsColorOverrides {
    neutral: true
    header: true
  }
}
