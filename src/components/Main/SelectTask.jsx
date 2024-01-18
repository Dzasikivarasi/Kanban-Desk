import React, { useState, useEffect } from "react";

export default function SelectTask({ tasks, STATUS_ITEMS, currentPosition, updateTaskPosition }) {
    const [previousPositionTasks, setPreviousPositionTasks] = useState([]);

    useEffect(() => {
        const getPreviousPositionTasks = () => {
            const currentPositionIndex = STATUS_ITEMS.indexOf(currentPosition);
            const previousPosition = currentPositionIndex > 0 ? STATUS_ITEMS[currentPositionIndex - 1] : null;
            const previousTasks = tasks.filter(task => task.position === previousPosition);
            setPreviousPositionTasks(previousTasks);
        };

        getPreviousPositionTasks();
    }, [currentPosition, tasks, STATUS_ITEMS]);

    const handleTaskSelectClick = (selectedValue) => {
        const selectedTask = tasks.find(task => task.id === Number(selectedValue));
        if (selectedTask) {
            updateTaskPosition(selectedTask.id, currentPosition);
        }
    };

    return (
        <div className="select-wrapper">
            <select className="new-task" value="" title="Выбор задачи" onChange={(e) => handleTaskSelectClick(e.target.value)}>
                <option value="">Выберите задачу</option>
                {previousPositionTasks.map(({ id, task }) => (
                    <option key={id} value={id}>
                        {task}
                    </option>
                ))}
            </select>
        </div>
    );
}
