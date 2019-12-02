import React from "react";

import { Form, Input, Select } from "antd";

import Topbar from "../Topbar";
import styles from "./Add.module.css";
import { Deck } from "../../Lib/Storage";

const { TextArea } = Input;
const { Option } = Select;

interface Props {
    decks: Deck[];
}

export default function Add(props: Props) {
    return (
        <div className={styles.addContainer}>
            <Topbar>Add cards</Topbar>
            <div className={styles.addView}>
                <Form>
                    <div className={styles.deckSelect}>
                        Deck:
                        <Select placeholder={"Select a deck"}>
                            {props.decks.map(deck => {
                                return (
                                    <Option value={deck.id.toString()} key={deck.id}>
                                        {deck.name}
                                    </Option>
                                );
                            })}
                        </Select>
                    </div>
                    <div className={styles.cardFields}>
                        {/* TODO: tady udělat kartu stejně jako při review,
                        možná rozdělenou čarou na front/back,
                        nebo dvě karty*/}
                        <TextArea placeholder={"Front"} id={"front"}/>
                        <TextArea placeholder={"Back"} id={"back"}/>
                    </div>
                </Form>
            </div>
        </div>
    );
}
