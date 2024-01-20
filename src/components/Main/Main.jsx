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

    const onClickClose = () => {
        setModalOpen(false);
        setSelectedTaskId(null)
    }


    // Обновление массива задач
    const updateDataValue = (taskId, { newStatus, newDescription }) => {
        const updatedTasks = tasks.map(task => {
            if (task.id === taskId) {
                return {
                    ...task,
                    ...(newStatus && { status: newStatus }),
                    ...(newDescription && { description: newDescription }),
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
                <Modal tasks={tasks}
                    isModalOpen={isModalOpen}
                    selectedTaskId={selectedTaskId}
                    closeClickHandler={onClickClose}
                    updateTaskDescription={updateDataValue}
                />
            </div>
        </main >
    )
}
