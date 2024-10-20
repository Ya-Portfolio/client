import React, { useEffect, useRef, useState } from 'react'
import './AdminDocUpload.css'
import { Check, File } from 'lucide-react'
import { ArrowRightAlt } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import AddIcon from '../Components/addIcon/AddIcon'

function AdminDocUpload() {
    const navigate = useNavigate()
    const [documents, setDocuments] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
    const [addDocument, setAddDocument] = useState(false)
    const textRef = useRef()
    const lastCard = useRef()


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

    const getCurrentDatea = () => {
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

    const handleAddCard = () => {
        if (!textRef.current.value) {
            return
        }
        setDocuments([...documents, documents.length + 1])
        setAddDocument(false)
    }

    return (
        <div className="adminDocUpload">
            <h1 className='ebGaramond'>Document Upload Dashboard</h1>
            <div className="adminDocContainer">
                {
                    documents.map((item, index) => (
                        <div className="documentCard" key={Math.random()} onClick={() => navigateTo(index)}>
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
                                        <p>10 Files</p>
                                    </div>
                                </div>
                                <div className="documentName">
                                    <p>Document Name {index}</p>
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
                                    <div className="docIconContainer">
                                        <File />
                                    </div>
                                    <div className="accessoryInfoDoc">
                                        <p>Created on {getCurrentDatea()}</p>
                                        <p>0 Files</p>
                                    </div>
                                </div>
                                <div className="documentName">
                                    <p><input type="text" ref={textRef} placeholder="Document Name" /></p>
                                    {
                                        addDocument ? <p onClick={handleAddCard}>
                                            <Check />
                                        </p> : <p>
                                            <ArrowRightAlt />
                                        </p>
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
