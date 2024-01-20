import React, { useState } from "react";
import { TASK_LENGTH } from "../../settings";

export default function NewTask({ status, onNewTaskClick }) {
    const [newTaskName, setNewTaskName] = useState("");

    // Активируем компонент тольько для блока Backlog
    if (status !== 'Backlog') {
        return null;
    }

    const newTaskHandler = () => {
        onNewTaskClick(newTaskName);
    }

    // Валидация длинны названия задачи 
    const isSubmitDisabled = newTaskName.length < TASK_LENGTH;

    return (
        <>
            <input className="new-task" type='text' placeholder='Введите название задачи' value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}></input>

            <button className="card-btn submit-btn"
                disabled={isSubmitDisabled}
                onClick={newTaskHandler}>Submit</button>
        </>
    )
}
