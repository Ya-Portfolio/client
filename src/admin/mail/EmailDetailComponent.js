import React from 'react';
import './EmailComponent.css';

function EmailDetailComponent({ selectedEmail, onApprove, onReply }) {
    if (!selectedEmail) {
        return <div className="emailDetailEmpty">Select an email to view its content</div>;
    }

    return (
        <div className="emailDetailContainer">
            <h2 className="emailDetailSender">{selectedEmail.sender}</h2>
            <p className="emailDetailDate">{selectedEmail.date}</p>
            <div className="emailFullContent">{selectedEmail.content}</div>
            <div className="emailActions">
                <button className="actionButton approveButton" onClick={onApprove}>Approve</button>
                <button className="actionButton replyButton" onClick={onReply}>Reply</button>
            </div>
        </div>
    );
}

export default EmailDetailComponent;
