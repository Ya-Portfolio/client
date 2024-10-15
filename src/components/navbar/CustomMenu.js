import React from 'react'
import './navbar.css'

function CustomMenu({ clickHandler }) {
    return (
        <div className='customMenu' onClick={clickHandler}>
            <div className="menuItem menuItem1"></div>
            <div className="menuItem menuItem2"></div>
            <div className="menuItem menuItem3"></div>
            <div className="menuItem menuItem4"></div>
        </div>
    )
}

export default CustomMenu