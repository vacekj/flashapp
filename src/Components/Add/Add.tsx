import React from "react";

import { Input, Select } from "antd";

import styles from "./Add.module.css";
import { Deck } from "../../Lib/Storage";

const { TextArea } = Input;
const { Option } = Select;


interface Props {
    decks: Deck[]
}

export default function Add(props: Props) {
    return (
        <div>
            <div className={styles.topbar}>
                Add
            </div>
            <div className={styles.addView}>
                <Select>
                    {props.decks.map((deck) => {
                        return (<Option value={deck.id.toString()}>{deck.name}</Option>);
                    })}
                </Select>
                <TextArea placeholder={"Front"}/>
            </div>
        </div>
    );
}
