import React from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import './App.css';

import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Review from "./Components/Review";
import Add from "./Components/Add";

export default function App() {
    return (
        <Router>
            <div>
                <Navbar/>
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
            </div>
        </Router>
    );
}
