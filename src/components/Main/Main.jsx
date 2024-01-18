import React, { useState } from "react";
import Cards from "./Cards";
import Modal from "./Modal";
import { STATUS_ITEMS } from "../../data"

export default function Main({ tasks, updateTasks }) {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState(null);

    // Модально окно
    const openModalHandler = (id) => {
        setModalOpen(true)
        setSelectedTaskId(id);
    }

    const OnClickClose = () => {
        setModalOpen(false);
        setSelectedTaskId(null);
    }


    // Обновление массива задач
    const updateDataValue = (taskId, { newPosition, newDescription }) => {
        const updatedTasks = tasks.map(task => {
            if (task.id === taskId) {
                return {
                    ...task,
                    ...(newPosition !== undefined ? { position: newPosition } : {}),
                    ...(newDescription !== undefined ? { description: newDescription } : {}),
                };
            }
            return task;
        });
        updateTasks(updatedTasks);
    };


    return (
        <main>
            <div className="content">
                <Cards tasks={tasks}
                    STATUS_ITEMS={STATUS_ITEMS}
                    onCardTaskClick={openModalHandler}
                    updateTasksArray={updateTasks}
                    updateData={updateDataValue}
                />

                <Modal TASKS={tasks}
                    isModalOpen={isModalOpen}
                    selectedTaskId={selectedTaskId}
                    closeClickHandler={OnClickClose}
                    updateTaskDescription={updateDataValue}
                />
            </div>

        </main >
    )
}
