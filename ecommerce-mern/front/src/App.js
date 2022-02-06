import React from "react";
import Header from "./component/layout/Header/Header";
import Footer from "./component/layout/Footer/Footer";
import { BrowserRouter as Router, Route } from "react-router-dom";
import webFont from "webfontloader";
import Home from "./component/Home/Home";
import './App.css';

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
      <Route extact path="/" component={Home} />

      <Footer />
    </Router>
  )
}

export default App;
