import React from "react";

export default function AddButton({ hideAddButton, status, openTypingInput, openSelectInput, resetAllInputs, isAddButtonDisabled }) {
    const handleAddBtnClick = () => {
        resetAllInputs();
        hideAddButton(status);
        if (status === 'Backlog') {
            openTypingInput();
        } else if (status !== 'Backlog') {
            openSelectInput();
        }
    };

    return (
        <button className='card-btn add-btn'
            onClick={handleAddBtnClick}
            disabled={isAddButtonDisabled(status)}>
            <div className="btn-plus">+</div> Add card
        </button>
    );
}
