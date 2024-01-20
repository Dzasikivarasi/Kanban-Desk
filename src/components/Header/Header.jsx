import React from "react";
import Login from "./Login";


export default function Header() {
    return (
        <header className="background-container">
            <div className="header">
                <h1>Awesome Kanban Board</h1>
                <Login />
            </div>
        </header>
    )
}
