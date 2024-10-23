import React, { useState } from 'react';
import './Form.css';
import { toast } from 'sonner';
import axiosPrivate from '../../api/axios';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        brief: '',
        wantGMeet: false,
        date: '',
        time: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        await axiosPrivate.post('/contact', {
            ...formData,
            message: formData.brief,
            meetDate: formData.wantGMeet ? formData.date : null,
            meetTime: formData.wantGMeet ? formData.time : null
        }).then(res => {
            console.log(res)
            toast.info('Check your mail for the confirmation');
        }).catch(e => {
            console.log(e)
            toast.error('Failed to submit the form');
        })
    };

    return (
        <div className="form-container">
            <h2 className='ebGaramond'>Got ideas? We’ve got the skills. Let’s team up.</h2>
            <p className='nunito'>Tell us more about yourself and what you’ve got in mind.</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <textarea
                    name="brief"
                    placeholder="Brief on project"
                    value={formData.brief}
                    onChange={handleChange}
                />
                <div className="checkbox-group">
                    <input
                        type="checkbox"
                        id="wantGMeet"
                        name="wantGMeet"
                        checked={formData.wantGMeet}
                        onChange={handleChange}
                    />
                    <label htmlFor="wantGMeet">Want to have a gmeet?</label>
                </div>
                {
                    formData.wantGMeet && <div className="datetime-group">
                        <input
                            type="text"
                            name="date"
                            placeholder="DD:MM:YYYY"
                            value={formData.date}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="time"
                            placeholder="HH:MM"
                            value={formData.time}
                            onChange={handleChange}
                        />
                    </div>}
                <button type="submit">Let's connect</button>
            </form>
        </div>
    );
};

export default ContactForm;
