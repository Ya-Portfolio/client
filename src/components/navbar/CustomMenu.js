import React from 'react'
import './navbar.css'

function CustomMenu({ clickHandler, color, title }) {
    
    return (
        <div className='customMenu' onClick={clickHandler}>
            <div className={title === 'CG' ? 'menuItemdark' : 'menuItem'}></div>
            <div className={title === 'CG' ? 'menuItemdark' : 'menuItem'}></div>
            <div className={title === 'CG' ? 'menuItemdark' : 'menuItem'}></div>
            <div className={title === 'CG' ? 'menuItemdark' : 'menuItem'}></div>
        </div>
    )
}

export default CustomMenu