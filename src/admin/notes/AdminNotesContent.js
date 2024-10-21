import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EllipsisVertical } from 'lucide-react';
import { ArrowRightAltRounded, Category } from '@mui/icons-material';
import { addNote, deleteNote, updateNoteTitle, updateNoteDate } from '../../redux/notesBlogSlice';
import { useNavigate } from 'react-router-dom';
import './AdminNotesContent.css';
import { v4 as uuidv4 } from 'uuid'

function AdminNotesContent() {
    const notes = useSelector((state) => state.notes.categories.notes);
    const [isEditing, setIsEditing] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [dateEditingIndex, setDateEditingIndex] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const addAndScrollEventHandler = () => {
        const today = new Date().toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });

        const newNote = {
            id: uuidv4(),
            title: 'Untitled note',
            date: today,
        };

        dispatch(addNote(newNote));
    };

    const handleTitleChange = (e, index) => {
        const updatedTitle = e.target.value;
        dispatch(updateNoteTitle({ index, title: updatedTitle }));
    };

    const handleDateChange = (index) => {
        setDateEditingIndex(index);
        setSelectedDate(notes[index].date);
        setDropdownOpen(null);
    };

    const handleSaveDate = (index) => {
        dispatch(updateNoteDate({ index, date: selectedDate }));
        setDateEditingIndex(null);
    };

    const handleDropdownToggle = (index) => {
        setDropdownOpen(dropdownOpen === index ? null : index);
        setDateEditingIndex(null);
    };

    const handleDelete = (index) => {
        dispatch(deleteNote(index));
        setDropdownOpen(null);
    };

    const NavigateToBlog = (index) => {
        const noteId = notes[index].id;
        navigate(`/admin/notes/${noteId}`, {
            state: {
                noteId: noteId,
                title: notes[index].title,
                date: notes[index].date,
                category: 'notes'
            }
        });
    };

    return (
        <div className="adminNoteContainers">
            <div className="adminNoteCards">
                <div className="adminNoteHeader">
                    <h2>Notes</h2>
                    <button className="adminBtn" onClick={addAndScrollEventHandler}>
                        Add new note
                    </button>
                </div>
                <div className="adminBlogsContent">
                    {notes.map((note, index) => (
                        <div className="adminBlogContainer" key={note.id}>
                            <div className="adminNoteContainerComplete">
                                <div className="adminNotePrimaryChild">
                                    {isEditing === index ? (
                                        <input
                                            type="text"
                                            value={note.title}
                                            onChange={(e) => handleTitleChange(e, index)}
                                            onBlur={() => setIsEditing(null)}
                                            className="adminNoteHeader nunito"
                                            autoFocus
                                        />
                                    ) : (
                                        <h3 className="adminNoteHeader nunito" onClick={() => setIsEditing(index)}>
                                            {note.title}
                                        </h3>
                                    )}
                                    <p className="adminNoteDate nunito">
                                        Last updated on{' '}
                                        {dateEditingIndex === index ? (
                                            <input
                                                type="date"
                                                value={selectedDate}
                                                onChange={(e) => setSelectedDate(e.target.value)}
                                                onBlur={() => handleSaveDate(index)}
                                            />
                                        ) : (
                                            new Date(note.date).toLocaleDateString('en-GB', {
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
                                    <button className="adminBtn" onClick={() => NavigateToBlog(index)}>
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
        </div>
    );
}

export default AdminNotesContent;
