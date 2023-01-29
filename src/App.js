import React from "react";
import { Route,Routes  } from "react-router-dom";

import LandingPage from "./components/LandingPage/LandingPage";
import SuccessPage from "./components/SuccessPage/SuccessPage";
import CancelPage from "./components/CencelPage/CancelPage";

function App() {

  const RouteConponents = [
    { path: `/`, element: <LandingPage /> },
    { path: `/success`, element: <SuccessPage /> },
    { path: `/cancel`, element: <CancelPage /> },
  ];

  return (
    <div style={{backgroundColor:'#041C25'}}>
      <Routes>
      {RouteConponents.map((props) => (
            <Route path={props.path} element={props.element} exact/>
          ))}
      </Routes> 
    </div>
  );
}


export default App;
