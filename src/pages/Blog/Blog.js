import React, { useEffect } from 'react'
import './CardGrid.css';
import Navbar from '../../components/navbar/Navbar'
import axiosPrivate from '../../api/axios';

function Blog() {

    const [cards, setCards] = React.useState([])

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
                        <div className="imageContainer">
                            <img src={
                                card.img || "https://images.unsplash.com/photo-1728998887922-596106e38ac7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDMxfDZzTVZqVExTa2VRfHxlbnwwfHx8fHw%3D"
                            } alt="" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Blog
