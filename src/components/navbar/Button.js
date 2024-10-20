import { Moon, Sun } from 'lucide-react';
import React, { useEffect, useState } from 'react';

function Button({ handleToggle }) {
    const [state, setState] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const clickHandler = () => {
        setState(prevState => !prevState);
        handleToggle();
    };

    const handleScroll = () => {
        const scrollY = window.scrollY;
        setIsScrolled(scrollY > 850);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const getIconAndStyle = () => {
        if (state && isScrolled) {
            return { icon: <Sun />, filter: 'invert(1)' };
        } else if (state && !isScrolled) {
            return { icon: <Sun />, filter: 'invert(0)' };
        } else if (!state && isScrolled) {
            return { icon: <Moon />, filter: 'invert(0)' };
        } else {
            return { icon: <Moon />, filter: 'invert(1)' };
        }
    };

    const { icon, filter } = getIconAndStyle();

    return (
        <div
            onClick={clickHandler}
            className="toggleButton"
            style={{
                filter,
                cursor: 'pointer'
            }}
        >
            {icon}
        </div>
    );
}

export default Button;
