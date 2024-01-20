import React from "react";

export default function Tasks({ tasks }) {

    const backlogItems = tasks.filter(task => task.status === 'Backlog');
    const finishedItems = tasks.filter(task => task.status === 'Finished');

    return (
        <div className="footer_tasks">
            <p>Active tasks: <span>{backlogItems.length}</span></p>
            <p>Finished tasks: <span>{finishedItems.length}</span></p>
        </div>
    )
}
