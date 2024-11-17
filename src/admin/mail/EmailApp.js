import React, { useEffect, useState } from 'react';
import EmailListComponent from './EmailListComponent';
import './EmailComponent.css';
import { toast } from 'sonner';
import EmailDetailComponent from '../mail/EmailDetailComponent';
import axiosPrivate from '../../api/axios';
import { useMediaQuery } from 'react-responsive';


function EmailApp() {
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [mails, setMails] = useState([]);
    const isMobile = useMediaQuery({ query: '(max-width: 786px)' });


    const handleSelectEmail = (email) => {
        setSelectedEmail(email);
    };

    const handleApprove = async (id) => {
        await axiosPrivate.post('/contact/meet', {
            _id: id
        }).then(res => {
            console.log(res)
            toast.success("Meeting Approved")
        }).catch(e => {
            toast.error("Unable to approve this reqeust")
            console.log(e)
        })
    };

    const fetchMails = async () => {
        try {
            const response = await axiosPrivate.get('/contact');
            setMails(response.data?.data?.requests || []);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        fetchMails();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axiosPrivate.delete(`/contact`, {
                params: {
                    _id: id
                }
            }).then(res => {
                console.log(res)
                toast.success('Mail deleted successfully');
                fetchMails();
            })
        } catch (e) {
            console.error(e);
            toast.error('Failed to delete the mail');
        }
    };

    return (
        <div className="adminemailcontainer">
            <div className="emailAppContainer">
                <div className="emailListComponent">
                    <EmailListComponent emails={mails} isMobile={isMobile} onSelectEmail={handleSelectEmail} handleDelete={handleDelete} />
                </div>
                <div className={`emailDetailComponent ${(isMobile && !selectedEmail) ? "emailDetailcomponentHide" : ""}`}>
                    <EmailDetailComponent
                        isMobile={isMobile}
                        selectedEmail={selectedEmail}
                        onApprove={handleApprove}
                        setSelectedEmail={setSelectedEmail}
                    />
                </div>
            </div>
        </div>
    );
}

export default EmailApp;
