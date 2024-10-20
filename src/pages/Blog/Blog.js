import React from 'react'
import './CardGrid.css';
import Navbar from '../../components/navbar/Navbar'

function Blog() {
    const cards = [
        { title: 'A trip to Wayanad', link: '/wayanad', img: "https://images.unsplash.com/photo-1729148074715-78de89a6bed2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDN8SnBnNktpZGwtSGt8fGVufDB8fHx8fA%3D%3D" },
        { title: 'A Journey to the Mountains', link: '/mountains', img: "https://images.unsplash.com/photo-1728998887922-596106e38ac7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDMxfDZzTVZqVExTa2VRfHxlbnwwfHx8fHw%3D" },
        { title: 'Exploring the Wilderness', link: '/wilderness', img: "https://plus.unsplash.com/premium_photo-1728930379607-8fd9749ed900?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDMyfDZzTVZqVExTa2VRfHxlbnwwfHx8fHw%3D" },
        { title: 'Tranquil Lakeside', link: '/lakeside', img: "https://images.unsplash.com/photo-1728997150636-91ef00ba7e59?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDI5fDZzTVZqVExTa2VRfHxlbnwwfHx8fHw%3D" },
        { title: 'Adventure in the Woods', link: '/woods', img: "https://images.unsplash.com/photo-1728755695713-703826e6cf16?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDU3fDZzTVZqVExTa2VRfHxlbnwwfHx8fHw%3D" },
        { title: 'Discovering Hidden Trails', link: '/trails', img: "https://images.unsplash.com/photo-1728724920023-982a5d5d3f70?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDUyfDZzTVZqVExTa2VRfHxlbnwwfHx8fHw%3D" },
        { title: 'Sunset at the Beach', link: '/beach', img: "https://plus.unsplash.com/premium_photo-1728755158799-81554467446e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDU4fDZzTVZqVExTa2VRfHxlbnwwfHx8fHw%3D" },
        { title: 'City Lights at Night', link: '/citylights', img: "https://images.unsplash.com/photo-1721297014829-6cd7426e3ba1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDY1fDZzTVZqVExTa2VRfHxlbnwwfHx8fHw%3D" },
        { title: 'A trip to Wayanad', link: '/wayanad', img: "https://images.unsplash.com/photo-1728660977084-93ebeb6f5c87?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDc1fDZzTVZqVExTa2VRfHxlbnwwfHx8fHw%3D" },
        { title: 'A trip to Wayanad', link: '/wayanad', img: "https://images.unsplash.com/photo-1728791737704-e420a3133182?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDc0fDZzTVZqVExTa2VRfHxlbnwwfHx8fHw%3D" },
        { title: 'A trip to Wayanad', link: '/wayanad', img: "https://images.unsplash.com/photo-1707676902453-124cb06e3a4c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDg2fDZzTVZqVExTa2VRfHxlbnwwfHx8fHw%3D" },
        { title: 'A trip to Wayanad', link: '/wayanad' },
        { title: 'A trip to Wayanad', link: '/wayanad' },
        { title: 'A trip to Wayanad', link: '/wayanad' },
        { title: 'A trip to Wayanad', link: '/wayanad' },
        { title: 'A trip to Wayanad', link: '/wayanad' },
        { title: 'A trip to Wayanad', link: '/wayanad' },
        { title: 'A trip to Wayanad', link: '/wayanad' },
        { title: 'A trip to Wayanad', link: '/wayanad' },
        { title: 'A trip to Wayanad', link: '/wayanad' },
        { title: 'A trip to Wayanad', link: '/wayanad' },
        { title: 'A trip to Wayanad', link: '/wayanad' },
        { title: 'A trip to Wayanad', link: '/wayanad' },
        { title: 'A trip to Wayanad', link: '/wayanad' },
        { title: 'A trip to Wayanad', link: '/wayanad' },
        { title: 'A trip to Wayanad', link: '/wayanad' },
        { title: 'A trip to Wayanad', link: '/wayanad' },
        { title: 'A trip to Wayanad', link: '/wayanad' },
        { title: 'A trip to Wayanad', link: '/wayanad' },
        { title: 'A trip to Wayanad', link: '/wayanad' },
        { title: 'A trip to Wayanad', link: '/wayanad' },
        { title: 'A trip to Wayanad', link: '/wayanad' },
        { title: 'A trip to Wayanad', link: '/wayanad' },
        { title: 'A trip to Wayanad', link: '/wayanad' },
        { title: 'A trip to Wayanad', link: '/wayanad' },
        { title: 'A trip to Wayanad', link: '/wayanad' },
        { title: 'A trip to Wayanad', link: '/wayanad' },
        { title: 'A trip to Wayanad', link: '/wayanad' },
    ];
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
