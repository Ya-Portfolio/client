import React, { useRef } from 'react';
import './Home.css';
import Navbar from '../components/navbar/Navbar';
import PicHandler from '../components/home/PicHandler';
import CardCarousel from '../components/Projects/CardCarousel.js';

function Home() {
    const scrollContainerRef = useRef(null);

    const handleScroll = (e) => {
        e.preventDefault();
        scrollContainerRef.current.scrollLeft += e.deltaY;
    };

    return (
        <div className="homeContainer" ref={scrollContainerRef} onWheel={handleScroll}>
            {/* Parallax Section 1 */}
            <div className="child child1 parallax" style={{ backgroundImage: 'url(path_to_your_background_image_1)' }}>
                <div className="landingPage">
                    <Navbar title="CG" color={'dark'} />
                    <div className='mainContent'>
                        <h1 className='ebGaramond'>Chandrababu <br />Gowda</h1>
                        <div className='skills nunito'>
                            <p>Full Stack Engineer</p>
                            <p>DevOps Engineer</p>
                            <p>Graphic Designer</p>
                        </div>
                    </div>
                    <div className='additionalContent'>
                    </div>
                    <PicHandler />
                </div>
            </div>

            {/* Parallax Section 2 */}
            <div className="child child2 parallax" style={{ backgroundImage: 'url(path_to_your_background_image_2)' }}>
                <div className="secondaryLanding">
                    <Navbar title={"Chandrababu Gowda"} />
                    <div className="secondaryChild">
                        <div className="tertiaryChild">
                            <div className="mainContentSecondaryPage">
                                <div className="content nunito">
                                    I am a self-taught full-stack developer, I excel at building robust, scalable, and efficient server applications. With expertise in the MERN stack, I have a strong foundation in MongoDB, Express.js, React.js, and Node.js, enabling me to create seamless, user-friendly applications from concept. My passion for full-stack development drives me to ensure that every project I undertake is both technically pleasing. Currently, I am expanding my backend development skills by learning Java and Spring Boot, aiming to enhance my capabilities in building sophisticated, enterprise-level applications.
                                </div>
                                <div className="sideContent nunito">
                                    <h2 className='ebGaramond'>Education</h2>
                                    <Education college='Malnad College of Engineering' degree='B.E Computer Science' percentage={'8.5 CGPA'} marks='' />
                                    <Education college='Masters PU College' degree='Intermediate' percentage='99%' marks={'599/600'} />
                                    <Education college='Vijaya English School' degree='SSLC' percentage='99%' marks={'618/625'} />
                                </div>
                            </div>
                        </div>
                        <div className="tertiaryChild">
                            <div className="tertiaryLastbutOneChild">
                                <CardCarousel />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;

const Education = ({ college, degree, percentage, marks }) => {
    return (
        <div className='eduContainer flex'>
            <div className="clgName">
                <p>{college}</p>
                <p>{degree}</p>
            </div>
            <div className="marks">
                <p>{percentage}</p>
                <p>{marks}</p>
            </div>
        </div>
    );
};
