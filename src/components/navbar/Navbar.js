import React, { useEffect, useRef, useState } from 'react';
import CustomMenu from './CustomMenu';
import { ChevronDown, ChevronRight } from 'lucide-react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

function Navbar({ title, color = 'light', value, isActive }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [isDown, setIsDown] = React.useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate()


  const clickHandler = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleMode = () => {
    setIsDown(!isDown);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    const handleClickOutside = (event) => {
      if (menuOpen && menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    handleToggle()

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const color = localStorage.getItem('color');
    if (color === 'dark') {
      document.documentElement.style.setProperty('--dark-bg-color', '#22303F');
      document.documentElement.style.setProperty('--light-bg-color', '#E7E8E7');
      document.documentElement.style.setProperty('--dark-font-color', '#8FBFDA');
      document.documentElement.style.setProperty('--light-font-color', '#E7E8E7');
    } else {
      document.documentElement.style.setProperty('--dark-bg-color', '#E7E8E7');
      document.documentElement.style.setProperty('--light-bg-color', '#394A56');
      document.documentElement.style.setProperty('--dark-font-color', '#394A56');
      document.documentElement.style.setProperty('--light-font-color', '#22303F');
    }
  }, []);

  const handleToggle = () => {
    const currentColor = localStorage.getItem('color');

    if (currentColor === 'dark') {
      document.documentElement.style.setProperty('--dark-bg-color', '#E7E8E7');
      document.documentElement.style.setProperty('--light-bg-color', '#394A56');
      document.documentElement.style.setProperty('--dark-font-color', '#394A56');
      document.documentElement.style.setProperty('--light-font-color', '#22303F');
      localStorage.setItem('color', 'light');
    } else {
      document.documentElement.style.setProperty('--dark-bg-color', '#22303F');
      document.documentElement.style.setProperty('--light-bg-color', '#E7E8E7');
      document.documentElement.style.setProperty('--dark-font-color', '#8FBFDA');
      document.documentElement.style.setProperty('--light-font-color', '#E7E8E7');
      localStorage.setItem('color', 'dark');
    }
  };


  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY > 850) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const leftButtonClickHandler = () => {
    navigate('/documents')
  }

  const rightButtonClickHandler = () => {
    navigate('/login')
  }

  // const location = useLocation();

  // const isValid = () => {
  //   console.log(location)
  //   const validRoutes = ['/', '/#projects', '/#achievements', '/#about'];
  //   return validRoutes.includes(location.pathname) || validRoutes.includes(location.pathname + location.hash);
  // };

  return (
    <>
      <nav className={title === 'CG' ? "" : "sticky"}>
        <ul className={color === '' ? '' : 'fixedPos'}>
          <li className='ebGaramond logoheader'>
            <h1 className={isActive ? 'ebGaramond value active' : 'ebGaramond value hidden'}>{value}</h1>
            <div className='logo'>
              <div className="border" onClick={() => leftButtonClickHandler()}></div>
              <h1>{title}</h1>
              <div className="border" onClick={() => rightButtonClickHandler()}></div>
            </div>
          </li>
          <li>
            {<Button handleToggle={handleToggle} />}

            <CustomMenu clickHandler={clickHandler} color={color} title={title} />
          </li>
        </ul>
      </nav>
      <div ref={menuRef} className={`menuBar nunito ${menuOpen ? '' : 'hidden'}`}>
        {isScrolled && <CustomMenu clickHandler={clickHandler} color={color} title={title} />}
        <ul>
          <li>
            <span onClick={toggleMode}>{isDown ? <ChevronDown /> : <ChevronRight />}</span> About
            <ul className={`dropdown ${isDown ? 'open' : ''}`}>
              <li>Education</li>
              <li>Skills</li>
              <li>Projects</li>
            </ul>
          </li>
          <li><span><ChevronRight /></span>Projects</li>
          <li><span><ChevronRight /></span>Contact</li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
