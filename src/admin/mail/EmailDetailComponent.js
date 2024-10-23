import React from 'react';
import './EmailComponent.css';
import { toast } from 'sonner';
import axiosPrivate from '../../api/axios';

function EmailDetailComponent({ selectedEmail, onApprove }) {
    const replyText = React.createRef();

    const handleReply = async (value) => {
        console.log(value)
        if (!value) {
            toast.error('Text Body is empty');
            return;
        }

        await axiosPrivate.post('/contact/reply', {
            email: selectedEmail.email,
            mailBody: value
        }).then(res => {
            console.log(res)
            toast.success("Reply Sent")
        }).catch(e => {
            console.log(e)
            toast.error('Failed to send mail')
        })

    };

    if (!selectedEmail) {
        return <div className="emailDetailEmpty">Select an email to view its content</div>;
    }

    return (
        <div className="emailDetailContainer">
            <h2 className="emailDetailSender">{selectedEmail.name}</h2>
            <p className="emailDetailDate">{selectedEmail.email}</p>
            <div className="emailFullContent">{selectedEmail.message}</div>
            {/* <div className="emailFullContent">Date: {new Date(selectedEmail.meetDate).toLocaleDateString()} {selectedEmail.meetTime}</div> */}

            <textarea name="replyContent" id="replyContent" ref={replyText} className="replyContent"></textarea>

            <div className="emailActions">
                {
                    selectedEmail.meetDate && (
                        <button className="actionButton approveButton" onClick={() => onApprove(selectedEmail._id)}>Approve</button>
                    )
                }
                <button className="actionButton replyButton" onClick={() => handleReply(replyText.current?.value || null)}>Reply</button>
            </div>
        </div>
    );
}

export default EmailDetailComponent;
