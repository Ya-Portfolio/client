import React from 'react'
import CustomMenu from './CustomMenu'
import { ChevronDown, ChevronRight } from 'lucide-react'

function Navbar() {
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
        <ul>
          <li className='ebGaramond logoheader'>
            <div className='logo'>
              <div className="border"></div>
              <h1>CG</h1>
              <div className="border"></div>
            </div>
          </li>
          <li>
            <CustomMenu clickHandler={clickHandler} />
          </li>
        </ul>
      </nav>
      <div className={`menuBar ${menuOpen ? '' : 'hidden'}`}>
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