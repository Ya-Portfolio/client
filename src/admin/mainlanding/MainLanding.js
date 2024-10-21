import React, { useState } from 'react';
import './mainLandingpage.css';
import AdminInternships from '../adminInternship/AdminInternships';
import EducationComponent from './EducationComponent';

function MainLanding() {
    const [name, setName] = useState('John Doe');
    const [about, setAbout] = useState('Software Engineer passionate about building AI-based solutions.');
    const [isEditingProfile, setIsEditingProfile] = useState(false);

    const [education, setEducation] = useState([
        { id: 1, schoolName: 'XYZ University', course: 'BE Computer Science', percentage: '85%', marks: '1700/2000' },
        { id: 2, schoolName: 'ABC School', course: 'SSLC', percentage: '90%', marks: '450/500' },
    ]);
    const [editingEducationId, setEditingEducationId] = useState(null);

    const handleEditProfile = () => setIsEditingProfile(!isEditingProfile);
    const handleSaveProfile = () => setIsEditingProfile(false);

    const handleAddEducation = () => {
        const newEdu = { id: Date.now(), schoolName: '', course: '', percentage: '', marks: '' };
        setEducation([...education, newEdu]);
        setEditingEducationId(newEdu.id);
    };

    const handleEditEducation = (id) => setEditingEducationId(id);
    const handleDeleteEducation = (id) => setEducation(education.filter(edu => edu.id !== id));
    const handleSaveEducation = (id, updatedEducation) => {
        setEducation(education.map(edu => (edu.id === id ? updatedEducation : edu)));
        setEditingEducationId(null);
    };

    return (
        <div className='adminMainLandingPage'>
            <div className='mainLandingContainer'>
                <div className="profileSection roundedBlock">
                    {isEditingProfile ? (
                        <>
                            <input
                                type="text"
                                value={name}
                                placeholder="Enter your name"
                                onChange={(e) => setName(e.target.value)}
                                className="inputField"
                            />
                            <textarea
                                value={about}
                                placeholder="Write about yourself"
                                onChange={(e) => setAbout(e.target.value)}
                                className="textareaField"
                            />
                            <button className="actionButton" onClick={handleSaveProfile}>Save</button>
                        </>
                    ) : (
                        <>
                            <h2 className="profileName">{name}</h2>
                            <p className="profileAbout">{about}</p>
                            <button className="actionButton" onClick={handleEditProfile}>Edit</button>
                        </>
                    )}
                </div>
                <AdminInternships />
            </div>
            <EducationComponent />
        </div>
    );
}

export default MainLanding;
