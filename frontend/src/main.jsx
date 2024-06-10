import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import App from './App.jsx';
import './index.css';

const theme = extendTheme({
  colors: {
    body: {
      900: "#000",
      800: "#1A202C",
      700: "#2D3748",
    },
    brand: {
      500: "#00A676", // Your primary color
    },
    footer: {
      900: "#2E2532",
      800: "#1A202C",
    },
  },
  config: {
    initialColorMode: "light", // or "dark"
    useSystemColorMode: true,
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.800' : '#fefefb',
      },
    }),
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
);

// color main 1:  F3F8FF
