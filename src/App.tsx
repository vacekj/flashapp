import React from "react";
import Home from "./Components/Home";
import BottomBar from "./Components/BottomBar";
import Add from "./Components/Add";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.module.css";
import Review from "./Components/Review";

export default function App() {
    return (
        <Router basename={process.env.PUBLIC_URL}>
            {/* basename is here so that gh-pages routing works correctly */}
            <div>
                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <Route path="/decks/:id" children={(props: { match: { params: { id: number} } }) => {
                        return <Review deckId={props.match.params.id}/>;
                    }}/>
                    <Route path="/add">
                        <Add/>
                    </Route>
                </Switch>
                <BottomBar/>
            </div>
        </Router>
    );
}
