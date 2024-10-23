import React, { useEffect } from 'react'
import './CardGrid.css';
import Navbar from '../../components/navbar/Navbar'
import axiosPrivate from '../../api/axios';
import { useNavigate } from 'react-router-dom';

function Blog() {

    const [cards, setCards] = React.useState([])
    const navigate = useNavigate()

    const navigateTo = (id) => {
        // console.log(id)
        navigate('/public/' + id)
    }

    const fetchBlogs = async () => {
        try {
            const response = await axiosPrivate('/file/short-details', {
                params: {
                    type: 'blogs'
                }
            })

            setCards(response.data?.data?.files || [])
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchBlogs()
    }, [])

    return (
        <div className="blogContainer">
            <Navbar title='Chandrababu Gowda' value="Blog" />
            <div className="card-grid">
                {cards.map((card, index) => (
                    <div key={index} className="cardCard">
                        <h2 className="card-title nunito">{card.title}</h2>
                        <div className="imageContainer" onClick={() => navigateTo(card._id)}>
                            <img src={card.coverPhoto.location} alt="" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Blog
