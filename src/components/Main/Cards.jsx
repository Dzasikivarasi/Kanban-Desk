import React, { useState } from "react";
import AddButton from "./AddButton";
import NewTask from "./NewTask";
import SelectTask from "./SelectTask";
import { EMPTY_TASK_LIST_MESSAGE, EMPTY_DESCRIPTION_MESSAGE } from "../../settings";


export default function Cards({ tasks, STATUS_ITEMS, onCardTaskClick, updateTasksArray, updateData }) {
    const [isNewTaskInputActive, setNewTaskInputActive] = useState(false);
    const [isSelectInputActive, setSelectInputActive] = useState(false);
    const [currentPosition, setCurrentPosition] = useState(null);
    const isAddButtonVisible = (position) => currentPosition !== position;
    const isSelectVisible = (position) => position !== 'Backlog' ? currentPosition === position : false;


    // Логика работы кнопки AddButton
    // Управление атрибутом disabled
    const getPreviousPosition = (position) => {
        const positionIndex = STATUS_ITEMS.indexOf(position);
        return positionIndex > 0 ? STATUS_ITEMS[positionIndex - 1] : null;
    };

    const isAddButtonDisabled = (position) => {
        const previousPosition = getPreviousPosition(position);
        const tasksForPreviousPosition = tasks.filter(task => task.position === previousPosition);
        return position !== 'Backlog' && tasksForPreviousPosition.length === 0;
    };

    // Управление видимостью кнопки
    const hideAddButton = (position) => {
        setCurrentPosition(position)
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
            position: "Backlog",
        }
        const newTasks = [...tasks, newTask];
        updateTasksArray(newTasks);
        setNewTaskInputActive(false);
        setCurrentPosition(null);
    }

    // Обновление блока (position) задачи при переносе
    const updateTaskPosition = (taskId, newPosition) => {
        updateData(taskId, { newPosition: newPosition })
        setSelectInputActive(false);
        setCurrentPosition(null);
    }

    // Удаление задачи из списка
    const handleTaskClose = (id) => {
        const updatedTasks = tasks.filter(task => task.id !== id);
        updateTasksArray(updatedTasks);
    }

    // Управление состоянием селекта выбора существующих задач
    const openTaskSelect = (position) => {
        setSelectInputActive(true);
    }

    // Сброс всех состояний (при переключени кнопок AddButton)
    const resetAllInputs = () => {
        setNewTaskInputActive(false)
        setSelectInputActive(false)
        setCurrentPosition(null)
    }

    const TasksList = STATUS_ITEMS.map((position) => {
        const tasksForPosition = tasks.filter(task => task.position === position);
        return (
            <li className="content_card" key={position}>
                <h2>{position}</h2>
                <ul className="content_card-tasks">
                    {tasksForPosition.length > 0 ? (
                        tasksForPosition.map(({ id, task }) => (
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

                    {isAddButtonVisible(position) && (
                        <AddButton hideAddButton={hideAddButton}
                            position={position}
                            openTypingInput={openNewTaskInput}
                            openSelectInput={openTaskSelect}
                            resetAllInputs={resetAllInputs}
                            isAddButtonDisabled={isAddButtonDisabled}
                        />
                    )}
                    {isNewTaskInputActive && (
                        <NewTask position={position}
                            onNewTaskClick={renderNewTask}
                        />
                    )}
                    {isSelectInputActive && isSelectVisible(position) && (
                        <SelectTask
                            tasks={tasks}
                            STATUS_ITEMS={STATUS_ITEMS}
                            currentPosition={currentPosition}
                            updateTaskPosition={updateTaskPosition}
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
