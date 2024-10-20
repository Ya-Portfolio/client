import React, { useEffect } from 'react'
import './IndividualProject.css'
import { ChevronLeft, ChevronRight, Link } from 'lucide-react'
import pic from '../../assets/vault/Screenshot (30).png'
import pic1 from '../../assets/vault/Screenshot (274).png'

function IndividualProject() {
    const tags = ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Material-UI']
    const [picState, setPicState] = React.useState()
    const [picIndex, setPicIndex] = React.useState(0)
    const [isVisible, setIsVisible] = React.useState(false)
    const clickEventHandler = (pic) => {
        setIsVisible(true)
        setPicState(pic)
    }

    const imagesArr = [pic, pic1, pic, pic1, pic, pic1]
    const rightMove = () => {
        const newIndex = (picIndex + 1) % imagesArr.length;
        setPicState(imagesArr[newIndex]);
        setPicIndex(newIndex);
    }

    const leftMove = () => {
        const newIndex = (picIndex - 1 + imagesArr.length) % imagesArr.length;
        setPicState(imagesArr[newIndex]);
        setPicIndex(newIndex);
    }

    useEffect(() => {
        document.documentElement.style.setProperty('--animation-duration', `${imagesArr.length * 3}s`);
    }, [])


    return (
        <>
            <div className="individualProject ebGaramond">
                {isVisible && <div className="modal">
                    <div className="cancelImg" onClick={() => setIsVisible(false)}>
                        <img src="https://cdn-icons-png.flaticon.com/128/507/507257.png" alt="" />
                    </div>
                    <div className="modalOverlay">
                        <div className="prev">
                            <ChevronLeft size={24} onClick={leftMove} />
                        </div>
                        <div className="imageHolder">
                            <img src={picState} alt="" />
                        </div>
                        <div className="next">
                            <ChevronRight size={24} onClick={rightMove} />
                        </div>
                    </div>
                </div>}
                <h1>The Vault </h1>
                <div className="caseStudy">
                    <div className="blogProjectContainer">
                        <img src={pic} alt="" />
                    </div>
                    <div className="projectDiv">
                        <div className="projecttags">
                            {tags.map((tag, index) => (
                                <span key={index} className='projectTag nunito'>{tag}</span>
                            ))}
                        </div>
                        <div className="caseStudies eachDiv">
                            <h2 className='ebGaramond'>Case Study</h2>
                            <p className='nunito'>
                                In many organizations, managing access to confidential documents is a critical challenge. Administrators often struggle to control who can view, edit, or download sensitive files, especially when these documents are spread across departments and involve multiple levels of authorization. The risk of unauthorized access and data breaches increases without proper systems in place. The challenge was to develop a solution that enforces role-based access and maintains security while being easy to use.
                            </p>
                        </div>

                        <div className="overview eachDiv">
                            <h2 className='ebGaramond'>Problem Statement:</h2>
                            <p className='nunito'>
                                In many organizations, managing access to confidential documents is a critical challenge. Administrators often struggle to control who can view, edit, or download sensitive files, especially when these documents are spread across departments and involve multiple levels of authorization. The risk of unauthorized access and data breaches increases without proper systems in place. The challenge was to develop a solution that enforces role-based access and maintains security while being easy to use.
                            </p>
                        </div>
                        <div className="overview eachDiv">
                            <h2 className='ebGaramond'> Solution:</h2>
                            <p className='nunito'>
                                Vault is a secure file storage and management system designed to handle confidential documents within an organization. The system classifies files into four access levels, with Level 4 reserved for the highest authority, such as the chairman, and Levels 1 to 3 assigned to other roles like deans, HODs, and regular faculty. Each user is granted access based on their role, ensuring only authorized individuals can view or edit certain documents. Vault also incorporates robust security measures, including automatic demotion of users after three failed login attempts for accessing confidential files, along with email notifications to administrators. The project was developed using React.js for the frontend and Node.js with MongoDB for the backend, all within a tight 1.5-week deadline. The system also tracks user activities, providing a detailed history accessible only to the top-level authority. Vault was designed to address the challenge of managing sensitive documents securely while allowing efficient file management and controlled access based on organizational hierarchy. Despite the short timeframe, the project successfully delivered a solution that enhances security, minimizes unauthorized access, and ensures proper file handling across departments. This project highlighted my ability to work under pressure and deliver a functional, scalable, and secure system tailored to organizational needs.
                            </p>
                        </div>
                    </div>
                </div>
                <h1>Gallery</h1>
                <div className="scroll-container">
                    <div className="gallery">
                        {imagesArr.map((pic, index) => (
                            <div key={index} className="galleryImage" onClick={() => clickEventHandler(pic)}>
                                <img src={pic} alt="" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default IndividualProject