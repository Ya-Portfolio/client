import React, { useEffect, useState } from 'react';
import { EllipsisVertical } from 'lucide-react';
import { Check, ArrowRightAltRounded } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import './AdminNotesContent.css';
import axiosPrivate from '../../api/axios';

function AdminNotesContent() {
    const [notes, setNotes] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [newNoteTitle, setNewNoteTitle] = useState('');
    const [isAddingNote, setIsAddingNote] = useState(false);
    const navigate = useNavigate();

    const fetchNotes = async () => {
        try {
            const response = await axiosPrivate.get('/file/short-details', {
                params: {
                    type: 'notes',
                },
            });
            const notesArr = response.data?.data?.files || [];
            setNotes(notesArr);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    const addAndScrollEventHandler = async () => {
        setIsAddingNote(true);
        setNewNoteTitle('');
    };

    const handleAddNote = async () => {
        try {
            const res = await axiosPrivate.post('/file', { type: 'notes' });
            const uniqueId = res.data?.data?._id;

            const newNote = {
                _id: uniqueId,
                title: newNoteTitle || 'Untitled note',
                date: new Date().toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                }),
            };
            setNotes((prevNotes) => [...prevNotes, newNote]);
            setIsAddingNote(false);
        } catch (e) {
            console.log(e);
        }
    };

    const handleDelete = async (noteId) => {
        setNotes((prevNotes) => prevNotes.filter(note => note._id !== noteId));
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

    const handleDropdownToggle = (index) => {
        setDropdownOpen(dropdownOpen === index ? null : index);
    };

    const navigateToBlog = (_id) => {
        navigate(`/admin/notes/${_id}`, {
            state: {
                noteId: _id,
                title: notes.find(note => note._id === _id)?.title,
                date: notes.find(note => note._id === _id)?.date,
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
                {isAddingNote && (
                    <div className="note-card">
                        <input
                            type="text"
                            value={newNoteTitle}
                            onChange={(e) => setNewNoteTitle(e.target.value)}
                            onBlur={handleAddNote}
                            placeholder='Enter note Title'
                            className="note-title-input"
                            autoFocus
                        />
                        <button className="action-btn" onClick={handleAddNote}>
                            <Check size={20} />
                        </button>
                    </div>
                )}
                {notes.length > 0 ? (
                    notes.map((note, index) => (
                        <div className="note-card" key={note._id}>
                            <div className="note-content">
                                <h3 className="note-title">
                                    {note.title || 'Untitled note'}
                                </h3>
                                <p className="note-date">
                                    Last updated on{' '}
                                    {new Date(note.date).toLocaleDateString('en-GB', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                    })}
                                </p>
                            </div>
                            <div className="note-actions">
                                <button className="action-btn menu-action" onClick={() => handleDropdownToggle(index)}>
                                    <EllipsisVertical size={20} />
                                </button>
                                <button className="action-btn" onClick={() => navigateToBlog(note._id)}>
                                    <ArrowRightAltRounded size={20} />
                                </button>
                                {dropdownOpen === index && (
                                    <div className="dropdown-menu">
                                        <button onClick={() => handleDelete(note._id)}>Delete</button>
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
