import React from "react";

export default function Menu({ menuItems = [], isMenuOpen }) {

    const menuList = menuItems.map((item) => (
        <li className="header_dropdown-list-item" key={item}>{item}</li>
    ));

    return (
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" fill="none"
                style={{ transform: isMenuOpen ? "rotate(180deg)" : "rotate(0)" }}>
                <path d="M1.415 0.209991L6 4.79499L10.585 0.209991L12 1.62499L6 7.62499L0 1.62499L1.415 0.209991Z" fill="white" />
            </svg>
            <div className={`header_dropdown ${isMenuOpen ? '' : 'hidden'}`}>
                <ul className="header_dropdown-list">
                    {menuList}
                </ul>
            </div>
        </div>
    )
}
