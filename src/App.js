import React from "react";
import { Route,Routes  } from "react-router-dom";

import LandingPage from "./components/LandingPage/LandingPage";
import SuccessPage from "./components/SuccessPage/SuccessPage";
import CancelPage from "./components/CencelPage/CancelPage";

function App() {

  const base_url = process.env.PUBLIC_URL || "env-onboarding-dev";
  
  const RouteConponents = [
    { path: `/env-onboarding-dev/`, element: <LandingPage /> },
    { path: `/env-onboarding-dev/success`, element: <SuccessPage /> },
    { path: `/env-onboarding-dev/cancel`, element: <CancelPage /> },
    { path: `/success`, element: <SuccessPage /> },

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
