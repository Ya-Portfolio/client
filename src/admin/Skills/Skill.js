import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import PhotoUpload from '../PhotoUpload/PhotoUpload'
import './skills.css'
import axiosPrivate from '../../api/axios'

function Skill() {
    const params = useParams()
    const location = useLocation()

    const [title, setTitle] = useState('')
    const [imgs, setImgs] = useState([])

    const setTitleFn = async (title) => {
        await axiosPrivate.put('/file', { type: 'skills', title })
            .then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
    }

    const fetchImages = async () => {
        try {
            const response = await axiosPrivate.get('/file', {
                params: {
                    _id: params?.id
                }
            })
            console.log(response.data)
            // setTitle(response.data?.data?.file[0]?.title)
            // setImgs(response.data?.data?.file || [])
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {

        if (location.state && location.state.title && location.state.isNewOne) {
            setTitle(location.state.title)

            if (location.state.isNewOne) {
                setTitleFn(location.state.title)
            }
        }
        else {
            fetchImages()
        }

    }, [location, params])

    const saveToCloud = () => {

    }

    return (
        <div className="skillsContainerBloc">
            <h1 className='ebGaramond'>{title}</h1>
            <p className='nunito'>Upload the necessary Tech Stacks you gained in this skill</p>
            <div className="buttonContainer">
                <button className="addNewSkillButton" onClick={saveToCloud}>Save to Cloud</button>
            </div>
            <div className="relatedImages">
                <PhotoUpload imgs={imgs} />
            </div>
        </div>
    )
}

export default Skill