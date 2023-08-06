import '@/styles/globals.css'
import type { AppProps } from 'next/app';
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';





export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return(<div> 
    <Component {...pageProps} />
    <ToastContainer />
   
   
  </div>
  )
}
