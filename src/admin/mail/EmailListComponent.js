import React from 'react';
import './EmailComponent.css';
import { DeleteOutline } from '@mui/icons-material';

function EmailListComponent({ emails, onSelectEmail, handleDelete }) {
    // console.log(emails)
    return (
        <div className="emailListContainer">
            {emails.map((email) => (
                <div key={email._id} className="emailItem">
                    <div className="emailAvatar">{email.name[0]}</div>
                    <div className="emailDetails" onClick={() => onSelectEmail(email)}>
                        <h3 className="emailSender">{email.name}</h3>
                        <p className="emailSnippet">{email.email}</p>
                    </div>
                    <div className="emailDate" onClick={() => handleDelete(email._id)}>
                        <DeleteOutline />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default EmailListComponent;
