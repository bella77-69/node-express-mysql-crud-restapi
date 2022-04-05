import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Add from "./Add";
import Todos from "./Todos";
import './App.css';

function App() {
  return (
    <div>
      <Router>
        <Header />
        <div className="container">
          <Switch>
            <Route path="/" exact component={Todos} />
            <Route path="/todos" exact component={Todos} />
            <Route path="/add-todo" exact component={Add} />
            <Route path="/edit-todo/:id" exact component={Add} />
          </Switch>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
