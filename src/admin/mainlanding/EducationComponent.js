import React, { useState } from 'react';
import './EducationComponent.css';

function EducationComponent() {
    const [educationList, setEducationList] = useState([
        { id: 1, schoolName: '', course: '', percentage: '', marks: '' }
    ]);
    const [editingId, setEditingId] = useState(null);

    const handleAddEducation = () => {
        const newEdu = { id: Date.now(), schoolName: '', course: '', percentage: '', marks: '' };
        setEducationList([...educationList, newEdu]);
        setEditingId(newEdu.id);
    };

    const handleSaveEducation = (id) => {
        setEditingId(null);
    };

    const handleDeleteEducation = (id) => {
        setEducationList(educationList.filter(edu => edu.id !== id));
    };

    const handleInputChange = (id, field, value) => {
        setEducationList(educationList.map(edu => edu.id === id ? { ...edu, [field]: value } : edu));
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
                                value={edu.schoolName}
                                onChange={(e) => handleInputChange(edu.id, 'schoolName', e.target.value)}
                                className="inputField"
                            />
                            <input
                                type="text"
                                placeholder="Course"
                                value={edu.course}
                                onChange={(e) => handleInputChange(edu.id, 'course', e.target.value)}
                                className="inputField"
                            />
                            <input
                                type="text"
                                placeholder="Percentage"
                                value={edu.percentage}
                                onChange={(e) => handleInputChange(edu.id, 'percentage', e.target.value)}
                                className="inputField"
                            />
                            <input
                                type="text"
                                placeholder="Marks Obtained/Total"
                                value={edu.marks}
                                onChange={(e) => handleInputChange(edu.id, 'marks', e.target.value)}
                                className="inputField"
                            />
                            <button className="actionButton saveButton" onClick={() => handleSaveEducation(edu.id)}>Save</button>
                            <button className="actionButton deleteButton" onClick={() => handleDeleteEducation(edu.id)}>Delete</button>
                        </div>
                    ) : (
                        <div className="educationDisplay">
                            <h3>{edu.schoolName || "School Name"}</h3>
                            <p>{edu.course || "Course"} - {edu.percentage || "Percentage"} ({edu.marks || "Marks"})</p>
                            <button className="actionButton editButton" onClick={() => setEditingId(edu.id)}>Edit</button>
                            <button className="actionButton deleteButton" onClick={() => handleDeleteEducation(edu.id)}>Delete</button>
                        </div>
                    )}
                </div>
            ))}
            <button className="actionButton addButton" onClick={handleAddEducation}>+ Add Education</button>
        </div>
    );
}

export default EducationComponent;
