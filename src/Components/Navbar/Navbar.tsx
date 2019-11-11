import React from 'react';
import {
    Link
} from "react-router-dom";

import "./Navbar.css";

export default function Navbar() {
    return (
        <nav>
            <Link to={"/"}>
                Home
            </Link>
            <Link to={"/review"}>
                Review
            </Link>
            <Link to={"/add"}>
                Add
            </Link>
        </nav>
    );
}
