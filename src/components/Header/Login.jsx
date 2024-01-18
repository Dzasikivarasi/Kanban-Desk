import React, { useState, useRef } from "react";
import Menu from "./Menu";
import userAvatar from './user-avatar.png';
import { MENU_ITEMS } from "../../data";
import useOutsideClick from "../hooks/useOutsideClick";

export default function Login() {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const loginRef = useRef(null);

    const handleLoginClick = () => {
        setMenuOpen(prev => !prev)
    }

    useOutsideClick(loginRef, () => {
        setMenuOpen(false);
    });

    return (
        <div className="header_login" ref={loginRef} onClick={handleLoginClick}>
            <img src={userAvatar} alt="Личный кабинет" />
            <Menu
                menuItems={MENU_ITEMS}
                isMenuOpen={isMenuOpen}
            />
        </div>
    )
}
