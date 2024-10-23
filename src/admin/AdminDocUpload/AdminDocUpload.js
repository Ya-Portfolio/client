import React, { useEffect, useRef, useState } from 'react'
import './AdminDocUpload.css'
import { Check, File } from 'lucide-react'
import { ArrowRightAlt, DeleteOutline } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import AddIcon from '../Components/addIcon/AddIcon'
import { IconCertificate } from '@tabler/icons-react'
import axiosPrivate from '../../api/axios'

function AdminDocUpload() {
    const navigate = useNavigate()
    const [documents, setDocuments] = useState([])
    const [addDocument, setAddDocument] = useState(false)
    const textRef = useRef()
    const lastCard = useRef()
    const checkCardRef = useRef()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [files, setFiles] = useState([])

    const fetchDirectories = async () => {
        try {
            const response = await axiosPrivate.get('/directory');
            const data = response.data?.data?.documents;
            setDocuments(data);
        } catch (error) {
            setError('Failed to load documents');
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchDirectories()
    }, [])


    const addAnotherCard = () => {
        setAddDocument(!addDocument)
        setTimeout(() => {
            if (lastCard.current) {
                lastCard.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                })
            }
        }, 0);
    }

    useEffect(() => {
        if (addDocument) {
            textRef.current.focus()
        }
    }, [addDocument])

    const navigateTo = (i) => {
        navigate(`/admin/document/${i}`)
    }

    const getCurrentDate = () => {
        const date = new Date()
        return `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}, ${date.getFullYear()}`
    }

    const handleNewAddition = () => {
        if (!textRef.current.value) {
            return
        }
        setDocuments([...documents, documents.length + 1])
        setAddDocument(false)
    }

    const handleAddCard = async () => {
        if (!textRef.current.value) {
            return
        }

        setAddDocument(false)
        await axiosPrivate.post('/directory', {
            name: textRef.current?.value,
            isPrivate: checkCardRef.current.checked,
        }).then(res => {
            fetchDirectories()
            console.log(res)
        }).catch(e => {
            console.log(e)
        })
    }

    const deleteFolder = async (index) => {
        const newArr = documents.filter(item => item._id !== index)
        setDocuments(newArr)
        await axiosPrivate.delete(`/directory`, {
            params: {
                _id: index
            }
        }).then(res => {
            fetchDirectories()
            console.log(res)
        }).catch(e => {
            console.log(e)
        })
    }

    return (
        <div className="adminDocUpload">
            <h1 className='ebGaramond'>Document Upload Dashboard</h1>
            <div className="adminDocContainer">
                <div className="documentCard certificate" >
                    <div className="documentCardIcon">
                        <IconCertificate />
                    </div>
                    <div className="documentCardInfo">
                        <div className="documentFirstChild nunito">
                            <div className="docIconContainer">
                                <File />
                            </div>
                            <div className="accessoryInfoDoc">
                                <p>Created on Jan 24, 2024</p>
                                <p>10 Files</p>
                            </div>
                        </div>
                        <div className="documentName" onClick={() => navigateTo('certificates')}>
                            <p>Certificates</p>
                            <ArrowRightAlt />
                        </div>
                    </div>
                </div>
                {loading ? <p>Loading...</p> : error ? <p>{error}</p> : documents?.map((item, index) => (
                    <div className="documentCard" key={item._id} >
                        <div className="deleteIconContainer" onClick={() => deleteFolder(item._id)}>
                            <DeleteOutline />
                        </div>
                        <div className="documentCardIcon">
                            <img src="https://templates.iqonic.design/hope-ui/pro/html/file-manager/assets/images/pdf.svg" alt="" />
                        </div>
                        <div className="documentCardInfo">
                            <div className="documentFirstChild nunito">
                                <div className="docIconContainer">
                                    <File />
                                </div>
                                <div className="accessoryInfoDoc">
                                    <p>Created on Jan 24, 2024</p>
                                    <p>{item.documents?.length || 0} Files</p>
                                </div>
                            </div>
                            <div className="documentName" onClick={() => navigateTo(item._id)}>
                                <p>{item.name}</p>
                                <ArrowRightAlt />
                            </div>
                        </div>
                    </div>
                ))
                }

                {
                    addDocument && (
                        <div className="documentCard lastCardAdmin" ref={lastCard} onClick={handleNewAddition}>
                            <div className="documentCardIcon">
                                <img src="https://templates.iqonic.design/hope-ui/pro/html/file-manager/assets/images/pdf.svg" alt="" />
                            </div>
                            <div className="documentCardInfo">
                                <div className="documentFirstChild nunito">
                                    <div className="docIconContainer lastdocIcon">
                                        <div class="container">
                                            <input type="checkbox" ref={checkCardRef} id="cbx" style={{ display: "none" }} />
                                            <label for="cbx" class="check">
                                                <svg width="18px" height="18px" viewBox="0 0 18 18">
                                                    <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                                                    <polyline points="1 9 7 14 15 4"></polyline>
                                                </svg>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="accessoryInfoDoc">
                                        <label htmlFor='cbx'>Make it Public</label>
                                    </div>
                                </div>
                                <div className="documentName lastDocumentName">
                                    <p><input type="text" ref={textRef} placeholder="Document Name" /></p>
                                    {
                                        addDocument ? <span onClick={handleAddCard}>
                                            <Check />
                                        </span> : <span>
                                            <ArrowRightAlt />
                                        </span>
                                    }
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
            <AddIcon onClick={addAnotherCard} isCancel={addDocument} />
        </div>
    )
}

export default AdminDocUpload
