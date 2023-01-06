import React, { useState, useEffect } from 'react'
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";

import { Home } from "./components/Home";

import './index.scss'

function App() {
  const [data, setData] = useState(null)

  useEffect(() => {
    callBackendAPI()
        .then(res => setData(res.express))
        .catch(err => console.log(err));
  },[]);

  const callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };

  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}/>
    </Routes>
  </BrowserRouter>;
}

export default App;
