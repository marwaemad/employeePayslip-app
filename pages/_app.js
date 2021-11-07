import '../styles/globals.css'
import "bootstrap/dist/css/bootstrap.min.css";
import AppContext from "../AppContext";
import { useState } from "react";
function MyApp({ Component, pageProps }) {
  const [employeeData, setEmplyeeData] = useState({ name: 'marwa' });
  const [resultEmployeeData, setResultEmplyeeData] = useState({ name: 'marwa' });
  return (<AppContext.Provider value={{
    state: {
      employeeData: employeeData,
      resultEmployeeData: resultEmployeeData
    },
    setEmplyeeData: setEmplyeeData,
    setResultEmplyeeData: setResultEmplyeeData
  }}><Component {...pageProps} /></AppContext.Provider>)
}

export default MyApp
