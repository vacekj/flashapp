import React from "react";
import Select from "@material-ui/core/Select";
import Topbar from "../Topbar";
import styles from "./Add.module.css";
import { Deck } from "../../Lib/Storage";
import { InputLabel } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

interface Props {
    decks: Deck[];
}

export default function Add(props: Props) {
    return (
        <div className={styles.addContainer}>
            <Topbar>Add cards</Topbar>
            <div className={styles.addView}>
                <FormControl className={styles.deckSelectContainer}>
                    <InputLabel  shrink id="demo-simple-select-label">
                        Deck
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        className={styles.deckSelectText}
                        displayEmpty={true}
                        autoWidth={true}
                        defaultValue={""}
                    >
                        <MenuItem value="" disabled>
                            Select a deck
                        </MenuItem>
                        {props.decks.map(deck => {
                            return (
                                <MenuItem value={deck.id.toString()} key={deck.id}>{deck.name}</MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
            </div>
        </div>
    );
}
