import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";


export default function Modal({ TASKS, isModalOpen, selectedTaskId, closeClickHandler, updateTaskDescription }) {
    const selectedTask = TASKS.find((item) => item.id === selectedTaskId);
    const [isEditing, setEditing] = useState(false);
    const [editedDescription, setEditedDescription] = useState(isEditing ? selectedTask.description : "");
    const dialog = useRef();

    // Логика открытия окна
    useEffect(() => {
        const currentDialog = dialog.current;

        if (currentDialog) {
            if (isModalOpen) {
                currentDialog.showModal();
            } else {
                currentDialog.close();
            }
        }
    }, [isModalOpen]);

    if (!selectedTask || !isModalOpen) {
        return null;
    }

    // Закрытие окна
    const handleCloseClick = () => {
        closeClickHandler();
        setEditing(false);
    }

    // Логика обновления описания задачи
    const handleDescriptionClick = () => {
        setEditing(true);
        setEditedDescription(selectedTask.description);
    }

    const handleDescriptionChange = (e) => {
        setEditedDescription(e.target.value);
    }

    const handleSaveClick = () => {
        updateTaskDescription(selectedTaskId, { newDescription: editedDescription });
        setEditing(false);
    }

    const handleCancelClick = () => {
        setEditing(false);
        setEditedDescription(isEditing ? selectedTask.description : "");
    }


    return createPortal(
        <dialog className="content_modal" ref={dialog}>
            <div className="content_modal-header">
                <h3>{selectedTask.task}</h3>
                <button className="content_modal-header-close"
                    onClick={() => handleCloseClick()} >
                    <img src="img/close-icon.png" alt="close" />
                </button>
            </div>

            {isEditing ? (
                <>
                    <div className="modal-textarea-container">
                        <textarea className="modal-textarea"
                            value={editedDescription}
                            onChange={handleDescriptionChange}
                        />
                        <button className="modal-cancel" onClick={handleCancelClick}>×</button>
                    </div>
                    <button className="card-btn submit-btn" onClick={handleSaveClick}>Save</button>

                </>
            ) : (
                <p title="Двойной клик для редактирования"
                    onDoubleClick={handleDescriptionClick}
                    className="content_modal-description">{selectedTask.description}</p>
            )}
        </dialog>,
        document.getElementById('modal')
    )
}
