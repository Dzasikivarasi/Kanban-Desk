import React, { useState } from "react";
import AddButton from "./AddButton";
import NewTask from "./NewTask";
import SelectTask from "./SelectTask";
import { EMPTY_TASK_LIST_MESSAGE, EMPTY_DESCRIPTION_MESSAGE } from "../../settings";


export default function Cards({ tasks, STATUS_ITEMS, onCardTaskClick, updateTasksArray, updateData }) {
    const [isNewTaskInputActive, setNewTaskInputActive] = useState(false);
    const [isSelectInputActive, setSelectInputActive] = useState(false);
    const [currentStatus, setCurrentStatus] = useState(null);
    const isAddButtonVisible = (status) => currentStatus !== status;
    const isSelectVisible = (status) => status !== 'Backlog' ? currentStatus === status : false;


    // Логика работы кнопки AddButton
    // Управление атрибутом disabled
    const getPreviousStatus = (status) => {
        const statusIndex = STATUS_ITEMS.indexOf(status);
        return statusIndex > 0 ? STATUS_ITEMS[statusIndex - 1] : null;
    };

    const isAddButtonDisabled = (status) => {
        const previousStatus = getPreviousStatus(status);
        const tasksForPreviousStatus = tasks.filter(task => task.status === previousStatus);
        return status !== 'Backlog' && tasksForPreviousStatus.length === 0;
    };

    // Управление видимостью кнопки
    const hideAddButton = (status) => {
        setCurrentStatus(status)
    }


    // Модально окно
    // Открытие модального окна при клике на задачу
    const handleCardTask = (id) => {
        onCardTaskClick(id)
    }


    // Логика работы с задачами
    // Управление видимостью инпута новой задачи
    const openNewTaskInput = () => {
        setNewTaskInputActive(true);
    }

    // Отрисовка новой задачи, обновление массива tasks, закрытие инпута, обнуление активной кнопки AddButton
    const renderNewTask = (newTaskName) => {
        const maxId = tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) : 0;
        const newTask = {
            id: maxId + 1,
            task: newTaskName,
            description: EMPTY_DESCRIPTION_MESSAGE,
            status: "Backlog",
        }
        const newTasks = [...tasks, newTask];
        updateTasksArray(newTasks);
        setNewTaskInputActive(false);
        setCurrentStatus(null);
    }

    // Обновление блока (status) задачи при переносе
    const updateTaskStatus = (taskId, newStatus) => {
        updateData(taskId, { newStatus: newStatus })
        setSelectInputActive(false);
        setCurrentStatus(null);
    }

    // Удаление задачи из списка
    const handleTaskClose = (id) => {
        const updatedTasks = tasks.filter(task => task.id !== id);
        updateTasksArray(updatedTasks);
    }

    // Управление состоянием селекта выбора существующих задач
    const openTaskSelect = (status) => {
        setSelectInputActive(true);
    }

    // Сброс всех состояний (при переключени кнопок AddButton)
    const resetAllInputs = () => {
        setNewTaskInputActive(false)
        setSelectInputActive(false)
        setCurrentStatus(null)
    }

    const TasksList = STATUS_ITEMS.map((status) => {
        const tasksForStatus = tasks.filter(task => task.status === status);
        return (
            <li className="content_card" key={status}>
                <h2>{status}</h2>
                <ul className="content_card-tasks">
                    {tasksForStatus.length > 0 ? (
                        tasksForStatus.map(({ id, task }) => (
                            <div key={id} className="content_card-tasks-item">
                                <li onClick={() => handleCardTask(id)}>
                                    {task}
                                </li>
                                <button className="task-delete" onClick={() => handleTaskClose(id)}>×</button>
                            </div>
                        ))
                    ) : (
                        <li className="content_card-tasks-empty">{EMPTY_TASK_LIST_MESSAGE}</li>
                    )}

                    {isAddButtonVisible(status) && (
                        <AddButton hideAddButton={hideAddButton}
                            status={status}
                            openTypingInput={openNewTaskInput}
                            openSelectInput={openTaskSelect}
                            resetAllInputs={resetAllInputs}
                            isAddButtonDisabled={isAddButtonDisabled}
                        />
                    )}
                    {isNewTaskInputActive && (
                        <NewTask status={status}
                            onNewTaskClick={renderNewTask}
                        />
                    )}
                    {isSelectInputActive && isSelectVisible(status) && (
                        <SelectTask
                            tasks={tasks}
                            STATUS_ITEMS={STATUS_ITEMS}
                            currentStatus={currentStatus}
                            updateTaskStatus={updateTaskStatus}
                        />
                    )}
                </ul>
            </li>
        );
    });

    return (
        <ul className="content_cards-list">
            {TasksList}
        </ul>
    );
}
