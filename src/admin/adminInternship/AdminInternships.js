import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    addInternship,
    updateInternshipTitle,
    deleteInternship,
    updateInternshipDate
} from '../../redux/notesBlogSlice';
import { v4 as uuidv4 } from 'uuid';
import { EllipsisVertical } from 'lucide-react';
import { ArrowRightAltRounded, Category } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import '../AdminContent/AdminActualContent.css'

function AdminInternships() {
    const internships = useSelector((state) => state.notes.categories.internships);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cardsRefs = useRef([]);
    const [isEditing, setIsEditing] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [dateEditingIndex, setDateEditingIndex] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');

    useEffect(() => {
        cardsRefs.current = Array(internships.length).fill().map((_, i) => cardsRefs.current[i] || React.createRef());
    }, [internships]);

    const addAndScrollEventHandler = () => {
        const today = new Date().toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
        const newInternship = {
            id: uuidv4(),
            title: 'Untitled achievement',
            date: today,
        };

        dispatch(addInternship(newInternship));
        cardsRefs.current.push(React.createRef());

        setTimeout(() => {
            const newIndex = internships.length;
            const currentRefs = cardsRefs.current;

            if (currentRefs[newIndex]) {
                currentRefs[newIndex].current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                setIsEditing(newIndex);
            }
        }, 100);
    };

    const handleTitleChange = (e, index) => {
        const updatedTitle = e.target.value;
        dispatch(updateInternshipTitle({ index, title: updatedTitle }));
    };

    const handleDropdownToggle = (index) => {
        setDropdownOpen(dropdownOpen === index ? null : index);
        setDateEditingIndex(null);
    };

    const handleDelete = (index) => {
        dispatch(deleteInternship(index));
        setDropdownOpen(null);
    };

    const handleDateChange = (index) => {
        setDateEditingIndex(index);
        setSelectedDate(internships[index].date);
        setDropdownOpen(null);
    };

    const handleSaveDate = (index) => {
        dispatch(updateInternshipDate({ index, date: selectedDate }));
        setDateEditingIndex(null);
    };

    const handleBlurEvent = () => {
        setIsEditing(null);
    };

    const NavigateToInternship = (index) => {
        const internshipId = internships[index].id;
        navigate(`/admin/achievemnets/${internshipId}`, {
            state: {
                internshipId: internshipId,
                title: internships[index].title,
                date: internships[index].date,
                category : 'achievement'
            }
        });
    };

    return (
        <div className="adminNoteCards">
            <div className="adminNoteHeader">
                <button className="adminBtn" onClick={addAndScrollEventHandler}>
                    Add new Achievements
                </button>
            </div>
            <div className="adminBlogsContent">
                {internships.map((internship, index) => (
                    <div className="adminBlogContainer" key={internship.id} ref={cardsRefs.current[index]}>
                        <div className="adminNoteContainerComplete">
                            <div className="adminNotePrimaryChild">
                                {isEditing === index ? (
                                    <input
                                        type="text"
                                        value={internship.title}
                                        onChange={(e) => handleTitleChange(e, index)}
                                        onBlur={handleBlurEvent}
                                        className="adminNoteHeader nunito"
                                        autoFocus
                                    />
                                ) : (
                                    <h3 className="adminNoteHeader nunito" onClick={() => setIsEditing(index)}>
                                        {internship.title}
                                    </h3>
                                )}
                                <p className="adminNoteDate nunito">
                                    Internship started on{' '}
                                    {dateEditingIndex === index ? (
                                        <input
                                            type="date"
                                            value={selectedDate}
                                            onChange={(e) => setSelectedDate(e.target.value)}
                                            onBlur={() => handleSaveDate(index)}
                                        />
                                    ) : (
                                        new Date(internship.date).toLocaleDateString('en-GB', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                        })
                                    )}
                                </p>
                            </div>
                            <div className="adminNavbarSecondaryChild">
                                <button className="adminBtn" onClick={() => handleDropdownToggle(index)}>
                                    <EllipsisVertical size={20} />
                                </button>
                                <button className="adminBtn" onClick={() => NavigateToInternship(index)}>
                                    <ArrowRightAltRounded size={20} />
                                </button>
                                {dropdownOpen === index && (
                                    <div className="dropdown-menu">
                                        <button onClick={() => handleDelete(index)}>Delete</button>
                                        <button onClick={() => handleDateChange(index)}>Change Date</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminInternships;
