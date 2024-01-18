import React from "react";

export default function AddButton({ hideAddButton, position, openTypingInput, openSelectInput, resetAllInputs, isAddButtonDisabled }) {

    const handleAddBtnClick = () => {
        resetAllInputs();
        hideAddButton(position);
        if (position === 'Backlog') {
            openTypingInput();
        } else if (position !== 'Backlog') {
            openSelectInput();
        }
    };

    return (
        <button className='card-btn add-btn'
            onClick={handleAddBtnClick}
            disabled={isAddButtonDisabled(position)}>
            <div className="btn-plus">+</div> Add card
        </button>
    );
}
