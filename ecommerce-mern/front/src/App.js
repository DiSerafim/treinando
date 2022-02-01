import React from "react";
import Header from "./component/layout/Header/Header";
import { BrowserRouter as Router } from "react-router-dom";
import webFont from "webfontloader";
import './App.css';

// /* eslint-disable react-hooks/rules-of-hooks */
function App() {
  React.useEffect(() => {
    webFont.load({
      google: {
        families:["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);

  return (
    <Router>
      <Header />
    </Router>
  )
}

export default App;
