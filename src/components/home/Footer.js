import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer className='nunito'>
            <div className="footer footer1">
                <span className='ebGaramond'>
                    CG
                </span>
            </div>
            <div className="footer footer2">
                <ul>
                    <li><a href="#projects">Projects</a></li>
                    <li><a href="#achievements">Achievements</a></li>
                    <li><a href="#about">About</a></li>
                    <li><Link to='/contact'>Contact</Link></li>

                </ul>
            </div>
            <div className="footer footer3">
                &copy; 2024 Chandrababu Gowda, All Rights Reserved
            </div>
        </footer>
    )
}

export default Footer