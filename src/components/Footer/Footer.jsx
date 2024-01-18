import React from "react";
import Tasks from "./Tasks";
import User from "./User";

export default function Footer({ tasks }) {
    return (
        <footer className="background-container">
            <div className="footer">
                <Tasks tasks={tasks} />
                <User />
            </div>
        </footer>
    )
}
