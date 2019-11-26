import React, { Component } from "react";
import Bottombar from "./Components/Bottombar";
import Add from "./Components/Add";
import "antd/dist/antd.css";

import { BrowserRouter as Router, Route, RouteComponentProps, Switch } from "react-router-dom";
import "./App.module.css";
import Review from "./Components/Review";
import { Deck, getDecks, seedDatabase } from "./Lib/Storage";

import styles from "./App.module.css";
import DecksView from "./Components/DecksView";

interface State {
    decks: Deck[];
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
                        <Route exact path="/" children={
                            (props: RouteComponentProps) => {
                                return (<div>
                                    <DecksView decks={this.state.decks}/>
                                    <Bottombar match={props.match.path}/>
                                </div>);
                            }
                        }/>
                        <Route
                            path="/decks/:id"
                            children={(props: RouteComponentProps & {
                                match: { params: { id: string } };
                            }) => {
                                return (
                                    <div>
                                        <Review
                                            deckId={parseInt(
                                                props.match.params.id
                                            )}
                                        />
                                        <Bottombar match={props.match.path}/>
                                    </div>
                                );
                            }}
                        />
                        <Route path="/add" children={
                            (props: RouteComponentProps) => {
                                return (<div>
                                    <Add decks={this.state.decks}/>
                                    <Bottombar match={props.match.path}/>
                                </div>);
                            }
                        }/>
                        <Route path="/profile" children={
                            (props: RouteComponentProps) => {
                                return (<div>
                                    <Add decks={this.state.decks}/>
                                    <Bottombar match={props.match.path}/>
                                </div>);
                            }
                        }/>
                    </Switch>
                </div>
            </Router>
        );
    }
}
