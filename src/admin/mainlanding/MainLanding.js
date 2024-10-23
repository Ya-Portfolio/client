import React, { useEffect, useState } from 'react';
import './mainLandingpage.css';
import AdminInternships from '../adminInternship/AdminInternships';
import EducationComponent from './EducationComponent';
import AdminSkills from '../adminSkills/AdminSkills';
import axiosPrivate from '../../api/axios';

function MainLanding() {
    const [name, setName] = useState('');
    const [about, setAbout] = useState('');
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [education, setEducation] = useState([]);
    const [isAddingAchievement, setIsAddingAchievement] = useState(false);
    const handleEditProfile = () => setIsEditingProfile(!isEditingProfile);
    const handleSaveProfile = () => setIsEditingProfile(false);

    const fetchData = async () => {
        try {
            const nameAbout = await axiosPrivate.get('/profile');
            const data = nameAbout.data.data;
            console.log(data)
            setName(data.name);
            setEducation(data.education);

            setAbout(data.about);
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        
        fetchData()
    }, [])

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
                <div className="adminaddbtns">
                    <h2 className={isAddingAchievement ? '' : "nowWorkingOn"} onClick={() => setIsAddingAchievement(false)}>Skills</h2>
                    <h2 className={isAddingAchievement ? "nowWorkingOn" : ""} onClick={() => setIsAddingAchievement(true)}>Achievements</h2>
                </div>
                {
                    isAddingAchievement ? (
                        <AdminInternships />
                    ) : (
                        <AdminSkills />
                    )
                }
            </div>
            <EducationComponent education = {education}/>
        </div>
    );
}

export default MainLanding;
