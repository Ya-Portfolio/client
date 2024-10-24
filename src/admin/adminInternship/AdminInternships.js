import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios'; // for making API requests
import { Check, EllipsisVertical } from 'lucide-react';
import '../AdminContent/AdminActualContent.css';
import axiosPrivate from '../../api/axios';
import { v4 as uuidV4 } from 'uuid'
import { toast } from 'sonner';

function AdminInternships() {
    const [internships, setInternships] = useState([]);
    const cardsRefs = useRef({});
    const [isEditing, setIsEditing] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [alreadyPresent, setAlreadyPresent] = useState(false)

    useEffect(() => {
        fetchInternships();
    }, []);

    const fetchInternships = async () => {
        try {
            const res = await axiosPrivate.get('/achievement');
            console.log(res)
            const fetchedInternships = res.data?.data?.achievements || [];
            setInternships(fetchedInternships);

            const refs = {};
            fetchedInternships.forEach((internship) => {
                refs[internship._id] = React.createRef();
            });
            cardsRefs.current = refs;
        } catch (error) {
            console.error('Error fetching achievements:', error);
        }
    };

    const addAndScrollEventHandler = async () => {
        try {
            const newId = uuidV4()

            const today = new Date().toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            });

            const newInternship = {
                _id: newId,
                title: '',
                date: today,
            };

            setInternships((prevInternships) => {
                const updatedInternships = [...prevInternships, newInternship];
                cardsRefs.current[newId] = React.createRef();
                return updatedInternships;
            });

            setTimeout(() => {
                const currentRefs = cardsRefs.current;

                if (currentRefs[newId]) {
                    currentRefs[newId].current.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest',
                    });
                    setIsEditing(newId);
                }
            }, 100);
        } catch (error) {
            console.error('Error adding achievement:', error);
        }
    };

    const handleTitleChange = (e, _id) => {
        const updatedTitle = e.target.value;
        const updatedInternships = internships.map((internship) =>
            internship._id === _id ? { ...internship, title: updatedTitle } : internship
        );
        setInternships(updatedInternships);
    };

    const handleDropdownToggle = (_id) => {
        setDropdownOpen(dropdownOpen === _id ? null : _id);
    };

    const handleDelete = async (_id) => {
        try {
            await axiosPrivate.delete(`/achievement`, {
                params: {
                    _id: _id
                }
            });
            setDropdownOpen(null);
            toast.success("Deleted Successfully")
            fetchInternships()
        } catch (error) {
            toast.error("Deletion Failed")
            console.error('Error deleting achievement:', error);
        }
    };


    const handleCheck = async (_id) => {
        try {
            const internship = internships.find((internship) => internship._id === _id);

            if (alreadyPresent) {
                await axiosPrivate.delete(`/achievement`, {
                    params: { _id: _id }
                });

                const newId = uuidV4();
                const today = new Date().toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                });

                await axiosPrivate.post('/achievement', { _id: newId, title: internship.title, date: today });

                const updatedInternships = internships.map((intern) =>
                    intern._id === _id ? { ...intern, _id: newId, title: internship.title } : intern
                );
                setInternships(updatedInternships);

                toast.success("Achievement updated successfully");
            } else {
                await axiosPrivate.post('/achievement', { title: internship.title });
                toast.success("Achievement added successfully");
            }

            setIsEditing(null);
            setDropdownOpen(null);

        } catch (error) {
            console.error('Error updating achievement:', error);
            toast.error("Failed to update achievement");
        }
    };


    const handleEdit = (_id) => {
        setIsEditing(_id);
        setDropdownOpen(null);
    };

    return (
        <div className="adminNoteCards">
            <div className="adminNoteHeader">
                <button className="adminBtn" onClick={addAndScrollEventHandler}>
                    Add new Achievements
                </button>
            </div>
            <div className="adminBlogsContent">
                {internships.map((internship) => (
                    <div className="adminBlogContainer" key={internship._id} ref={cardsRefs.current[internship._id]}>
                        <div className="adminNoteContainerComplete">
                            <div className="adminNotePrimaryChild">
                                {isEditing === internship._id ? (
                                    <input
                                        type="text"
                                        value={internship.title}
                                        onChange={(e) => handleTitleChange(e, internship._id)}
                                        className="adminNoteHeader nunito"
                                        placeholder="Enter title"
                                        autoFocus
                                    />
                                ) : (
                                    <h3 className="adminNoteHeader nunito" onClick={() => {
                                        setIsEditing(internship._id)
                                        setAlreadyPresent(true)
                                    }}>
                                        {internship.title || 'Untitled achievement'}
                                    </h3>
                                )}
                            </div>
                            <div className="adminNavbarSecondaryChild">
                                <button className="adminBtn" onClick={() => handleDropdownToggle(internship._id)}>
                                    <EllipsisVertical size={20} />
                                </button>
                                {isEditing === internship._id && (
                                    <button className="adminBtn" onClick={() => handleCheck(internship._id)}>
                                        <Check size={20} />
                                    </button>
                                )}
                                {dropdownOpen === internship._id && (
                                    <div className="dropdown-menu">
                                        <button onClick={() => handleDelete(internship._id)}>Delete</button>
                                        <button onClick={() => handleEdit(internship._id)}>Edit</button>
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
