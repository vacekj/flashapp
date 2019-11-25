import React, { Component } from "react";
import Home from "./Components/Home";
import BottomBar from "./Components/BottomBar";
import Add from "./Components/Add";
import "antd/dist/antd.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.module.css";
import Review from "./Components/Review";
import { Deck, getDecks, seedDatabase } from "./Lib/Storage";

import styles from "./App.module.css";

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
                <div className={styles.main}>
                    <Switch>
                        <Route exact path="/">
                            <Home decks={this.state.decks}/>
                        </Route>
                        <Route path="/decks/:id" children={(props: { match: { params: { id: string } } }) => {
                            return <Review deckId={parseInt(props.match.params.id)}/>;
                        }}/>
                        <Route path="/add">
                            <Add decks={this.state.decks}/>
                        </Route>
                        <Route path="/profile">
                            <Add decks={this.state.decks}/>
                        </Route>
                    </Switch>
                    <BottomBar/>
                </div>
            </Router>
        );
    }
}
