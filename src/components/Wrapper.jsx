import React from "react";

export default function Wrapper({ children }) {
    return (
        <div className='container'>
            {children}
        </div>
    )
}
