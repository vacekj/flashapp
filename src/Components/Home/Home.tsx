import React from "react";
import "./Home.module.css";
import DecksView from "../DecksView";
import { Deck } from "../../Lib/Storage";

interface Props {
    decks: Deck[]

}

export default function Home(props: Props) {
    return (
       <div>
           <DecksView decks={props.decks}/>
       </div>
    );
}
