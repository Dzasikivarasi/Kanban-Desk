import React, { useState, useEffect } from "react";

export default function SelectTask({ tasks, STATUS_ITEMS, currentStatus, updateTaskStatus }) {
    const [previousStatusTasks, setPreviousStatusTasks] = useState([]);

    useEffect(() => {
        const getPreviouStatusTasks = () => {
            const currentStatusIndex = STATUS_ITEMS.indexOf(currentStatus);
            const previousStatus = currentStatusIndex > 0 ? STATUS_ITEMS[currentStatusIndex - 1] : null;
            const previousTasks = tasks.filter(task => task.status === previousStatus);
            setPreviousStatusTasks(previousTasks);
        };

        getPreviouStatusTasks();
    }, [currentStatus, tasks, STATUS_ITEMS]);

    const handleTaskSelectClick = (selectedValue) => {
        const selectedTask = tasks.find(task => task.id === Number(selectedValue));
        if (selectedTask) {
            updateTaskStatus(selectedTask.id, currentStatus);
        }
    };

    return (
        <div className="select-wrapper">
            <select className="new-task" value="" title="Выбор задачи" onChange={(e) => handleTaskSelectClick(e.target.value)}>
                <option value="">Выберите задачу</option>
                {previousStatusTasks.map(({ id, task }) => (
                    <option key={id} value={id}>
                        {task}
                    </option>
                ))}
            </select>
        </div>
    );
}
