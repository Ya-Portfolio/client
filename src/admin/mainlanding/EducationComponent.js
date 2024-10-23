import React, { useEffect, useState } from 'react';
import './EducationComponent.css';
import axiosPrivate from '../../api/axios';
import { v4 as uuidV4 } from 'uuid';

function EducationComponent({ education }) {
    const [educationList, setEducationList] = useState([]);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        if (education && education.length > 0) {
            const newEducation = education.map((edu) => {
                return {
                    id: uuidV4(),
                    institution: edu.institution || '',
                    degree: edu.degree || '',
                    grade_main: edu.grade_main || '',
                    grade_details: edu.grade_main || '',
                };
            });
            setEducationList(newEducation);
        }
    }, [education]);

    const handleAddEducation = async () => {
        const newEdu = {
            id: uuidV4(),
            institution: '',
            degree: '',
            grade_main: '',
            grade_details: ''
        };
        const updatedEducationList = [...educationList, newEdu];
        setEducationList(updatedEducationList);
        setEditingId(newEdu.id);

        await saveEducationToDB(updatedEducationList);
    };

    const handleSaveEducation = async () => {
        setEditingId(null);
        await saveEducationToDB(educationList);
    };

    const handleDeleteEducation = async (id) => {
        const updatedEducationList = educationList.filter(edu => edu.id !== id);
        setEducationList(updatedEducationList);
        await saveEducationToDB(updatedEducationList);
    };

    const handleInputChange = (id, field, value) => {
        const updatedList = educationList.map(edu => {
            if (edu.id === id) {
                return { ...edu, [field]: value };
            }
            return edu;
        });
        setEducationList(updatedList);
    };

    const saveEducationToDB = async (updatedEducationList) => {
        try {
            const response = await axiosPrivate.put('/profile', { education: updatedEducationList });
            console.log('Education updated:', response.data);
        } catch (error) {
            console.error('Error updating education:', error);
        }
    };

    return (
        <div className="educationComponent">
            <h2 className="sectionTitle">Education</h2>
            {educationList.map((edu) => (
                <div key={edu.id} className="educationItem">
                    {editingId === edu.id ? (
                        <div className="educationForm">
                            <input
                                type="text"
                                placeholder="School Name"
                                value={edu.institution || ''}
                                onChange={(e) => handleInputChange(edu.id, 'institution', e.target.value)}
                                className="inputField"
                            />
                            <input
                                type="text"
                                placeholder="Course"
                                value={edu.degree || ''}
                                onChange={(e) => handleInputChange(edu.id, 'degree', e.target.value)}
                                className="inputField"
                            />
                            <input
                                type="text"
                                placeholder="Percentage"
                                value={edu.grade_main || ''}
                                onChange={(e) => handleInputChange(edu.id, 'grade_main', e.target.value)}
                                className="inputField"
                            />
                            <input
                                type="text"
                                placeholder="Marks Obtained/Total"
                                value={edu.grade_details || ''}
                                onChange={(e) => handleInputChange(edu.id, 'grade_details', e.target.value)}
                                className="inputField"
                            />
                            <button
                                className="actionButton saveButton"
                                onClick={() => handleSaveEducation()}
                            >
                                Save
                            </button>
                            <button
                                className="actionButton deleteButton"
                                onClick={() => handleDeleteEducation(edu.id)}
                            >
                                Delete
                            </button>
                        </div>
                    ) : (
                        <div className="educationDisplay">
                            <h3>{edu.institution || 'School Name'}</h3>
                            <p>
                                {edu.degree || '-'} - {edu.grade_main || '-'} ({edu.grade_details || '-'})
                            </p>
                            <button
                                className="actionButton editButton"
                                onClick={() => setEditingId(edu.id)}
                            >
                                Edit
                            </button>
                            <button
                                className="actionButton deleteButton"
                                onClick={() => handleDeleteEducation(edu.id)}
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            ))}
            <button className="actionButton addButton" onClick={handleAddEducation}>
                + Add Education
            </button>
        </div>
    );
}

export default EducationComponent;
