"use client";
import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export enum ThemeMode {
  Light = "light",
  Dark = "dark",
}

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ccc", // ChatGPT's primary color
    },
    secondary: {
      main: "#ccc",
    },
    background: {
      default: "#202123",
      paper: "#16171a",
      //paper: "#0c101a"
      //paper: "#181e43",

    },
    success: {
      light: '#6AD01F',
      main: '#41881a',
      dark: '#41881a',
      contrastText: '#FFF'
    },
    grey: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
      A100: '#D5D5D5',
      A200: '#AAAAAA',
      A400: '#616161',
      A700: '#303030'
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            color: "#ccc",
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        root: {
          '& .MuiMenu-paper': {
            borderRadius: 5,
          }
        }
      }
    },
  },
  
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#000",
      light: "#ccc" 
    },
    secondary: {
      main: "#808080",
    },
    background: {
      paper: '#e6e6e6',
      default: '#f7f7f7'
    },
    success: {
      light: '#6AD01F',
      main: '#41881a',
      dark: '#41881a',
      contrastText: '#FFF'
    },
    grey: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#d8d8d8',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
      A100: '#D5D5D5',
      A200: '#AAAAAA',
      A400: '#616161',
      A700: '#303030'
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export { darkTheme, lightTheme };
