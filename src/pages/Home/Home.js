import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import './Home.css';
import PicHandler from '../../components/home/PicHandler';
import pic1 from '../../assets/fullstack/icons8-express-js-50.png'
import pic2 from '../../assets/fullstack/icons8-flask-50.png'
import pic3 from '../../assets/fullstack/icons8-java-50.png'
import pic4 from '../../assets/fullstack/icons8-mongo-db-48.png'
import pic5 from '../../assets/fullstack/icons8-mysql-50.png'
import pic6 from '../../assets/fullstack/icons8-nodejs-48.png'
import pic7 from '../../assets/fullstack/icons8-python-50.png'
import CardCarousel from '../../components/Projects/CardCarousel';
import Footer from '../../components/home/Footer';


function Home() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [value, setValue] = useState("");
    const [isActive, setIsActive] = useState(false);

    const imageArr = [
        pic1,
        pic2,
        pic3,
        pic4,
        pic5,
        pic6,
        pic7
    ]



    useEffect(() => {
        const storedValue = localStorage.getItem('scrollSection');
        if (storedValue && window.scrollY > 1600) {
            setValue(storedValue);
        }

        const handleScroll = () => {
            const scrollY = window.scrollY;

            if (scrollY > 850) {
                setIsScrolled(true);
                console.log(scrollY)
                let newValue = '';

                if (scrollY > 1440 && scrollY < 2330) {
                    newValue = 'Skills';
                } else if (scrollY > 2415 && scrollY < 5400) {
                    newValue = 'Projects';
                } else if (scrollY > 5560 && scrollY < 6190) {
                    newValue = 'Achievements';
                }
                else {
                    newValue = '';
                }
                // const totalHeight = document.documentElement.scrollHeight;
                // console.log(totalHeight - scrollY);


                if (newValue !== value) {
                    setValue(newValue);
                    setIsActive(newValue !== '');
                    localStorage.setItem('scrollSection', newValue);
                }

            } else {
                setIsScrolled(false);
                setValue('');
                localStorage.removeItem('scrollSection');
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [value]);


    const skills = [
        'Web Developer',
        "DevOps Engineer",
        'Graphic Designer',
    ];

    const achievements = [
        "Internship in MCF",
        "Google Developers Group On Campus Organizer",
        "AWS: Solution Architect Certification",
        "Google Developers Group On Campus Organizer",
        "AWS: Solution Architect Certification"
    ];


    return (
        <div className="homeContainer">
            <div className="mainlandingPage">
                <Navbar title={isScrolled ? 'Chandrababu Gowda' : "CG"} value={value} isActive = {isActive}/>
                <div className="mainContent">
                    <h1 className='ebGaramond'>Chandrababu <br />Gowda</h1>
                    <ul>
                        {skills.map((skill, index) => (
                            <li className='nunito' key={index + 100000}>{skill}</li>
                        ))}
                    </ul>
                </div>
                <div className="addnContent">
                    <PicHandler />
                </div>
            </div>
            <div className="secondaryPage" id='about'>
                <div className="mainContentSecondaryPage">
                    <div className="content nunito">
                        I am a self-taught full-stack developer, I excel at building robust, scalable, and efficient server applications. With expertise in the MERN stack, I have a strong foundation in MongoDB, Express.js, React.js, and Node.js, enabling me to create seamless, user-friendly applications from concept. My passion for full-stack development drives me to ensure that every project I undertake is both technically pleasing. Currently, I am expanding my backend development skills by learning Java and Spring Boot, aiming to enhance my capabilities in building sophisticated, enterprise-level applications.
                    </div>
                    <div className="sideContent nunito">
                        <h2 className='ebGaramond'>Education</h2>
                        <Education college='Malnad College of Engineering' degree='B.E Computer Science' percentage={'9.5 CGPA'} marks='' />
                        <Education college='Masters PU College' degree='Intermediate' percentage='99%' marks={'599/600'} />
                        <Education college='Vijaya English School' degree='SSLC' percentage='93%' marks={'618/625'} />
                    </div>
                </div>
            </div>
            <div className="tertiaryPage">
                <div className="actualContent">
                    {/* {<h1 className='ebGaramond'>Skills</h1>} */}
                    <div className="containerSkills">
                        <div className='skillcontent'>
                            <h2 className='ebGaramond'>Full Stack Developer</h2>
                            <div className="services">
                                {
                                    imageArr.map((image, index) => (
                                        <div className="service" key={index}>
                                            <img src={image} alt="" />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className='skillcontent'>
                            <h2 className='ebGaramond'>DevOps Engineer</h2>
                            <div className="services">
                                {
                                    imageArr.map((image, index) => (
                                        <div className="service" key={index}>
                                            <img src={image} alt="" />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className='skillcontent'>
                            <h2 className='ebGaramond'>Graphic Designer</h2>
                            <div id='projects'></div>
                            <div className="services">
                                {
                                    imageArr.map((image, index) => (
                                        <div className="service" key={index}>
                                            <img src={image} alt="" />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="quaternaryPage">
                <div className="actualContent2">
                    <div className="projectContainer">
                        <CardCarousel setValue={setValue} />
                    </div>
                </div>
            </div>
            <div className="pentaPage" id='achievements'>
                <div className="pentaryContent">
                    {
                        achievements.map((achievement, index) => (
                            <div className="achievement" key={index + 2000}>
                                <p className='ebGaramond'>{achievement}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
            <Footer />

        </div>
    );
}

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
}

export default Home;
