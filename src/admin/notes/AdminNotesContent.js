import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EllipsisVertical } from 'lucide-react';
import { ArrowRightAltRounded } from '@mui/icons-material';
import {
    addNote,
    deleteNote,
    updateNoteTitle,
    updateNoteDate,
    addNoteInitialState,
} from '../../redux/notesBlogSlice';
import { useNavigate } from 'react-router-dom';
import './AdminNotesContent.css';
import axiosPrivate from '../../api/axios';

function AdminNotesContent() {
    const notes = useSelector((state) => state.notes.categories.notes);
    const [isEditing, setIsEditing] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [dateEditingIndex, setDateEditingIndex] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const addAndScrollEventHandler = async () => {
        try {
            const today = new Date().toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            });

            await axiosPrivate
                .post('/file', {
                    type: 'notes',
                })
                .then((res) => {
                    const uniqueId = res.data?.data?._id;
                    const newNote = {
                        id: uniqueId,
                        title: 'Untitled note',
                        date: today,
                    };
                    dispatch(addNote(newNote));
                })
                .catch((e) => {
                    console.log(e);
                });
        } catch (e) {
            console.log(e);
        }
    };

    const handleTitleChange = (e, noteId) => {
        const updatedTitle = e.target.value;
        dispatch(updateNoteTitle({ id: noteId, title: updatedTitle }));
    };

    const handleDateChange = (index) => {
        setDateEditingIndex(index);
        setSelectedDate(notes[index].date);
        setDropdownOpen(null);
    };

    const handleSaveDate = (noteId) => {
        dispatch(updateNoteDate({ id: noteId, date: selectedDate }));
        setDateEditingIndex(null);
    };

    const handleDropdownToggle = (index) => {
        setDropdownOpen(dropdownOpen === index ? null : index);
        setDateEditingIndex(null);
    };

    const handleDelete = async (noteId) => {
        dispatch(deleteNote({ id: noteId }));
        setDropdownOpen(null);

        try {
            await axiosPrivate.delete(`/file`, {
                params: {
                    _id: noteId,
                },
            });
        } catch (e) {
            console.log(e);
        }
    };

    const fetchNotes = async () => {
        try {
            const response = await axiosPrivate.get('/file/short-details', {
                params: {
                    type: 'notes',
                },
            });
            const notesArr = response.data?.data?.files;
            dispatch(addNoteInitialState(notesArr));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    const navigateToBlog = (index) => {
        const noteId = notes[index].id;
        navigate(`/admin/notes/${noteId}`, {
            state: {
                noteId: noteId,
                title: notes[index].title,
                date: notes[index].date,
                category: 'notes',
            },
        });
    };

    return (
        <div className="admin-notes-container">
            <div className="admin-notes-header">
                <h2>Notes</h2>
                <button className="add-note-btn" onClick={addAndScrollEventHandler}>
                    Add new note
                </button>
            </div>
            <div className="notes-grid">
                {notes.length > 0 ? (
                    notes.map((note, index) => (
                        <div className="note-card" key={note._id}>
                            <div className="note-content">
                                {isEditing === note._id ? (
                                    <input
                                        type="text"
                                        value={note.title}
                                        onChange={(e) => handleTitleChange(e, note.id)}
                                        onBlur={() => setIsEditing(null)}
                                        className="note-title-input"
                                        autoFocus
                                    />
                                ) : (
                                    <h3 className="note-title" onClick={() => setIsEditing(note.id)}>
                                        {note.title || 'Untitled note'}
                                    </h3>
                                )}
                                <p className="note-date">
                                    Last updated on{' '}
                                    {dateEditingIndex === note._id ? (
                                        <input
                                            type="date"
                                            value={selectedDate}
                                            onChange={(e) => setSelectedDate(e.target.value)}
                                            onBlur={() => handleSaveDate(note.id)}
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
                            <div className="note-actions">
                                <button className="action-btn menu-action" onClick={() => handleDropdownToggle(note._id)}>
                                    <EllipsisVertical size={20} />
                                </button>
                                <button className="action-btn" onClick={() => navigateToBlog(index)}>
                                    <ArrowRightAltRounded size={20} />
                                </button>
                                {dropdownOpen === index && (
                                    <div className="dropdown-menu">
                                        <button onClick={() => handleDelete(note.id)}>Delete</button>
                                        <button onClick={() => handleDateChange(index)}>Change Date</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-notes">
                        <h3>No notes available</h3>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminNotesContent;
