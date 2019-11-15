import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.module.css";

import Navbar from "./Components/Navbar";
import Review from "./Components/Review";
import Add from "./Components/Add";
import BottomBar from "./Components/BottomBar";

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
                <BottomBar/>
            </div>
        </Router>
    );
}
