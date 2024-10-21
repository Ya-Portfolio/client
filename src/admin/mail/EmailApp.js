import React, { useState } from 'react';
import EmailListComponent from './EmailListComponent';
import EmailDetailComponent from './EmailDetailComponent';
import './EmailComponent.css';

const dummyEmails = [
    {
        id: 1,
        sender: 'John Doe',
        snippet: 'Hi there, just wanted to check...',
        content: 'Hi there, just wanted to check in and see how the project is going. Let me know if you need anything from my side.',
        date: 'Oct 20, 2024'
    },
    {
        id: 2,
        sender: 'Jane Smith',
        snippet: 'Don’t forget the meeting tomorrow...',
        content: 'Don’t forget the meeting tomorrow at 10 AM. We need to finalize the designs before the presentation.',
        date: 'Oct 19, 2024'
    },
    // More dummy emails...
];

function EmailApp() {
    const [selectedEmail, setSelectedEmail] = useState(null);

    const handleSelectEmail = (email) => {
        setSelectedEmail(email);
    };

    const handleApprove = () => {
        alert('Email approved!');
    };

    const handleReply = () => {
        alert('Replying to email...');
    };

    return (
        <div className="adminemailcontainer">
            <div className="emailAppContainer">
                <div className="emailListComponent">
                    <EmailListComponent emails={dummyEmails} onSelectEmail={handleSelectEmail} />
                </div>
                <div className="emailDetailComponent">
                    <EmailDetailComponent
                        selectedEmail={selectedEmail}
                        onApprove={handleApprove}
                        onReply={handleReply}
                    />
                </div>
            </div>
        </div>
    );
}

export default EmailApp;
