import React from 'react'
import Navbar from '../components/navbar/Navbar'
import './Home.css'
import PicHandler from '../components/home/PicHandler'

function Home() {
    return (
        <main>
            <Navbar />
            <div className="additionalColumn"></div>
            <div className='mainContent'>
                <h1 className='ebGaramond'>Chandrababu <br />Gowda</h1>
                <div className='skills nunito'>
                    <p>Full Stack Engineer</p>
                    <p>DevOps Engineer</p>
                    <p>Graphic Designer</p>
                </div>
            </div>
            <PicHandler />
        </main>
    )
}

export default Home