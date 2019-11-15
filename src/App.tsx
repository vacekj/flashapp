import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.module.css";

import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Review from "./Components/Review";
import Add from "./Components/Add";

export default function App() {
    return (
        <Router basename={process.env.PUBLIC_URL}>
            {/* basename is here so that gh-pages routing works correctly */}
            <div>
                <Navbar/>
                <Switch>
                    <Route exact path="/">
                        <Review/>
                    </Route>
                    <Route path="/review">
                        <Review/>
                    </Route>
                    <Route path="/add">
                        <Add/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}
