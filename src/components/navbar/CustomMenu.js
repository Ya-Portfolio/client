import React from 'react'
import './navbar.css'

function CustomMenu({ clickHandler, color }) {
    console.log(color === 'dark' ? 'menuItemdark' : 'menuItem')
    return (
        <div className='customMenu' onClick={clickHandler}>
            <div className={color === 'dark' ? 'menuItemdark' : 'menuItem'}></div>
            <div className={color === 'dark' ? 'menuItemdark' : 'menuItem'}></div>
            <div className={color === 'dark' ? 'menuItemdark' : 'menuItem'}></div>
            <div className={color === 'dark' ? 'menuItemdark' : 'menuItem'}></div>
        </div>
    )
}

export default CustomMenu