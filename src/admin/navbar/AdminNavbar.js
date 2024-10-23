import { ChartBar, Contact, File, Home, LogOutIcon, LucideToggleLeft, LucideToggleRight, Newspaper } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggle } from '../../redux/slice'
import './adminNavbar.css'
import { Link } from 'react-router-dom'

function AdminNavbar() {

    const color = useSelector(state => state.color.color)
    const dispatch = useDispatch()
    const [size, setSize] = useState()

    useEffect(() => {
        const handleResize = () => {
            const iconSize = getComputedStyle(document.documentElement).getPropertyValue('--icon-size');
            setSize(iconSize)
        }

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])

    useEffect(() => {
        if (color === "#22303F") {
            document.documentElement.style.setProperty('--bg-color', "#22303F")
            document.documentElement.style.setProperty('--font-color', "#E7E8E7")
            document.documentElement.style.setProperty('--bg-secondary-color', "#8FBFDA")
            document.documentElement.style.setProperty('--font-secondary-color', "#8FBFDA")
            document.documentElement.style.setProperty('--box-shadow-color', "0 2px 12px #8fbfda14")
        }
        else {
            document.documentElement.style.setProperty('--bg-color', "#E7E8E7")
            document.documentElement.style.setProperty('--font-color', "#22303F")
            document.documentElement.style.setProperty('--bg-secondary-color', "#AAAAAA")
            document.documentElement.style.setProperty('--font-secondary-color', "#8FBFDA")
            document.documentElement.style.setProperty('--box-shadow-color', "0 4px 12px rgba(0, 0, 0, 0.1)")
        }
    }, [color])

    return (
        <>
            <ToggleIconForAdmin size={size} />
            <div className="adminNavbar">
                <div className="adminNavbarContent ebGaramond adminNavbarContent1">
                    CG
                </div>
                <div className="adminNavbarContent adminNavbarContent2">
                    <div className="adminNavbarItems">
                        <Link to="/admin" style={{ textDecoration: 'none' }}> <Home size={size} style={{ stroke: color }} /> </Link>
                    </div>
                    <div className="adminNavbarItems">
                        <Link to="/admin/accessories" style={{ textDecoration: 'none' }}> <ChartBar size={size} style={{ stroke: color }} /> </Link>
                    </div>
                    <div className="adminNavbarItems">
                        <Link to="/admin/documents" style={{ textDecoration: 'none' }}> <File size={size} style={{ stroke: color }} /> </Link>
                    </div>
                    <div className="adminNavbarItems">
                        <Link to="/admin/note" style={{ textDecoration: 'none' }}> <Newspaper size={size} style={{ stroke: color }} /> </Link>
                    </div>
                    <div className="adminNavbarItems">
                        <Link to="/admin/email" style={{ textDecoration: 'none' }}> <Contact size={size} style={{ stroke: color }} /> </Link>
                    </div>
                </div>
                <div className="adminNavbarContent adminNavbarContent3">
                    <LogOutIcon size={size} style={{ stroke: color }} />
                </div>
            </div>
        </>
    )
}

export default AdminNavbar

export function ToggleIconForAdmin({ size }) {
    const dispatch = useDispatch()
    const color = useSelector(state => state.color.color)
    return (
        <div className="adminNavbarItems toggleBtn">
            {
                color === '#22303F' ?
                    <LucideToggleRight size={size} style={{ stroke: color === "#22303F" ? '#E7E8E7' : '#22303F' }} onClick={() => dispatch(toggle())} />
                    :
                    <LucideToggleLeft size={size} style={{ stroke: color === "#22303F" ? '#E7E8E7' : '#22303F' }} onClick={() => dispatch(toggle())} />
            }
        </div>
    )
}