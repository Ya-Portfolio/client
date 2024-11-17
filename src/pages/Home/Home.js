import React, { useEffect, useRef, useState } from 'react';
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
import { useMediaQuery } from 'react-responsive';
import pic from '../../assets/vault/Screenshot (30).png';
import axiosPrivate from '../../api/axios';

const abt = `I am a self-taught full-stack developer, I excel at building robust, scalable, and efficient server applications. With expertise in the MERN stack, I have a strong foundation in MongoDB, Express.js, React.js, and Node.js, enabling me to create seamless, user-friendly applications from concept. My passion for full-stack development drives me to ensure that every project I undertake is both technically pleasing. Currently, I am expanding my backend development skills by learning Java and Spring Boot, aiming to enhance my capabilities in building sophisticated, enterprise-level applications.`

const nama = 'Chandrababu Gowda'
const edu = [
    {
        college: 'Malnad College of Engineering',
        degree: 'B.E Computer Science',
        percentage: '9.5 CGPA',
        marks: ''
    },
]

function Home() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [value, setValue] = useState("");
    const [isActive, setIsActive] = useState(false);
    const [achievements, setAchievements] = useState([])

    const [about, setAbout] = useState('');
    const [education, setEducation] = useState([]);
    const [name, setName] = useState('');
    const [skills, setSkills] = useState([])
    const [cardItems, setCardsItems] = useState([])
    const fetchdata = async () => {
        try {
            const response = await axiosPrivate.get('/profile')
            console.log(response.data.data)
            setAbout(response.data?.data?.about || abt)
            setEducation(response.data?.data?.education || edu)
            setName(response.data?.data?.name || nama)
        }
        catch (e) {
            console.log(e)
        }
    }

    const fetchProjects = async () => {
        try {
            const response = await axiosPrivate.get('/file/short-details', {
                params: {
                    type: "projects"
                }
            })
            // console.log(response?.data.data?.files)
            setCardsItems(response?.data.data?.files || [])
        }
        catch (e) {
            console.log(e)
        }
    }

    const fetchAchievements = async () => {
        try {
            const response = await axiosPrivate.get('/achievement')
            // console.log(response?.data.data?.files)
            setAchievements(response?.data.data?.achievements || [])
        }
        catch (e) {
            console.log(e)
        }
    }

    const fetchSkills = async () => {
        try {
            const response = await axiosPrivate.get('/skill')
            console.log(response?.data.data?.skills)
            setSkills(response?.data.data?.skills || [])
        }
        catch (e) {
            console.log(e)
        }
    }



    useEffect(() => {
        fetchdata()
        fetchProjects()
        fetchAchievements()
        fetchSkills()
    }, [])

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
                // console.log(scrollY)
                let newValue = '';

                if (scrollY > 1440 && scrollY < 2330) {
                    newValue = 'Skills';
                } else if (scrollY > 2415 && scrollY < 2415 + ((isMobile ? 300 : 600) * cardItems.length) + 700) {
                    newValue = 'Projects';
                } else if (scrollY > 2415 + ((isMobile ? 300 : 600) * cardItems.length) && scrollY < document.documentElement.scrollHeight - 400) {
                    newValue = 'Achievements';
                }
                else {
                    newValue = '';
                }
                const totalHeight = document.documentElement.scrollHeight;
                // console.log(totalHeight - scrollY);
                if (totalHeight < 1500) {
                    newValue = "Achievements"
                }


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


    // const skills = [
    //     'Web Developer',
    //     "DevOps Engineer",
    //     'Graphic Designer',
    // ];

    // const achievements = [
    //     "Internship in MCF",
    //     "Google Developers Group On Campus Organizer",
    //     "AWS: Solution Architect Certification",
    //     "Google Developers Group On Campus Organizer",
    //     "AWS: Solution Architect Certification"
    // ];

    const isMobile = useMediaQuery({ query: '(max-width: 786px)' });


    useEffect(() => {
        const quaternaryPage = document.querySelector('.quaternaryPage');
        const content1 = document.querySelector('.carousel');
        // console.log(isMobile)

        const cardHeight = isMobile ? 400 : 600;
        quaternaryPage.style.height = `${cardHeight * cardItems.length + (isMobile ? 100 : 800)}px`;
        content1.style.height = '100%';

    }, [isMobile, cardItems.length]);

    const handleScrolling = (e) => {
        // console.log(window.scrollY);
    };


    return (
        <div className="homeContainer">
            <div className="mainlandingPage">
                <Navbar title={isScrolled ? `${name}` : "CG"} value={value} isActive={isActive} />
                <div className="mainContent">
                    <h1 className='ebGaramond'>{name}</h1>
                    <ul>
                        {skills.map((skill, index) => (
                            <li className='nunito' key={skill._id}>{skill.name}</li>
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
                        {about}
                    </div>
                    <div className="sideContent nunito">
                        <h2 className='ebGaramond'>Education</h2>

                        {
                            education.map((edu, index) => (
                                <Education key={edu._id} college={edu.institution} degree={edu.degree} percentage={edu.grade_details} marks={edu.grade_main} />
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className="tertiaryPage">
                <div className="actualContent">
                    {/* {<h1 className='ebGaramond'>Skills</h1>} */}
                    <div className="containerSkills">
                        {
                            skills.map((skill, index) => (
                                <div className='skillcontent'>
                                    <h2 className='ebGaramond'>{skill.name}</h2>
                                    <div className="services">
                                        {
                                            skill.gallery.map((image, index) => (
                                                <div className="service" key={index + 98762}>
                                                    <img src={image.location} alt="" />
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className="quaternaryPage">
                <div className="actualContent2">
                    <div className="projectContainer">
                        <CardCarousel setValue={setValue} cardItems={cardItems} handleScrolling={handleScrolling} />
                    </div>
                </div>
            </div>
            <div className="pentaPage" id='achievements'>
                <div className="pentaryContent">
                    {
                        achievements.map((achievement, index) => (
                            <div className="achievement" key={index + 2000}>
                                <p className='ebGaramond'>{achievement.title}</p>
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
