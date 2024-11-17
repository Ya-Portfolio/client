import React, { useEffect } from 'react'
import './Documents.css'
import folder from '../../assets/documents/Rectangle 32.png'
import doc from '../../assets/documents/Rectangle 31.png'
import Navbar from '../../components/navbar/Navbar'
import axiosPrivate from '../../api/axios'
import { useNavigate } from 'react-router-dom'

function Documents() {

    const [document, setDocument] = React.useState([])
    const navigate = useNavigate()
    const fetchDocs = async () => {
        await axiosPrivate.get('/directory').then(res => {
            setDocument(res.data?.data?.documents || null)
        })
    }

    useEffect(() => {
        fetchDocs()
    }, [])

    const moveToNextPage = (id, name) => {
        navigate(`/documents/${name}/${id}`, { state: { name: name } })
    }

    return (
        <div className="documentsContainer">
            <Navbar title='Chandrababu Gowda' value="Documents" />
            <div className="docsContainer">
                {
                    document.map((card, index) => {
                        return (
                            <div className="folders" key={card._id} onClick={() => moveToNextPage(card._id, card.name)} >
                                <img src={folder} alt="" />
                                <p>{card.name}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Documents