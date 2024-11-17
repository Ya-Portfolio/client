import React from 'react'
import './StickyMenuBar.css'

function StickyMenuBar({ toggleVisibility }) {
    return (
        <>
            <div className='menuBarAdmin' onClick={toggleVisibility}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className="extraContainer">
            </div>
        </>
    )
}

export default StickyMenuBar