import '../styles/globals.css' 
import { Provider } from 'react-redux' 
import { store } from "./../redux/reducers";  
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import {ChakraProvider, StylesProvider} from '@chakra-ui/react'  
import AuthProvider from '../components/authProvider';

// import {extendTheme} from '@ChakraProvider'

function MyApp({ Component, pageProps }) { 
  return (
  <Provider store={store}> 
    <ChakraProvider >  
      <AuthProvider>
        <StylesProvider />
          <Component {...pageProps} /> 
            <ToastContainer/> 
      </AuthProvider>
    </ChakraProvider>
  </Provider>
  ) 
}

export default MyApp
