import React from 'react';
import './EmailComponent.css';
import { toast } from 'sonner';

function EmailDetailComponent({ selectedEmail, onApprove }) {

    const replyText = React.createRef();

    const handleReply = () => {
        if (!replyText.current.value) {
            toast.error('Text Body is empty');
            return;
        }
        else
            toast.success('Reply sent successfully');
    };

    if (!selectedEmail) {
        return <div className="emailDetailEmpty">Select an email to view its content</div>;
    }


    return (
        <div className="emailDetailContainer">
            <h2 className="emailDetailSender">{selectedEmail.sender}</h2>
            <p className="emailDetailDate">{selectedEmail.date}</p>
            <div className="emailFullContent">{selectedEmail.content}</div>
            <textarea name="replyContent" id="replyContent" ref={replyText} className="replyContent"></textarea>
            <div className="emailActions">
                <button className="actionButton approveButton" onClick={onApprove}>Approve</button>
                <button className="actionButton replyButton" onClick={handleReply}>Reply</button>
            </div>
        </div>
    );
}

export default EmailDetailComponent;
