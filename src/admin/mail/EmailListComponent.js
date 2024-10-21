import React from 'react';
import './EmailComponent.css';

function EmailListComponent({ emails, onSelectEmail }) {
    return (
        <div className="emailListContainer">
            {emails.map((email) => (
                <div key={email.id} className="emailItem" onClick={() => onSelectEmail(email)}>
                    <div className="emailAvatar">{email.sender[0]}</div>
                    <div className="emailDetails">
                        <h3 className="emailSender">{email.sender}</h3>
                        <p className="emailSnippet">{email.snippet}</p>
                    </div>
                    <div className="emailDate">{email.date}</div>
                </div>
            ))}
        </div>
    );
}

export default EmailListComponent;
