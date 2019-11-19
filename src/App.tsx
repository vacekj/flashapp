import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.module.css";

import Navbar from "./Components/Navbar";
import Review from "./Components/Review";
import Add from "./Components/Add";
import BottomBar from "./Components/BottomBar";
import Home from "./Components/Home";

export default function App() {
    return (
        <Router basename={process.env.PUBLIC_URL}>
            {/* basename is here so that gh-pages routing works correctly */}
            <div>
                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <Route path="/review">
                        <Review/>
                    </Route>
                    <Route path="/add">
                        <Add/>
                    </Route>
                </Switch>
                <BottomBar/>
            </div>
        </Router>
    );
}
