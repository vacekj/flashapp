import React from 'react';
import {
    Link
} from "react-router-dom";

import "./Home.module.css";
import DecksView from "../DecksView";

export default function Home() {
    return (
       <div>
           <DecksView/>
       </div>
    );
}
