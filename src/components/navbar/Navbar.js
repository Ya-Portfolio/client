import React from 'react'
import CustomMenu from './CustomMenu'
import { ChevronDown, ChevronRight } from 'lucide-react'

function Navbar({ title, color = 'light' }) {
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [isDown, setIsDown] = React.useState(false)
  const clickHandler = () => {
    setMenuOpen(!menuOpen)
  }

  const toggleMode = () => {
    setIsDown(!isDown)
  }

  return (
    <>
      <nav>
        <ul className={color === 'dark' ? '' : 'fixedPos'}>
          <li className='ebGaramond logoheader'>
            <div className='logo'>
              <div className="border"></div>
              <h1>{title}</h1>
              <div className="border"></div>
            </div>
          </li>
          <li>
            <CustomMenu clickHandler={clickHandler} color = {color}/>
          </li>
        </ul>
      </nav>
      <div className={`menuBar nunito ${menuOpen ? '' : 'hidden'}`}>
        <ul>
          <li><span onClick={toggleMode}>{isDown ? <ChevronDown /> : <ChevronRight />}</span> About
            <ul className={`dropdown ${isDown ? 'open' : ''}`}>
              <li>Education</li>
              <li>Skills</li>
              <li>Projects</li>
            </ul>
          </li>
          <li> <span><ChevronRight /></span>Projects</li>
          <li><span><ChevronRight /></span>Contact</li>
        </ul>
      </div>
    </>
  )
}

export default Navbar