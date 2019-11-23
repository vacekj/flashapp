import React, { Component } from "react";
import Home from "./Components/Home";
import BottomBar from "./Components/BottomBar";
import Add from "./Components/Add";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.module.css";
import Review from "./Components/Review";
import { Deck, getDecks, seedDatabase } from "./Lib/Storage";

interface State {
    decks: Deck[]
}

export default class App extends Component<{}, State> {
    constructor(props: any) {
        super(props);
        this.state = { decks: [] };
    }

    componentDidMount() {
        seedDatabase().then(async () => {
            const decks = await getDecks();
            this.setState({
                decks: decks
            });
        });
    }

    render() {
        return (
            <Router basename={process.env.PUBLIC_URL}>
                {/* basename is here so that gh-pages routing works correctly */}
                <div>
                    <Switch>
                        <Route exact path="/">
                            <Home decks={this.state.decks}/>
                        </Route>
                        <Route path="/decks/:id" children={(props: { match: { params: { id: number } } }) => {
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
}
