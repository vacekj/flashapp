import React from "react";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Divider from "@material-ui/core/Divider";
import Hidden from "@material-ui/core/Hidden";

import Topbar from "../Topbar";
import AddCard from "./AddCard";

import { Deck } from "../../Lib/Storage";

import styles from "./Add.module.css";

import playIcon from "../../assets/play.svg";
import addIcon from "../../assets/plus.svg";

interface Props {
    decks: Deck[];
}

export default function Add(props: Props) {
    return (
        <div className={styles.addContainer}>
            <Topbar>
                <div className={styles.topbarFlex}>
                    <span>Add cards</span>
                    <div className={styles.iconsContainer}>
                        <img src={playIcon} alt="Preview" />
                        <img src={addIcon} alt="Finish adding a card" />
                    </div>
                </div>
            </Topbar>
            <div className={styles.addView}>
                <div className={styles.deckSelectContainer}>
                    <FormControl className={styles.deckSelect}>
                        <InputLabel shrink id="demo-simple-select-label">
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
                                    <MenuItem
                                        value={deck.id.toString()}
                                        key={deck.id}
                                    >
                                        {deck.name}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </div>

                <div className={styles.addCardContainer}>
                    <AddCard placeholder={"Prompt"} />
                    <Hidden smUp={true}>
                        <Divider
                            variant={"middle"}
                            style={{
                                width: "30%"
                            }}
                        />
                    </Hidden>

                    <AddCard placeholder={"Answer"} />
                </div>
            </div>
        </div>
    );
}
