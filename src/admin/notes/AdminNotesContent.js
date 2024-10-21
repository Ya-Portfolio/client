import { ArrowRightAltRounded } from '@mui/icons-material'
import { EllipsisVertical } from 'lucide-react'
import React from 'react'
import './AdminNotesContent.css'

function AdminNotesContent() {

    const NavigateToBlog = () => {

    }

    const addAndScrollEventHandler = () => {

    }

    const handleDropdownToggle = () => {

    }

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
                    <div className="adminBlogContainer">
                        <div className="adminNoteContainerComplete">
                            <div className="adminNotePrimaryChild">
                                {/* {isEditing === index ? (
                                    <input
                                        type="text"
                                        value={blog.title}
                                        onChange={(e) => handleTitleChange(e, index)}
                                        onBlur={handleBlurEvent}
                                        className="adminNoteHeader nunito"
                                        autoFocus
                                    />
                                ) : (
                                    <h3 className="adminNoteHeader nunito" onClick={() => setIsEditing(index)}>
                                        {blog.title}
                                    </h3>
                                )} */}
                                <p className="adminNoteDate nunito">
                                    Last updated on

                                    {/* {dateEditingIndex === index ? (
                                    <input
                                        type="date"
                                        value={selectedDate}
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                        onBlur={() => handleSaveDate(index)}
                                    />
                                ) : (
                                    new Date(blog.date).toLocaleDateString('en-GB', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                    })
                                )} */}
                                </p>
                            </div>
                            <div className="adminNavbarSecondaryChild">
                                <button className="adminBtn" onClick={() => handleDropdownToggle()}>
                                    <EllipsisVertical size={20} />
                                </button>
                                <button className="adminBtn" onClick={() => NavigateToBlog()}>
                                    <ArrowRightAltRounded size={20} />
                                </button>
                                {/* {dropdownOpen === index && (
                                <div className="dropdown-menu">
                                    <button onClick={() => handleDelete(index)}>Delete</button>
                                    <button onClick={() => handleDateChange(index)}>Change Date</button>
                                </div>
                            )} */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminNotesContent