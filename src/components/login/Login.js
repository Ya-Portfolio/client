import React, { useRef } from 'react'
import Navbar from '../navbar/Navbar'
import './LoginForm.css'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import axiosPrivate from '../../api/axios'

function Login() {
    const password = useRef()
    const navigate = useNavigate()

    const formSubmission = async (e) => {
        e.preventDefault()
        try {
            if (!password.current.value) {
                toast('Please enter the password')
                return
            }
            const response = await axiosPrivate.post('/authenticate', { password: password.current.value })
            // console.log(response.data)
            toast.success('Logged in successfully')
            navigate('/admin')

        } catch (e) {
            console.log(e)
            toast.error('Failed to login')
        }
    }
    return (
        <div className='loginContainer'>
            <Navbar title='Chandrababu Gowda' value="Login" />
            <div className="loginContentcontainer">
                <form className='nunito' onSubmit={formSubmission}>
                    {/* <h1 className='ebGaramond'>Login</h1> */}
                    <div className="inputBlock">
                        <input type="password" ref={password} name="password" id="password" placeholder='Password' autoComplete='false' />
                    </div>
                    <div className="inputBlock">
                        <input type="submit" value="Submit" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login