import React, { useEffect, useState } from 'react';
import { LogIn } from 'lucide-react';
import './LoginForm.css';
import { toast } from 'sonner';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth'
import axiosPrivate from '../../api/axios'

const quotes = [
    "The best time to plant a tree was 20 years ago. The second best time is now.",
    "Do what you can with what you have, where you are.",
    "Dream big, start small, but most of all, start.",
    "The journey of a thousand miles begins with one step"
];

const Login = () => {
    const currentDate = new Date();
    const day = currentDate.toLocaleString('en-US', { weekday: 'short' });
    const date = currentDate.getDate();
    const [quote, setQuote] = useState("");
    const time = currentDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });

    const navigate = useNavigate()
    const location = useLocation()
    const { setUser } = useAuth()
    const from = location.state?.from?.pathname || '/admin'

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const formSubmission = async (e) => {
        e.preventDefault()
        try {
            if (formData.password === '') {
                toast('Please enter the password')
                return
            }
            const response = await axiosPrivate.post('/authenticate',
                { password: formData.password })
            // console.log(response.data)            
            toast.success('Logged in successfully')
            setUser(response.data?.data?.loginToken || null)
            navigate(from, { replace: true })
        } catch (e) {
            // console.log(e)             
            toast.error('Failed to login')
        }
    }


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    useEffect(() => {
        setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, [])

    return (
        <div className="loginContainer">
            <div className="loginInnerContainer">
                <div className="formHeader">
                    <span className="brandName">Chandrababu Gowda</span>
                </div>
                <form className="loginForm" onSubmit={formSubmission}>
                    <h1 className="formTitle">Log in</h1>
                    <div className="inputBlock">
                        <input
                            type="password"
                            name="password"
                            className="input"
                            placeholder="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <p className="forgotPassword">I forgot</p>
                    </div>
                    <button type="submit" className="socialButton">
                        <LogIn size={20} /> Login
                    </button>
                    <p className="legalText">
                        By continuing you are agreeing to all our policies!
                    </p>
                </form>
            </div>

            <div className="rightContainer">
                <div className="eventCard">
                    <div className="eventInnerContainer">
                        <div className="dateInfo">
                            <span className="day">{day}</span>
                            <span className="date">{date}th</span>
                        </div>
                        <div className="eventDetails">
                            <div className="time">{time}</div>
                            <div className="location">
                                Hassan
                            </div>
                        </div>
                        <div className="innerMidCircle"></div>
                    </div>
                </div>
                <div className="innerContainer eventCard">
                    <blockquote>{quote}</blockquote>
                </div>
            </div>
        </div>
    );
};

export default Login;
